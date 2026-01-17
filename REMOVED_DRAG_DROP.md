# Drag and Drop Removed

The drag-and-drop feature has been removed because:
- It was only visual (didn't persist to database)
- Order was lost on page refresh
- Not really useful for the user experience

## What Was Removed

- `SortableTodos` component (still exists but not used)
- Drag handle (grip icon) on todo items
- Drag-and-drop functionality

## Current Features

The app still has all the useful features:
- ✅ Search tasks
- ✅ Filter by status (All/Done/Undone)
- ✅ Sort by priority
- ✅ Edit todos (click Edit button)
- ✅ Delete todos
- ✅ Add todos with priority, due date, category
- ✅ Mark as done/undone

## If You Want Drag-and-Drop Back

If you want to re-enable drag-and-drop with persistence, we would need to:
1. Add an `order` or `position` field to the database
2. Update the API to save order when items are reordered
3. Load todos sorted by order field
4. Update order in database when drag ends

But for now, it's removed since it wasn't useful without persistence.
