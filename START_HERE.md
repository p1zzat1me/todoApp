# 🚀 How to Start the TODO App - Step by Step

Follow these steps to get your app running!

## Step 1: Install Node.js (If Not Already Installed)

1. Go to https://nodejs.org/
2. Download the **LTS version** (Long Term Support)
3. Install it (use default settings)
4. **Restart your terminal/IDE** after installation
5. Verify installation:
   ```bash
   node --version
   npm --version
   ```
   You should see version numbers (e.g., v18.x.x and 9.x.x)

---

## Step 2: Install Python (If Not Already Installed)

1. Go to https://www.python.org/downloads/
2. Download Python 3.8 or higher
3. **Important:** Check "Add Python to PATH" during installation
4. Verify installation:
   ```bash
   python --version
   ```
   Should show Python 3.8+ or Python 3.x.x

---

## Step 3: Set Up Database

You need a PostgreSQL database. Choose one option:

### Option A: Local PostgreSQL
1. Install PostgreSQL from https://www.postgresql.org/download/windows/
2. During installation, remember your password
3. Create a database:
   ```bash
   # Open PostgreSQL command line or pgAdmin
   CREATE DATABASE todo_db;
   ```

### Option B: Use a Cloud Database (Easier)
- **Free options:**
  - **Supabase**: https://supabase.com (free tier)
  - **Neon**: https://neon.tech (free tier)
  - **Railway**: https://railway.app (free tier)
- Get the connection string (looks like: `postgresql://user:password@host:5432/dbname`)

---

## Step 4: Install Dependencies

Open your terminal in the project folder and run:

```bash
# Install Node.js packages
npm install --legacy-peer-deps

# If that doesn't work, try:
npm install

# Install Python packages
pip install -r requirements.txt
```

**Note:** If you get errors, see `FIX_NPM_INSTALL.md` for troubleshooting.

---

## Step 5: Create Environment File

1. Create a file named `.env` in the **root directory** (same folder as `package.json`)

2. Add these lines (replace with your actual values):

```env
# Database connection string
DATABASE_URL=postgresql://username:password@localhost:5432/todo_db

# API URL (for development, use localhost)
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Example for local PostgreSQL:**
```env
DATABASE_URL=postgresql://postgres:mypassword@localhost:5432/todo_db
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Example for Supabase/Cloud:**
```env
DATABASE_URL=postgresql://user:password@db.xxxxx.supabase.co:5432/postgres
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## Step 6: Start the Application

You have **two options** to start the app:

### Option A: Start Both Together (Recommended)

Open **one terminal** and run:

```bash
npm run dev
```

This starts both:
- FastAPI backend (port 8000)
- Next.js frontend (port 3000)

### Option B: Start Separately (If Option A doesn't work)

Open **two terminals**:

**Terminal 1 - Backend:**
```bash
npm run fastapi-dev
```
Wait until you see: `Uvicorn running on http://127.0.0.1:8000`

**Terminal 2 - Frontend:**
```bash
npm run next-dev
```
Wait until you see: `Ready on http://localhost:3000`

---

## Step 7: Open the App

1. Open your browser
2. Go to: **http://localhost:3000**
3. You should see the TODO app!

---

## Step 8: Verify Everything Works

### Quick Test:
1. Click **"Add New"** button
2. Create a test task:
   - Title: "My First Task"
   - Priority: 8
   - Due Date: Tomorrow
   - Category: "Testing"
3. Click submit
4. You should see the task appear on the main page!

### Check API:
- Visit: **http://localhost:8000/docs**
- You should see FastAPI documentation (Swagger UI)
- This confirms the backend is working

---

## 🎉 You're Done!

Your app should now be running with all features:
- ✅ Search tasks
- ✅ Filter by status (All/Done/Undone)
- ✅ Sort by priority
- ✅ Add tasks with priority, due date, and category
- ✅ Mark tasks as done
- ✅ Delete tasks
- ✅ Drag and drop (if packages installed)

---

## Troubleshooting

### "Cannot connect to database"
- Check your `DATABASE_URL` in `.env`
- Make sure PostgreSQL is running
- Verify database name, username, and password are correct

### "Port 3000 already in use"
- Another app is using port 3000
- Kill the process or change the port in `package.json`

### "Port 8000 already in use"
- Another app is using port 8000
- Kill the process or change the port

### "Module not found" errors
- Run `npm install --legacy-peer-deps` again
- Delete `node_modules` and `package-lock.json`, then reinstall

### Backend not starting
- Check if Python is installed: `python --version`
- Install requirements: `pip install -r requirements.txt`
- Check `.env` file exists and has `DATABASE_URL`

### Frontend not loading
- Check if Node.js is installed: `node --version`
- Make sure you're in the project root directory
- Check browser console (F12) for errors

---

## Next Steps

Once everything is running:

1. **Test all features** - See `TESTING_GUIDE.md`
2. **Customize the app** - Modify colors, add features
3. **Deploy** - When ready, deploy to Vercel/Railway/etc.

---

## Quick Reference

| What | Command | URL |
|------|---------|-----|
| Start everything | `npm run dev` | - |
| Start backend only | `npm run fastapi-dev` | http://localhost:8000 |
| Start frontend only | `npm run next-dev` | http://localhost:3000 |
| View API docs | - | http://localhost:8000/docs |
| View app | - | http://localhost:3000 |

---

## Need Help?

- Check `TROUBLESHOOTING.md` for common issues
- Check `FIX_NPM_INSTALL.md` for npm errors
- Check browser console (F12) for frontend errors
- Check terminal for backend errors

Good luck! 🚀
