# Quick Start PostgreSQL - 3 Steps

## Step 1: Start PostgreSQL Service

**Windows:**
1. Press `Windows + R`
2. Type `services.msc` and press Enter
3. Find **"postgresql-x64-XX"** (or "PostgreSQL Server")
4. Right-click → **Start**

✅ Done! PostgreSQL is now running.

---

## Step 2: Create Database

**Using Command Line:**
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database (when prompted, enter your password)
CREATE DATABASE todo_db;

# Exit
\q
```

**Or using pgAdmin (GUI):**
1. Open pgAdmin
2. Connect to server
3. Right-click "Databases" → Create → Database
4. Name: `todo_db`
5. Save

---

## Step 3: Update .env File

Edit your `.env` file:
```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/todo_db
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Replace `YOUR_PASSWORD` with your PostgreSQL password.

---

## That's It! 🎉

Now you can run:
```bash
npm run dev
```

---

## Easier Alternative: Use Cloud Database

**Don't want to deal with local PostgreSQL?**

1. Go to https://supabase.com (free)
2. Sign up and create project
3. Copy connection string
4. Paste in `.env` file

**No installation, no service management needed!** ✨
