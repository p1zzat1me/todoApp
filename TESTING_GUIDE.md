# Testing Guide - TODO App Features

This guide will help you verify that all features are working correctly.

## Prerequisites

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set up Environment Variables**
   - Create a `.env` file in the root directory
   - Add your database URL:
     ```
     DATABASE_URL=postgresql://user:password@localhost:5432/todo_db
     ```
   - Add your API URL (for frontend):
     ```
     NEXT_PUBLIC_API_URL=http://localhost:8000
     ```

3. **Start the Application**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start them separately:
   # Terminal 1 - Backend
   npm run fastapi-dev
   
   # Terminal 2 - Frontend
   npm run next-dev
   ```

## Feature Testing Checklist

### ✅ Basic Features (Already Implemented)

#### 1. Display List of All Tasks
- [ ] Navigate to `http://localhost:3000`
- [ ] Verify that existing todos are displayed
- [ ] Check that both completed and pending tasks are visible

#### 2. Add a New Task
- [ ] Click "Add New" button
- [ ] Fill in the task title
- [ ] Click submit
- [ ] Verify the task appears in the list
- [ ] Check that toast notification appears

#### 3. Remove a Task
- [ ] Find a task in the list
- [ ] Click the trash icon
- [ ] Verify the task is removed
- [ ] Check that toast notification appears

#### 4. Mark Task as Done
- [ ] Find an incomplete task
- [ ] Click the checkbox
- [ ] Verify the task is marked as completed (strikethrough)
- [ ] Verify the task moves to completed section (if using old layout)

---

### 🆕 New Required Features

#### 5. Search for Tasks
- [ ] Type a search term in the search box
- [ ] Click "Search" or press Enter
- [ ] Verify only matching tasks are displayed
- [ ] Try searching for a task that doesn't exist
- [ ] Verify "No Tasks" message appears
- [ ] Clear the search and verify all tasks reappear

#### 6. Filter Tasks by Status
- [ ] Click "All" button - verify all tasks shown
- [ ] Click "Undone" button - verify only incomplete tasks shown
- [ ] Click "Done" button - verify only completed tasks shown
- [ ] Check that URL updates with query parameters
- [ ] Verify filter persists on page refresh

#### 7. Assign Priority to Tasks
- [ ] Create a new task
- [ ] Set priority to 1 (lowest)
- [ ] Set priority to 10 (highest)
- [ ] Set priority to 5 (default)
- [ ] Verify priority is saved and displayed
- [ ] Check that priority badge shows correct color:
  - Green (1-4): Low priority
  - Yellow (5-7): Medium priority
  - Red (8-10): High priority

#### 8. Sort Tasks by Priority
- [ ] Create multiple tasks with different priorities (e.g., 2, 5, 9)
- [ ] Click "Priority ↑" (ascending)
- [ ] Verify tasks are sorted from lowest to highest priority
- [ ] Click "Priority ↓" (descending)
- [ ] Verify tasks are sorted from highest to lowest priority
- [ ] Click the same button again to deselect sorting
- [ ] Verify tasks return to default order

---

### 🎁 Bonus Features

#### 9. Due Dates
- [ ] Create a new task
- [ ] Select a due date in the future
- [ ] Verify the date is displayed in the task item
- [ ] Create a task with a past due date
- [ ] Verify it shows "(Overdue)" in red
- [ ] Mark the overdue task as completed
- [ ] Verify "(Overdue)" disappears

#### 10. Categories
- [ ] Create a new task
- [ ] Enter a category (e.g., "Work", "Personal")
- [ ] Verify the category is displayed with a tag icon
- [ ] Create multiple tasks with different categories
- [ ] Verify categories are displayed correctly

#### 11. Drag-and-Drop
- [ ] Install drag-and-drop packages (if not already):
  ```bash
  npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
  ```
- [ ] Find the grip icon (⋮⋮) on the left of tasks
- [ ] Drag a task up or down
- [ ] Verify the task moves to the new position
- [ ] Note: Order is visual only (not persisted to database)

