# How to Check if Tasks Are Saved in Database

Here are several ways to verify your task "make a breakfast" is in the database:

## Method 1: Using pgAdmin (Easiest - GUI)

1. **Open pgAdmin** (from Start menu)

2. **Connect to your server:**
   - Click on "Servers" → "PostgreSQL 17" (or your version)
   - Enter password: `niki`
   - Click "Save"

3. **Navigate to your database:**
   - Expand "Databases"
   - Expand "todo_db"
   - Expand "Schemas"
   - Expand "public"
   - Expand "Tables"
   - Right-click on "todo" table
   - Click "View/Edit Data" → "All Rows"

4. **You should see:**
   - Your task "make a breakfast"
   - All the fields: id, title, completed, priority, due_date, category

✅ **If you see your task → It's saved!**

---

## Method 2: Using API (Browser - Quick Check)

1. **Open your browser**

2. **Go to:**
   ```
   http://localhost:8000/api/todos
   ```

3. **You should see JSON like:**
   ```json
   {
     "todos": [
       {
         "id": 1,
         "title": "make a breakfast",
         "completed": false,
         "priority": 7,
         "due_date": "2027-06-02",
         "category": "chores"
       }
     ]
   }
   ```

✅ **If you see your task in the JSON → It's saved!**

---

## Method 3: Using FastAPI Docs (Interactive)

1. **Open your browser**

2. **Go to:**
   ```
   http://localhost:8000/docs
   ```

3. **Find the endpoint:** `GET /api/todos`

4. **Click "Try it out"**

5. **Click "Execute"**

6. **Check the response** - you should see your task listed

✅ **If you see your task → It's saved!**

---

## Method 4: Using psql (Command Line)

If you have psql in your PATH:

```bash
psql -U postgres -d todo_db
```

Then enter password: `niki`

Then run:
```sql
SELECT * FROM todo;
```

You should see all your tasks including "make a breakfast"

---

## Method 5: Check in Your App

1. **Open:** http://localhost:3000

2. **Look for your task:**
   - "make a breakfast" should appear in the task list
   - If it's there → It's in the database!

---

## Quick Verification Checklist

- [ ] Task appears in pgAdmin (Method 1)
- [ ] Task appears in API response (Method 2)
- [ ] Task appears in FastAPI docs (Method 3)
- [ ] Task appears in the app (Method 5)

If any of these show your task → **It's definitely saved!** ✅

---

## What to Look For

Your task should have:
- **id**: A number (1, 2, 3, etc.)
- **title**: "make a breakfast"
- **completed**: false (or true if you checked it)
- **priority**: The number you set (e.g., 7)
- **due_date**: The date you set (e.g., "2027-06-02")
- **category**: The category you set (e.g., "chores")

---

## Troubleshooting

### "I don't see my task"

1. **Check if backend is running:**
   - Go to http://localhost:8000/docs
   - If it doesn't load → Backend isn't running

2. **Check database connection:**
   - Look at terminal for errors
   - Check `.env` file has correct password

3. **Try creating another task:**
   - If new tasks appear → Database is working
   - If not → There might be a connection issue

---

## Recommended: Use Method 2 (API)

**Fastest way:** Just open http://localhost:8000/api/todos in your browser and you'll see all tasks as JSON!
