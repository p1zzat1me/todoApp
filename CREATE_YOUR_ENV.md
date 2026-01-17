# Create Your .env File Now

Your `env.template` is ready with your credentials! Now create the actual `.env` file:

## Quick Method (PowerShell)

Run this command in your project folder:

```powershell
Copy-Item env.template .env
```

## Manual Method

1. Create a new file named `.env` (with the dot at the start)
2. Copy and paste this content:

```env
DATABASE_URL=postgresql://postgres:niki@localhost:5432/todo_db
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Verify

Your `.env` file should contain:
- ✅ Database: `todo_db`
- ✅ Username: `postgres`
- ✅ Password: `niki`
- ✅ Host: `localhost:5432`

## Next Steps

1. Make sure PostgreSQL service is running (check Services)
2. Make sure `todo_db` database exists
3. Start your app: `npm run dev`

You're all set! 🚀
