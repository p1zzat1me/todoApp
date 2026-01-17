# Quick Verification Steps

## Step 1: Check Dependencies
```bash
# Check if all packages are installed
npm list --depth=0

# If drag-and-drop packages are missing:
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

## Step 2: Verify Environment Setup

Create a `.env` file in the root directory with:
```
DATABASE_URL=postgresql://user:password@localhost:5432/todo_db
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Note:** In development, Next.js rewrites API calls automatically, so `NEXT_PUBLIC_API_URL` might not be strictly necessary, but it's used in the code.

## Step 3: Start the Application

```bash
# Option 1: Start both together
npm run dev

# Option 2: Start separately (2 terminals)
# Terminal 1:
npm run fastapi-dev

# Terminal 2:
npm run next-dev
```

## Step 4: Quick Visual Check

1. **Open** `http://localhost:3000`
2. **Look for:**
   - ✅ Search bar at the top
   - ✅ Filter buttons (All, Undone, Done)
   - ✅ Sort buttons (Priority ↑, Priority ↓)
   - ✅ "Add New" button

## Step 5: Test Core Flow (2 minutes)

1. **Create a test task:**
   - Click "Add New"
   - Title: "Test Task"
   - Priority: 8
   - Due Date: Tomorrow
   - Category: "Testing"
   - Submit

2. **Verify it appears** on the main page with:
   - Priority badge (red, showing "Priority 8")
   - Due date with calendar icon
   - Category tag

3. **Test Search:**
   - Type "Test" in search box
   - Click Search
   - Should see only "Test Task"

4. **Test Filter:**
   - Click "Undone"
   - Should see "Test Task"
   - Click "Done"
   - Should see no tasks (or other completed tasks)

5. **Test Sort:**
   - Create another task with Priority 2
   - Click "Priority ↓"
   - "Test Task" (Priority 8) should appear first

6. **Test Complete:**
   - Check the checkbox on "Test Task"
   - Should get strikethrough
   - Should move to "Done" when filtered

7. **Test Delete:**
   - Click trash icon
   - Task should disappear

## Step 6: Check Browser Console

Open Developer Tools (F12) and check:
- ✅ No red errors
- ✅ Network requests to `/api/todos` are successful (200 status)
- ✅ No CORS errors

## Step 7: Check API Directly

Visit `http://localhost:8000/docs` to see FastAPI Swagger UI:
- ✅ Should see all endpoints
- ✅ Can test endpoints directly

## Common Issues Quick Fix

### "Cannot connect to API"
- Check if FastAPI is running: `http://localhost:8000/docs`
- Check CORS settings in `api/index.py`

### "Database error"
- Verify DATABASE_URL in `.env`
- Check PostgreSQL is running
- Tables should auto-create on first run

### "Search/Filter not working"
- Check browser console for errors
- Verify URL has query parameters (e.g., `?search=test`)
- Check Network tab for API requests

### "Drag-and-drop not working"
- Install packages: `npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities`
- Restart dev server
- Check for grip icon (⋮⋮) on left side of tasks

## Success Indicators

✅ All features work without errors
✅ UI is responsive and looks good
✅ No console errors
✅ API responds correctly
✅ Database operations work

If all checks pass, you're good to go! 🎉
