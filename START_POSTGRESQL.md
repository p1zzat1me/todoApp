# How to Start PostgreSQL Server

## Step 1: Check if PostgreSQL is Installed

### Option A: Check via Services
1. Press `Windows Key + R`
2. Type `services.msc` and press Enter
3. Look for **"postgresql"** in the list
   - If you see it, PostgreSQL is installed ✅
   - If you don't see it, you need to install it first

### Option B: Check via Command Line
Open PowerShell or Command Prompt and run:
```bash
psql --version
```
- If you see a version number → PostgreSQL is installed ✅
- If you get "command not found" → Need to install PostgreSQL

---

## Step 2: Start PostgreSQL Service

### Method 1: Using Services (Easiest)

1. Press `Windows Key + R`
2. Type `services.msc` and press Enter
3. Find **"postgresql-x64-XX"** (XX is version number, e.g., 14, 15, 16)
   - Or look for **"PostgreSQL Server"**
4. Right-click on it
5. Click **"Start"** (if it's stopped)
   - If it says "Running", you're good! ✅
   - If it's already running, you can click "Restart" to refresh it

**To make it start automatically:**
- Right-click → Properties
- Set "Startup type" to **"Automatic"**
- Click OK

### Method 2: Using Command Line (PowerShell as Administrator)

1. Open PowerShell as Administrator:
   - Right-click Start button
   - Click "Windows PowerShell (Admin)" or "Terminal (Admin)"

2. Find the service name:
   ```powershell
   Get-Service | Where-Object {$_.Name -like "*postgresql*"}
   ```

3. Start the service (replace `postgresql-x64-14` with your actual service name):
   ```powershell
   Start-Service postgresql-x64-14
   ```

   Or try:
   ```powershell
   Start-Service postgresql-x64-15
   Start-Service postgresql-x64-16
   ```

### Method 3: Using pg_ctl (Advanced)

If you know where PostgreSQL is installed:
```bash
# Navigate to PostgreSQL bin directory (usually)
cd "C:\Program Files\PostgreSQL\16\bin"

# Start server
pg_ctl start -D "C:\Program Files\PostgreSQL\16\data"
```

---

## Step 3: Verify PostgreSQL is Running

### Check if it's listening on port 5432:
```bash
netstat -an | findstr 5432
```
You should see something like: `0.0.0.0:5432` or `127.0.0.1:5432`

### Try connecting with psql:
```bash
psql -U postgres
```
- If it asks for password → PostgreSQL is running! ✅
- If it says "connection refused" → Service is not running

---

## Step 4: Create Your Database

Once PostgreSQL is running, create the database for your app:

### Option A: Using pgAdmin (GUI - Easier)

1. Open **pgAdmin** (usually in Start menu)
2. Connect to your server (enter password if asked)
3. Right-click on **"Databases"**
4. Click **"Create"** → **"Database..."**
5. Name it: `todo_db`
6. Click **"Save"**

### Option B: Using Command Line

1. Open PowerShell or Command Prompt
2. Connect to PostgreSQL:
   ```bash
   psql -U postgres
   ```
   (Enter your password when prompted)

3. Create the database:
   ```sql
   CREATE DATABASE todo_db;
   ```

4. Verify it was created:
   ```sql
   \l
   ```
   (You should see `todo_db` in the list)

5. Exit:
   ```sql
   \q
   ```

---

## Step 5: Update Your .env File

Now update your `.env` file with the correct connection string:

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/todo_db
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Replace `YOUR_PASSWORD` with the password you set during PostgreSQL installation.

---

## Troubleshooting

### "Service won't start"
- Check if port 5432 is already in use:
  ```bash
  netstat -an | findstr 5432
  ```
- Try restarting your computer
- Check Windows Event Viewer for errors

### "Access denied" or "Permission denied"
- Make sure you're using the correct password
- Default username is usually `postgres`
- If you forgot the password, you may need to reset it

### "psql: command not found"
- PostgreSQL might not be in your PATH
- Add it manually or use full path:
  ```bash
  "C:\Program Files\PostgreSQL\16\bin\psql.exe" -U postgres
  ```

### "Port 5432 already in use"
- Another PostgreSQL instance might be running
- Or another application is using that port
- Check what's using the port:
  ```bash
  netstat -ano | findstr :5432
  ```

---

## Alternative: Use Cloud Database (Easier!)

If PostgreSQL setup is too complicated, use a free cloud database:

### Option 1: Supabase (Recommended - Easiest)
1. Go to https://supabase.com
2. Sign up (free)
3. Create a new project
4. Go to Settings → Database
5. Copy the connection string
6. Use it in your `.env` file

### Option 2: Neon
1. Go to https://neon.tech
2. Sign up (free)
3. Create a project
4. Copy the connection string
5. Use it in your `.env` file

### Option 3: Railway
1. Go to https://railway.app
2. Sign up (free)
3. Create PostgreSQL database
4. Copy the connection string
5. Use it in your `.env` file

**Advantages of cloud databases:**
- ✅ No installation needed
- ✅ No need to start/stop services
- ✅ Works immediately
- ✅ Free tier available
- ✅ Accessible from anywhere

---

## Quick Start Checklist

- [ ] PostgreSQL is installed
- [ ] PostgreSQL service is running (check Services)
- [ ] Database `todo_db` is created
- [ ] `.env` file has correct `DATABASE_URL`
- [ ] Can connect with `psql -U postgres`

Once all checked, you're ready to start your app! 🚀

---

## Still Having Issues?

1. **Check if PostgreSQL is installed:**
   - Look in Start menu for "PostgreSQL" or "pgAdmin"
   - Check `C:\Program Files\PostgreSQL\`

2. **If not installed:**
   - Download from https://www.postgresql.org/download/windows/
   - Use the installer (EnterpriseDB)
   - Remember the password you set!

3. **If installed but won't start:**
   - Check Windows Event Viewer for errors
   - Try restarting your computer
   - Reinstall PostgreSQL if needed

4. **Consider using cloud database** (much easier for beginners!)
