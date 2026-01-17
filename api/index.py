from typing import Optional
from datetime import date, datetime

from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Field, Session, SQLModel, create_engine, select, or_, col
from typing import Annotated
from .settings import DATABASE_URL

class Todo(SQLModel, table=True):
    __tablename__ = "todo"  # Explicitly set table name
    
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(index=True)
    completed: bool = False
    priority: int = Field(default=5, ge=1, le=10)  # Priority from 1-10, default 5
    due_date: Optional[date] = Field(default=None, index=True)
    category: Optional[str] = Field(default=None, index=True)

connection_string = str(DATABASE_URL)
if connection_string.startswith("postgresql"):
    connection_string = connection_string.replace("postgresql", "postgresql+psycopg2")

# Create engine with echo=False (set to True for SQL debugging)
# Add connection pool settings to handle connection issues better
engine = create_engine(
    connection_string,
    echo=False,  # Set to True to see all SQL queries in console
    pool_pre_ping=True,  # Verify connections before using them
    pool_recycle=300,  # Recycle connections after 5 minutes
    pool_size=5,  # Connection pool size
    max_overflow=10,  # Maximum overflow connections
    connect_args={"connect_timeout": 10},  # 10 second connection timeout
)


def create_db_and_tables():
    """Create database tables. This must succeed before the app can function."""
    try:
        print("Connecting to database...")
        print(f"Database URL: {str(DATABASE_URL)[:30]}...")  # Print first 30 chars for security
        SQLModel.metadata.create_all(engine)
        print("[SUCCESS] Database tables created successfully!")
        
        # Verify table was created
        with Session(engine) as session:
            # Try to query the table to verify it exists
            result = session.exec(select(Todo).limit(0))
            print("[SUCCESS] Todo table verified and accessible.")
    except Exception as e:
        error_msg = str(e)
        print(f"[ERROR] Could not create database tables!")
        print(f"Error details: {error_msg}")
        print("\nTroubleshooting:")
        print("1. Check your DATABASE_URL in .env file")
        print("2. Make sure PostgreSQL database is running and accessible")
        print("3. Verify database credentials are correct")
        print("4. Check if the database exists on Render")
        raise  # Re-raise to prevent app from starting with broken database


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("=" * 60)
    print("Starting FastAPI application...")
    print("=" * 60)
    create_db_and_tables()
    print("=" * 60)
    print("FastAPI application startup complete!")
    print("=" * 60)
    yield


app = FastAPI(lifespan=lifespan)

# Add root route to prevent 404 errors
@app.get("/")
def root():
    return {"message": "FastAPI is running", "docs": "/docs", "api": "/api"}

@app.get("/health")
def health_check():
    """Health check endpoint to verify server and database status"""
    db_status = "unknown"
    try:
        with Session(engine) as session:
            session.exec(select(Todo).limit(1))
        db_status = "connected"
    except Exception as e:
        db_status = f"disconnected: {str(e)[:100]}"
    
    return {
        "status": "ok",
        "server": "running",
        "database": db_status
    }

@app.post("/api/init-db")
def init_database():
    """Manually trigger database table creation. Use this if tables are missing."""
    try:
        print("Manually creating database tables...")
        SQLModel.metadata.create_all(engine)
        
        # Verify table was created
        with Session(engine) as session:
            session.exec(select(Todo).limit(0))
        
        return {
            "status": "success",
            "message": "Database tables created successfully!"
        }
    except Exception as e:
        error_msg = str(e)
        print(f"Error creating tables: {error_msg}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to create tables: {error_msg}"
        )

origins = [
    "http://localhost",
    "http://127.0.0.1",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3001",
    "http://localhost:3002",
    "http://127.0.0.1:3002",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    "https://nextjs-fastapi-todo-app-eosin.vercel.app",
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
    # Tables creation is handled in lifespan, but we can verify connection here
    try:
        with Session(engine) as session:
            session.exec(select(Todo).limit(1))
        print("Database connection verified.")
    except Exception as e:
        print(f"Warning: Database connection not available: {e}")

def get_session():
    with Session(engine) as session:
        yield session


@app.post("/api/todos/new", response_model=Todo)
def create_todo(todo: Todo, session: Annotated[Session, Depends(get_session)]):
    try:
        print(f"[INFO] Creating todo: {todo.title}")
        
        # Convert date string to date object if needed
        if todo.due_date and isinstance(todo.due_date, str):
            from datetime import datetime as dt
            try:
                todo.due_date = dt.strptime(todo.due_date, "%Y-%m-%d").date()
            except ValueError:
                raise HTTPException(
                    status_code=400,
                    detail=f"Invalid date format: {todo.due_date}. Expected YYYY-MM-DD"
                )
        
        print(f"[INFO] Adding todo to session...")
        session.add(todo)
        print(f"[INFO] Committing to database...")
        session.commit()
        print(f"[INFO] Refreshing todo...")
        session.refresh(todo)
        print(f"[SUCCESS] Todo created successfully: ID={todo.id}, Title={todo.title}")
        return todo
    except HTTPException:
        # Re-raise HTTP exceptions as-is
        raise
    except Exception as e:
        session.rollback()
        error_msg = str(e)
        print(f"[ERROR] Error creating todo: {error_msg}")
        print(f"[ERROR] Error type: {type(e).__name__}")
        
        # Check if it's a table missing error
        if "does not exist" in error_msg.lower() or "undefinedtable" in error_msg.lower():
            raise HTTPException(
                status_code=500, 
                detail="Database table not found. Please restart the server to create tables."
            )
        
        # Check for connection errors
        if "could not connect" in error_msg.lower() or "connection refused" in error_msg.lower():
            raise HTTPException(
                status_code=503,
                detail="Cannot connect to database. Please check your database connection."
            )
        
        raise HTTPException(status_code=400, detail=f"Error creating todo: {error_msg}")


@app.get("/api/todos")
def read_todos(
    search: Optional[str] = Query(None, description="Search term for filtering todos by title"),
    status: Optional[str] = Query(None, description="Filter by status: 'all', 'done', 'undone'"),
    sort_by: Optional[str] = Query(None, description="Sort by: 'priority_asc', 'priority_desc'"),
    category: Optional[str] = Query(None, description="Filter by category")
):
    try:
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
            return todos
    except Exception as e:
        # Return empty array if database is not available
        print(f"Database error in read_todos: {e}")
        return []

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