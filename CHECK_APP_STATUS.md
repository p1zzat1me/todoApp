# Check Your App Status

## What Those 404 Errors Mean

The `404 Not Found` errors you're seeing are **harmless**. They happen because:
- Something is trying to access the root path `/` on FastAPI
- FastAPI doesn't have a root route by default
- This is normal and won't break your app

I've added a root route to fix this, but **your app should still work fine** even with these 404s.

---

## Check if Your App is Working

### 1. Check if Frontend is Running

Open your browser and go to:
- **http://localhost:3000**

**What you should see:**
- ✅ TODO App homepage with "Add New" button
- ✅ Search bar, filter buttons, sort buttons
- ✅ If you see this → **App is working!** 🎉

**If you see:**
- ❌ "This site can't be reached" → Frontend not started
- ❌ Blank page → Check browser console (F12)

### 2. Check if Backend is Running

Open your browser and go to:
- **http://localhost:8000/docs**

**What you should see:**
- ✅ FastAPI Swagger documentation page
- ✅ List of API endpoints
- ✅ If you see this → **Backend is working!** 🎉

**If you see:**
- ❌ "This site can't be reached" → Backend not started

### 3. Test the API Directly

Try this in your browser:
- **http://localhost:8000/api/todos**

**What you should see:**
- ✅ JSON response with `{"todos": []}` or list of todos
- ✅ If you see this → **API is working!** 🎉

---

## Common Issues

### Issue: "Creating tables.." but then errors

**This means:**
- ✅ Database connection is working
- ✅ Tables are being created
- ❌ But something else might be wrong

**Check:**
- Is Next.js running? (Check terminal for `[0]` process)
- Are there any red error messages?

### Issue: Frontend won't load

**Check:**
1. Look at the terminal - do you see:
   ```
   [0] ▲ Next.js 13.4.4
   [0] - Local:        http://localhost:3000
   [0] ✓ Ready in X seconds
   ```

2. If not, the frontend might not have started
3. Check for errors in the `[0]` process output

### Issue: Backend errors

**Check:**
1. Look at the terminal - do you see:
   ```
   [1] INFO:     Uvicorn running on http://127.0.0.1:8000
   ```

2. If you see database errors, check:
   - PostgreSQL is running
   - `.env` file has correct password
   - `todo_db` database exists

---

## What to Look For in Terminal

When `npm run dev` is running, you should see:

```
[0] ▲ Next.js 13.4.4
[0] - Local:        http://localhost:3000
[0] ✓ Ready in X seconds

[1] Creating tables..
[1] INFO:     Uvicorn running on http://127.0.0.1:8000
[1] INFO:     Application startup complete.
```

**Two processes:**
- `[0]` = Next.js frontend
- `[1]` = FastAPI backend

---

## Quick Test

1. **Open:** http://localhost:3000
2. **Click:** "Add New" button
3. **Create a task:**
   - Title: "Test Task"
   - Priority: 5
   - Submit
4. **Check:** Does the task appear on the main page?

**If yes → Everything is working!** ✅
**If no → Share the error message**

---

## The 404 Errors Are Normal

Those `404 Not Found` errors on `/` are **not a problem**. They're just health checks or Next.js trying to access the root. Your app endpoints (`/api/todos`, etc.) should still work fine.

**To verify everything works:**
- Try accessing http://localhost:3000 in your browser
- If the page loads → You're good! 🎉
