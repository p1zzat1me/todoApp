# Fix "Site Can't Be Reached" Error

This means Next.js frontend isn't running. Let's fix it step by step.

## Step 1: Check What's Happening in Terminal

When you run `npm run dev`, you should see **TWO processes**:
- `[0]` = Next.js frontend
- `[1]` = FastAPI backend

**Look at your terminal and tell me:**
1. Do you see `[0]` process output?
2. Do you see any **red error messages**?
3. Does it say "Ready on http://localhost:3000"?

---

## Step 2: Try Starting Separately

Sometimes `npm run dev` has issues. Let's start them separately:

### Open TWO terminals:

**Terminal 1 - Backend:**
```bash
npm run fastapi-dev
```
Wait until you see: `Uvicorn running on http://127.0.0.1:8000`

**Terminal 2 - Frontend:**
```bash
npm run next-dev
```
Wait until you see: `Ready on http://localhost:3000`

---

## Step 3: Common Issues & Fixes

### Issue: Next.js won't start

**Check:**
1. Are you in the correct folder? (should be project root)
2. Are dependencies installed? Run: `npm install --legacy-peer-deps`
3. Check for errors in terminal

**Fix:**
```bash
# Clean install
Remove-Item -Recurse -Force node_modules, package-lock.json, .next
npm install --legacy-peer-deps
npm run next-dev
```

### Issue: Build errors

**Check terminal for:**
- TypeScript errors
- Import errors
- Missing dependencies

**Fix:**
```bash
# Reinstall everything
npm install --legacy-peer-deps
```

### Issue: Port 3000 blocked

**Check:**
```powershell
netstat -ano | findstr :3000
```

**Fix:**
- Kill the process using port 3000
- Or change port in `package.json`:
  ```json
  "next-dev": "next dev -p 3001"
  ```

---

## Step 4: Check for Specific Errors

### Error: "Cannot find module"
```bash
npm install --legacy-peer-deps
```

### Error: "EADDRINUSE" (port in use)
```powershell
# Find and kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

### Error: TypeScript/build errors
- Check `tsconfig.json` is correct
- Check all imports are valid
- Run: `npm run build` to see detailed errors

---

## Step 5: Verify Setup

Make sure you have:
- [ ] `.env` file exists
- [ ] `node_modules` folder exists
- [ ] `package.json` is in root folder
- [ ] No syntax errors in code

---

## Quick Diagnostic

Run these commands and share the output:

```bash
# Check Node.js
node --version

# Check npm
npm --version

# Check if in right folder
Get-Location

# Check if .env exists
Test-Path .env

# Try starting Next.js directly
npm run next-dev
```

---

## Still Not Working?

**Please share:**
1. The **exact error message** from terminal
2. What you see when running `npm run next-dev`
3. Any red text in the terminal

This will help me diagnose the exact issue!
