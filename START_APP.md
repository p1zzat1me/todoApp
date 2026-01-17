# Quick Start Guide

## Step 1: Make sure everything is installed
```powershell
npm install --legacy-peer-deps
pip install -r requirements.txt
```

## Step 2: Stop any running servers
Press `Ctrl+C` in any terminal windows that might be running the app.

## Step 3: Start the app

### Option A: Start both together (Recommended)
Open ONE terminal and run:
```powershell
npm run dev
```

Wait until you see:
- `[1] INFO:     Uvicorn running on http://127.0.0.1:8000` (Backend)
- `[0] ✓ Ready in X seconds` (Frontend)

### Option B: Start separately

**Terminal 1 - Backend:**
```powershell
npm run fastapi-dev
```
Wait for: `Uvicorn running on http://127.0.0.1:8000`

**Terminal 2 - Frontend:**
```powershell
npm run next-dev
```
Wait for: `Ready on http://localhost:3000`

## Step 4: Visit your app
Open your browser and go to:
```
http://localhost:3000
```

## Troubleshooting

### If you see "Port already in use"
```powershell
# Find what's using port 3000
netstat -ano | findstr :3000

# Find what's using port 8000
netstat -ano | findstr :8000

# Kill the process (replace PID with the number from above)
taskkill /PID <PID_NUMBER> /F
```

### If you see build errors
```powershell
# Clean build
Remove-Item -Recurse -Force .next, node_modules, package-lock.json -ErrorAction SilentlyContinue
npm install --legacy-peer-deps
npm run dev
```

### If the page won't load
1. Make sure BOTH servers are running (check terminal output)
2. Try clearing browser cache (Ctrl+Shift+Delete)
3. Try a different browser
4. Check browser console (F12) for errors
