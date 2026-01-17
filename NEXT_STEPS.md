# What to Do Next - Step by Step

## ✅ Step 1: Create Your .env File

You have the template ready, now create the actual `.env` file:

**Option A - Copy the template (Easiest):**
```powershell
Copy-Item env.template .env
```

**Option B - Create manually:**
1. Create a new file named `.env` in the root folder
2. Copy this content:
   ```env
   DATABASE_URL=postgresql://postgres:niki@localhost:5432/todo_db
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

✅ **Check:** You should now have a `.env` file in your project root.

---

## ✅ Step 2: Make Sure PostgreSQL is Running

1. Press `Windows + R`
2. Type `services.msc` and press Enter
3. Find **"postgresql-x64-XX"** (or "PostgreSQL Server")
4. Check if status says **"Running"**
   - If it says "Stopped" → Right-click → **Start**
   - If it says "Running" → You're good! ✅

---

## ✅ Step 3: Verify Database Exists

Make sure `todo_db` database exists. You can check using pgAdmin:

1. Open **pgAdmin** (from Start menu)
2. Connect to your server (password: `niki`)
3. Check if `todo_db` is listed under "Databases"
   - ✅ If you see it → Perfect!
   - ❌ If not → Right-click "Databases" → Create → Database → Name: `todo_db`

---

## ✅ Step 4: Install Dependencies (If Not Done)

Make sure all packages are installed:

```bash
npm install --legacy-peer-deps
```

Wait for it to finish (may take a few minutes).

---

## ✅ Step 5: Start the App!

Open your terminal in the project folder and run:

```bash
npm run dev
```

**What you should see:**
- FastAPI starting on port 8000
- Next.js starting on port 3000
- "Creating tables.." message (database connection working!)
- No errors

---

## ✅ Step 6: Open the App

1. Open your browser
2. Go to: **http://localhost:3000**
3. You should see your TODO app! 🎉

---

## ✅ Step 7: Test It Works

1. Click **"Add New"** button
2. Create a test task:
   - Title: "My First Task"
   - Priority: 8
   - Due Date: Tomorrow
   - Category: "Testing"
3. Click submit
4. You should see the task appear on the main page!

---

## 🎉 You're Done!

If everything works, you now have:
- ✅ Backend running (FastAPI on port 8000)
- ✅ Frontend running (Next.js on port 3000)
- ✅ Database connected
- ✅ App working with all features!

---

## 🆘 If Something Goes Wrong

### Error: "Cannot connect to database"
- Check PostgreSQL service is running (Step 2)
- Check `.env` file has correct password
- Verify `todo_db` database exists

### Error: "Port 3000 already in use"
- Another app is using port 3000
- Close that app or change the port

### Error: "Module not found"
- Run `npm install --legacy-peer-deps` again

### Backend won't start
- Check Python is installed: `python --version`
- Install requirements: `pip install -r requirements.txt`

---

## Quick Checklist

Before starting, make sure:
- [ ] `.env` file exists with your credentials
- [ ] PostgreSQL service is running
- [ ] `todo_db` database exists
- [ ] Dependencies installed (`npm install --legacy-peer-deps`)
- [ ] Ready to run `npm run dev`

---

## Ready? Let's Go! 🚀

Start with Step 1 (create `.env` file), then work through each step. If you get stuck at any step, let me know!
