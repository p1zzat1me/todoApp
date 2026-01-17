# Pre-Deployment Checklist

Use this checklist to verify everything is working before deployment.

## Setup ✅
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file created with `DATABASE_URL`
- [ ] Database is running and accessible
- [ ] Environment variables are set correctly

## Code Quality ✅
- [ ] No TypeScript errors (`npm run build` succeeds)
- [ ] No linting errors
- [ ] No console errors in browser
- [ ] All imports are correct

## Backend API ✅
- [ ] FastAPI server starts without errors
- [ ] Database tables are created automatically
- [ ] API endpoints respond correctly:
  - [ ] `GET /api/todos` - returns todos
  - [ ] `POST /api/todos/new` - creates todo
  - [ ] `PUT /api/todos/{id}` - updates todo
  - [ ] `DELETE /api/todos/{id}` - deletes todo
- [ ] API supports query parameters:
  - [ ] `?search=term` - searches todos
  - [ ] `?status=done|undone` - filters by status
  - [ ] `?sort_by=priority_asc|priority_desc` - sorts by priority
  - [ ] `?category=name` - filters by category

## Frontend Features ✅
- [ ] Page loads without errors
- [ ] Todos are displayed correctly
- [ ] **Search** - works and filters results
- [ ] **Filter by Status** - All/Undone/Done buttons work
- [ ] **Sort by Priority** - Ascending/Descending buttons work
- [ ] **Add Todo** - form works with all fields:
  - [ ] Title (required)
  - [ ] Priority (1-10, default 5)
  - [ ] Due Date (optional)
  - [ ] Category (optional)
- [ ] **Mark as Done** - checkbox toggles completion
- [ ] **Delete Todo** - trash icon removes todo
- [ ] **Display Metadata**:
  - [ ] Priority badge with color coding
  - [ ] Due date with calendar icon
  - [ ] Category with tag icon
  - [ ] Overdue indicator (red text)

## Bonus Features ✅
- [ ] **Due Dates** - can set and display dates
- [ ] **Categories** - can set and display categories
- [ ] **Drag-and-Drop** - can reorder tasks (if packages installed)

## UI/UX ✅
- [ ] Responsive design works on mobile
- [ ] Toast notifications appear for actions
- [ ] Loading states work correctly
- [ ] Error messages are user-friendly
- [ ] Visual feedback for interactions
- [ ] Clean, modern design

## Testing ✅
- [ ] Create multiple todos with different priorities
- [ ] Test search with various terms
- [ ] Test all filter combinations
- [ ] Test sorting in both directions
- [ ] Test with empty states (no todos)
- [ ] Test edge cases (very long titles, etc.)

## Performance ✅
- [ ] Page loads quickly
- [ ] API responses are fast
- [ ] No memory leaks
- [ ] Smooth interactions

## Browser Compatibility ✅
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (if applicable)
- [ ] Mobile browsers

## Documentation ✅
- [ ] README is updated (optional)
- [ ] Code is commented where needed
- [ ] Environment variables are documented

---

## Quick Verification Command

Run this to check for common issues:

```bash
# Check for TypeScript errors
npm run build

# Check for linting errors  
npm run lint

# Start and test manually
npm run dev
```

Then visit:
- Frontend: http://localhost:3000
- API Docs: http://localhost:8000/docs

---

## If Everything Checks Out ✅

Your app is ready! All required features are implemented:
- ✅ Display list of all tasks
- ✅ Add a new task
- ✅ Remove a task
- ✅ Search for tasks
- ✅ Mark a task as done
- ✅ Filter tasks by status (all/done/undone)
- ✅ Assign priority to tasks (1-10)
- ✅ Sort tasks by priority (ascending/descending)

Plus bonus features:
- ✅ Due dates
- ✅ Categories
- ✅ Drag-and-drop

🎉 **You're all set!**
