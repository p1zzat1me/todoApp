"""
Quick script to test database connection and create tables
Run this if you're having database issues
"""
import sys
import os
from pathlib import Path

# Add api directory to path
sys.path.insert(0, str(Path(__file__).parent))

from api.settings import DATABASE_URL
from api.index import engine, Todo, SQLModel

print("=" * 60)
print("Testing Database Connection")
print("=" * 60)
print(f"Database URL: {str(DATABASE_URL)[:50]}...")
print()

try:
    print("1. Testing connection...")
    connection = engine.connect()
    connection.close()
    print("   ✅ Connection successful!")
    print()
    
    print("2. Creating tables...")
    SQLModel.metadata.create_all(engine)
    print("   ✅ Tables created!")
    print()
    
    print("3. Verifying todo table...")
    from sqlmodel import Session, select
    with Session(engine) as session:
        result = session.exec(select(Todo).limit(0))
        print("   ✅ Todo table exists and is accessible!")
    print()
    
    print("=" * 60)
    print("✅ All checks passed! Database is ready.")
    print("=" * 60)
    
except Exception as e:
    print()
    print("=" * 60)
    print("❌ ERROR:")
    print("=" * 60)
    print(f"Error: {e}")
    print()
    print("Troubleshooting:")
    print("1. Check your DATABASE_URL in .env file")
    print("2. Make sure PostgreSQL database is running")
    print("3. Verify database credentials are correct")
    print("4. Check firewall/network settings")
    print("=" * 60)
    sys.exit(1)
