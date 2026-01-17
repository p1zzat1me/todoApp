# Start Frontend - Step by Step

## The Problem
"Site can't be reached" means Next.js isn't running. Let's start it properly.

## Solution: Start Servers Separately

### Step 1: Start Backend First

Open **Terminal 1** and run:
```bash
npm run fastapi-dev
```

**Wait for this message:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000
```

**Don't close this terminal!** Keep it running.

---

### Step 2: Start Frontend

Open **Terminal 2** (new terminal window) and run:
```bash
npm run next-dev
```

**Wait for this message:**
```
▲ Next.js 13.4.4
- Local:        http://localhost:3000
✓ Ready in X seconds
```

---

### Step 3: Open Browser

Once you see "Ready" in Terminal 2:
1. Open your browser
2. Go to: **http://localhost:3000**
3. You should see your TODO app! 🎉

---

## If Next.js Still Won't Start

### Check for Errors

Look at Terminal 2 output. Common errors:

**Error: "Cannot find module"**
```bash
npm install --legacy-peer-deps
```

**Error: "Port 3000 already in use"**
```powershell
# Find what's using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual number)
taskkill /PID <PID_NUMBER> /F
```

**Error: Build/TypeScript errors**
- Share the exact error message
- Check if all files are saved

---

## Quick Test

1. **Terminal 1:** `npm run fastapi-dev` → Should show "Uvicorn running"
2. **Terminal 2:** `npm run next-dev` → Should show "Ready"
3. **Browser:** http://localhost:3000 → Should show app

---

## Still Not Working?

**Please share:**
1. What you see in Terminal 2 when running `npm run next-dev`
2. Any red error messages
3. The last few lines of output

This will help me fix the exact issue!
