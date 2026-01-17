from typing import Optional
from fastapi.middleware.cors import CORSMiddleware

from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends,HTTPException
from sqlmodel import Field, Session, SQLModel, create_engine, select
from typing import Annotated
from .settings import DATABASE_URL

class Todo(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(index=True)
    completed: bool = False

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

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # later you can restrict to your Vercel URL
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
def read_todos():
    with Session(engine) as session:
        todos = session.exec(select(Todo)).all()
        return {"todos": todos}

@app.post("/api/delete/{todo_id}", response_model=Todo)
def delete_todo(todo_id: int, session: Annotated[Session, Depends(get_session)]):
    db_todo = session.exec(select(Todo).where(Todo.id == todo_id)).first()
    if not db_todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    session.delete(db_todo)
    session.commit()
    return db_todo


@app.put("/api/todos/{todo_id}", response_model=Todo)
def update_todo(todo_id: int, todo: Todo, session: Annotated[Session, Depends(get_session)]):
    db_todo = session.exec(select(Todo).where(Todo.id == todo_id)).first()
    if not db_t yoursodo:
        raise HTTPException(status_code=404, detail="Todo not found")
    db_todo.completed = todo.completed
    session.commit()
    session.refresh(db_todo)
    return db_todo