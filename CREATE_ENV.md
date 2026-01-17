# How to Create Your .env File

Since `.env` files are protected (for security), follow these steps:

## Quick Method

1. **Copy the template:**
   ```bash
   # On Windows PowerShell:
   Copy-Item env.template .env
   
   # On Windows CMD:
   copy env.template .env
   
   # On Mac/Linux:
   cp env.template .env
   ```

2. **Edit the `.env` file** and replace the placeholder values with your actual database credentials.

## Manual Method

1. **Create a new file** named `.env` in the root directory (same folder as `package.json`)

2. **Copy and paste this content:**
   ```env
   DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/todo_db
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

3. **Replace the values:**
   - `yourpassword` → Your PostgreSQL password
   - `todo_db` → Your database name (or keep `todo_db` if that's what you named it)
   - `postgres` → Your PostgreSQL username (usually `postgres`)

## Example Configurations

### Local PostgreSQL (Default)
```env
DATABASE_URL=postgresql://postgres:mypassword123@localhost:5432/todo_db
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Supabase (Cloud Database)
```env
DATABASE_URL=postgresql://postgres.abcdefgh:yourpassword@aws-0-us-east-1.pooler.supabase.com:6543/postgres
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Neon (Cloud Database)
```env
DATABASE_URL=postgresql://user:password@ep-cool-darkness-123456.us-east-2.aws.neon.tech/neondb
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Important Notes

- ✅ The `.env` file is already in `.gitignore` (won't be committed to Git)
- ✅ Never share your `.env` file or commit it to version control
- ✅ The `NEXT_PUBLIC_API_URL` should be `http://localhost:8000` for local development
- ✅ Make sure there are **no spaces** around the `=` sign
- ✅ Don't use quotes around the values

## Verify It Works

After creating the `.env` file:

1. Start the app: `npm run dev`
2. Check the terminal - you should see "Creating tables.." 
3. If you see database connection errors, double-check your `DATABASE_URL`

## Need Help Getting Database URL?

### If using local PostgreSQL:
- Username: Usually `postgres`
- Password: The one you set during installation
- Host: `localhost`
- Port: `5432` (default)
- Database: Create one with `CREATE DATABASE todo_db;`

### If using cloud database:
- Check your database provider's dashboard
- Look for "Connection String" or "Database URL"
- Copy the PostgreSQL connection string

---

**Once you've created the `.env` file, you're ready to start the app!** 🚀
