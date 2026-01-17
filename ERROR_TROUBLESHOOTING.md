# Error Troubleshooting Guide

## How to Share Errors

Please copy and paste the **full error message** from your terminal. This helps me diagnose the issue quickly.

---

## Common Errors & Quick Fixes

### Error 1: "Cannot connect to database" or "Connection refused"

**Symptoms:**
```
sqlalchemy.exc.OperationalError: could not connect to server
```

**Fix:**
1. Check PostgreSQL is running:
   - `Windows + R` → `services.msc`
   - Find "postgresql" service → Should say "Running"
   - If stopped, right-click → Start

2. Check your `.env` file:
   ```env
   DATABASE_URL=postgresql://postgres:niki@localhost:5432/todo_db
   ```
   - Make sure password is correct: `niki`
   - Make sure database name is correct: `todo_db`

3. Verify database exists:
   - Open pgAdmin
   - Check if `todo_db` exists
   - If not, create it

---

### Error 2: "Module not found" or "Cannot find module"

**Symptoms:**
```
ModuleNotFoundError: No module named 'xxx'
Error: Cannot find module 'xxx'
```

**Fix:**
```bash
# Install Python packages
pip install -r requirements.txt

# Install Node packages
npm install --legacy-peer-deps
```

---

### Error 3: "Port 3000 already in use" or "Port 8000 already in use"

**Symptoms:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Fix:**
1. Find what's using the port:
   ```powershell
   # For port 3000
   netstat -ano | findstr :3000
   
   # For port 8000
   netstat -ano | findstr :8000
   ```

2. Kill the process or use different ports

---

### Error 4: "DATABASE_URL not found" or "Environment variable error"

**Symptoms:**
```
KeyError: 'DATABASE_URL'
```

**Fix:**
1. Make sure `.env` file exists in root folder
2. Check file is named exactly `.env` (with the dot)
3. Verify content:
   ```env
   DATABASE_URL=postgresql://postgres:niki@localhost:5432/todo_db
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

---

### Error 5: "Table does not exist" or "relation does not exist"

**Symptoms:**
```
sqlalchemy.exc.ProgrammingError: relation "todo" does not exist
```

**Fix:**
- This is normal on first run
- Tables should be created automatically
- If not, restart the app: `npm run dev`

---

### Error 6: "psycopg2" or database driver error

**Symptoms:**
```
ModuleNotFoundError: No module named 'psycopg2'
```

**Fix:**
```bash
pip install psycopg2-binary
```

---

### Error 7: "SyntaxError" or "ImportError" in Python

**Symptoms:**
```
SyntaxError: invalid syntax
ImportError: cannot import name 'xxx'
```

**Fix:**
- Check Python version: `python --version` (should be 3.8+)
- Reinstall requirements: `pip install -r requirements.txt`

---

### Error 8: TypeScript or build errors

**Symptoms:**
```
Type error: Property 'xxx' does not exist
```

**Fix:**
```bash
# Clean and reinstall
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install --legacy-peer-deps
```

---

## How to Get Full Error Details

### For Backend (FastAPI) Errors:
- Look in the terminal where you ran `npm run dev` or `npm run fastapi-dev`
- Copy the **red error text** (everything from the error line)

### For Frontend (Next.js) Errors:
- Check browser console: Press `F12` → Console tab
- Copy any red error messages
- Also check the terminal for build errors

### For Database Errors:
- Check the terminal output
- Look for lines starting with "Error" or "Exception"

---

## Quick Diagnostic Commands

Run these to check your setup:

```bash
# Check Node.js
node --version

# Check npm
npm --version

# Check Python
python --version

# Check PostgreSQL is running
Get-Service | Where-Object {$_.Name -like "*postgresql*"}

# Check if .env exists
Test-Path .env

# Check if database exists (if you have psql)
# (This might not work if psql not in PATH)
```

---

## What to Share When Asking for Help

1. **The exact error message** (copy/paste)
2. **When it happens:**
   - When starting the app?
   - When creating a task?
   - When loading the page?
3. **What you were doing** when the error occurred
4. **Screenshot** (if possible)

---

## Still Stuck?

Share the **full error message** and I'll help you fix it! 🚀
