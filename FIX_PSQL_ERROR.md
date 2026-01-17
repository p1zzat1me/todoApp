# Fix "psql is not recognized" Error

This error means PostgreSQL command-line tools aren't in your PATH. Here are solutions:

## Solution 1: Use Full Path to psql

PostgreSQL is probably installed, but the path isn't set. Try using the full path:

### Find PostgreSQL Installation

1. Check common installation locations:
   ```powershell
   Test-Path "C:\Program Files\PostgreSQL\16\bin\psql.exe"
   Test-Path "C:\Program Files\PostgreSQL\15\bin\psql.exe"
   Test-Path "C:\Program Files\PostgreSQL\14\bin\psql.exe"
   ```

2. Or search for it:
   ```powershell
   Get-ChildItem "C:\Program Files\PostgreSQL" -Recurse -Filter "psql.exe" -ErrorAction SilentlyContinue
   ```

### Use Full Path

Once you find it, use the full path:

```powershell
# Example for PostgreSQL 16:
& "C:\Program Files\PostgreSQL\16\bin\psql.exe" -U postgres

# Example for PostgreSQL 15:
& "C:\Program Files\PostgreSQL\15\bin\psql.exe" -U postgres

# Example for PostgreSQL 14:
& "C:\Program Files\PostgreSQL\14\bin\psql.exe" -U postgres
```

Then create the database:
```sql
CREATE DATABASE todo_db;
\q
```

---

## Solution 2: Use pgAdmin (GUI - Much Easier!)

pgAdmin is a visual tool that comes with PostgreSQL. No command line needed!

### Steps:

1. **Open pgAdmin:**
   - Press `Windows Key`
   - Type "pgAdmin"
   - Click on "pgAdmin 4"

2. **Connect to Server:**
   - When it opens, you'll see "Servers" in the left panel
   - Click on it
   - Enter your password (the one you set during PostgreSQL installation)
   - Click "Save"

3. **Create Database:**
   - Right-click on "Databases" (under your server)
   - Click "Create" → "Database..."
   - Name: `todo_db`
   - Click "Save"

✅ Done! Much easier than command line!

---

## Solution 3: Check if PostgreSQL is Installed

### Check via Services:

1. Press `Windows + R`
2. Type `services.msc` and press Enter
3. Look for services starting with "postgresql"

**If you see PostgreSQL services:**
- PostgreSQL is installed ✅
- Use Solution 1 or 2 above

**If you DON'T see PostgreSQL services:**
- PostgreSQL is NOT installed
- You need to install it first (see Solution 4)

---

## Solution 4: Install PostgreSQL (If Not Installed)

1. **Download PostgreSQL:**
   - Go to https://www.postgresql.org/download/windows/
   - Click "Download the installer"
   - Download the latest version (16.x recommended)

2. **Run the Installer:**
   - Run the downloaded `.exe` file
   - Click "Next" through the setup
   - **Important:** Remember the password you set for the `postgres` user!
   - Use default port: `5432`
   - Use default locale
   - Click "Next" until installation completes

3. **After Installation:**
   - pgAdmin should open automatically
   - Or find it in Start menu
   - Use it to create your database (Solution 2)

---

## Solution 5: Add PostgreSQL to PATH (Optional)

If you want to use `psql` from anywhere:

1. **Find PostgreSQL bin folder:**
   - Usually: `C:\Program Files\PostgreSQL\16\bin`
   - (Replace 16 with your version)

2. **Add to PATH:**
   - Press `Windows Key`, type "environment"
   - Click "Edit the system environment variables"
   - Click "Environment Variables"
   - Under "System variables", find "Path"
   - Click "Edit"
   - Click "New"
   - Add: `C:\Program Files\PostgreSQL\16\bin`
   - Click OK on all windows
   - **Restart your terminal/PowerShell**

3. **Verify:**
   ```powershell
   psql --version
   ```

---

## Solution 6: Use Cloud Database (Easiest Option!)

**Skip all this hassle and use a free cloud database:**

### Supabase (Recommended):

1. Go to https://supabase.com
2. Sign up (free, no credit card needed)
3. Click "New Project"
4. Fill in:
   - Name: `todo-app`
   - Database Password: (choose a strong password)
   - Region: (choose closest to you)
5. Wait 2 minutes for setup
6. Go to **Settings** → **Database**
7. Find **"Connection string"** → **"URI"**
8. Copy the connection string
9. Paste it in your `.env` file:
   ```env
   DATABASE_URL=postgresql://postgres.xxxxx:yourpassword@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

✅ **No installation, no PATH issues, works immediately!**

---

## Recommended: Use pgAdmin or Cloud Database

**For beginners, I recommend:**
1. **pgAdmin** (if PostgreSQL is installed) - Visual, easy to use
2. **Supabase** (cloud) - No installation needed, easiest option

Both are much easier than dealing with command line PATH issues!

---

## Quick Decision Tree

```
Is PostgreSQL installed?
├─ YES → Use pgAdmin (Solution 2) or Full Path (Solution 1)
└─ NO  → Install PostgreSQL (Solution 4) OR Use Cloud Database (Solution 6) ⭐ EASIEST
```

---

## What I Recommend Right Now

**Easiest path forward:**

1. **Check if PostgreSQL is installed:**
   - Open Services (`Windows + R` → `services.msc`)
   - Look for "postgresql" services

2. **If installed:**
   - Use **pgAdmin** to create database (Solution 2)
   - Or use full path to psql (Solution 1)

3. **If NOT installed:**
   - Use **Supabase** (cloud database) - Solution 6
   - Takes 5 minutes, no installation needed!

Let me know which option you want to use! 🚀