---

## API Endpoint Testing

You can also test the API directly using curl or a tool like Postman:

### Get All Todos
```bash
curl http://localhost:8000/api/todos
```

### Get Todos with Filters
```bash
# Search
curl "http://localhost:8000/api/todos?search=test"

# Filter by status
curl "http://localhost:8000/api/todos?status=undone"

# Sort by priority
curl "http://localhost:8000/api/todos?sort_by=priority_desc"

# Combined
curl "http://localhost:8000/api/todos?search=work&status=undone&sort_by=priority_asc"
```

### Create Todo
```bash
curl -X POST http://localhost:8000/api/todos/new \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Task",
    "priority": 8,
    "due_date": "2024-12-31",
    "category": "Work",
    "completed": false
  }'
```

### Update Todo
```bash
curl -X PUT http://localhost:8000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "title": "Updated Task",
    "priority": 9,
    "due_date": "2024-12-31",
    "category": "Personal",
    "completed": true
  }'
```

### Delete Todo
```bash
curl -X DELETE http://localhost:8000/api/todos/1
```

---

## Common Issues & Solutions

### Issue: Database connection error
**Solution:** 
- Verify DATABASE_URL in `.env` is correct
- Ensure PostgreSQL is running
- Check database credentials

### Issue: API not responding
**Solution:**
- Check if FastAPI server is running on port 8000
- Verify CORS settings in `api/index.py`
- Check browser console for errors

### Issue: Frontend not loading
**Solution:**
- Check if Next.js is running on port 3000
- Verify `NEXT_PUBLIC_API_URL` in `.env`
- Clear browser cache

### Issue: Drag-and-drop not working
**Solution:**
- Ensure packages are installed: `npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities`
- Check browser console for errors
- Verify the component is rendering correctly

### Issue: Search/Filter not working
**Solution:**
- Check browser console for errors
- Verify URL query parameters are updating
- Check network tab to see if API requests are being made

---

## Visual Checklist

When testing, verify these UI elements:

- [ ] Search bar with search icon
- [ ] Filter buttons (All, Undone, Done) with active state
- [ ] Sort buttons (Priority ↑, Priority ↓) with active state
- [ ] Priority badges with color coding
- [ ] Due date display with calendar icon
- [ ] Category tags with tag icon
- [ ] Overdue indicator (red text)
- [ ] Drag handle (grip icon) on tasks
- [ ] Toast notifications for actions
- [ ] Responsive design on mobile/tablet

---

## Performance Testing

- [ ] Test with 100+ tasks (if possible)
- [ ] Verify search is fast
- [ ] Check that sorting works with many items
- [ ] Test filtering performance
- [ ] Verify page load time is acceptable

---

## Browser Compatibility

Test in multiple browsers:
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (if on Mac)
- [ ] Mobile browsers

---

## Final Verification

Before considering everything complete:

1. ✅ All required features work
2. ✅ All bonus features work
3. ✅ No console errors
4. ✅ No TypeScript errors
5. ✅ No linting errors
6. ✅ Database migrations applied (if needed)
7. ✅ Environment variables set correctly
8. ✅ API endpoints respond correctly
9. ✅ UI is responsive and user-friendly

---

## Quick Test Script

Run through this quick test to verify core functionality:

1. Create 3 tasks:
   - Task 1: Priority 9, Category "Work", Due tomorrow
   - Task 2: Priority 3, Category "Personal", No due date
   - Task 3: Priority 7, Category "Work", Due yesterday

2. Mark Task 3 as completed

3. Search for "Work" - should show Tasks 1 and 3

4. Filter by "Undone" - should show Tasks 1 and 2

5. Sort by "Priority ↓" - Task 1 should be first

6. Sort by "Priority ↑" - Task 2 should be first

7. Delete Task 2

8. Filter by "All" - should show Tasks 1 and 3

If all these work, your app is functioning correctly! 🎉
