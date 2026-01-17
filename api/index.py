from typing import Optional
from datetime import date, datetime

from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Field, Session, SQLModel, create_engine, select, or_, col
from typing import Annotated
from .settings import DATABASE_URL

class Todo(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(index=True)
    completed: bool = False
    priority: int = Field(default=5, ge=1, le=10)  # Priority from 1-10, default 5
    due_date: Optional[date] = Field(default=None, index=True)
    category: Optional[str] = Field(default=None, index=True)

connection_string = str(DATABASE_URL).replace(
"postgresql", "postgresql+psycopg2"
)

engine = create_engine(connection_string)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Creating tables..")
    create_db_and_tables()
    yield


app = FastAPI(lifespan=lifespan)

# Add root route to prevent 404 errors
@app.get("/")
def root():
    return {"message": "FastAPI is running", "docs": "/docs", "api": "/api"}

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8000",
    "https://nextjs-fastapi-todo-app-eosin.vercel.app/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

def get_session():
    with Session(engine) as session:
        yield session


@app.post("/api/todos/new", response_model=Todo)
def create_todo(todo: Todo, session: Annotated[Session, Depends(get_session)]):
        session.add(todo)
        session.commit()
        session.refresh(todo)
        return todo


@app.get("/api/todos")
def read_todos(
    search: Optional[str] = Query(None, description="Search term for filtering todos by title"),
    status: Optional[str] = Query(None, description="Filter by status: 'all', 'done', 'undone'"),
    sort_by: Optional[str] = Query(None, description="Sort by: 'priority_asc', 'priority_desc'"),
    category: Optional[str] = Query(None, description="Filter by category")
):
    with Session(engine) as session:
        query = select(Todo)
        
        # Search functionality
        if search:
            query = query.where(Todo.title.ilike(f"%{search}%"))
        
        # Status filter
        if status == "done":
            query = query.where(Todo.completed == True)
        elif status == "undone":
            query = query.where(Todo.completed == False)
        # "all" or None shows everything, no filter needed
        
        # Category filter
        if category:
            query = query.where(Todo.category == category)
        
        # Sorting
        if sort_by == "priority_asc":
            query = query.order_by(Todo.priority.asc())
        elif sort_by == "priority_desc":
            query = query.order_by(Todo.priority.desc())
        else:
            # Default: sort by id (creation order)
            query = query.order_by(Todo.id.desc())
        
        todos = session.exec(query).all()
        return {"todos": todos}

@app.delete("/api/todos/{todo_id}", response_model=Todo)
async def delete_todo(todo_id: int, session: Annotated[Session, Depends(get_session)]):
    """
    Deletes the todo with the specified ID from the database.
    """
    db_todo = session.get(Todo, todo_id)
    if not db_todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    session.delete(db_todo)
    session.commit()
    return db_todo


@app.put("/api/todos/{todo_id}", response_model=Todo)
async def update_todo(todo_id: int, todo: Todo, session: Annotated[Session, Depends(get_session)]):
    db_todo = session.get(Todo, todo_id)
    if not db_todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    
    # Update all fields
    db_todo.title = todo.title
    db_todo.completed = todo.completed
    db_todo.priority = todo.priority
    db_todo.due_date = todo.due_date
    db_todo.category = todo.category
    
    session.add(db_todo)
    session.commit()
    session.refresh(db_todo)
    return db_todo