# Troubleshooting npm install Errors

## Common npm install Errors and Solutions

### Error 1: "npm is not recognized"
**Problem:** Node.js/npm is not installed or not in PATH.

**Solution:**
1. Install Node.js from https://nodejs.org/
2. Choose LTS version (recommended)
3. Restart your terminal/IDE after installation
4. Verify installation:
   ```bash
   node --version
   npm --version
   ```

### Error 2: "EACCES: permission denied"
**Problem:** Permission issues on Windows.

**Solution:**
1. Run terminal as Administrator
2. Or use a different directory that doesn't require admin rights
3. Or configure npm to use a different directory:
   ```bash
   npm config set prefix %APPDATA%\npm
   ```

### Error 3: "ERR! code ERESOLVE" or dependency conflicts
**Problem:** Package version conflicts.

**Solution:**
```bash
# Try with legacy peer deps
npm install --legacy-peer-deps

# Or force install
npm install --force

# Or clear cache and retry
npm cache clean --force
npm install
```

### Error 4: "Cannot find module" or missing dependencies
**Problem:** node_modules corrupted or incomplete.

**Solution:**
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json
# On Windows PowerShell:
Remove-Item -Recurse -Force node_modules, package-lock.json

# Then reinstall
npm install
```

### Error 5: Network/timeout errors
**Problem:** Network issues or slow connection.

**Solution:**
```bash
# Increase timeout
npm install --timeout=60000

# Or use different registry
npm install --registry https://registry.npmjs.org/

# Or clear cache
npm cache clean --force
```

### Error 6: Python/pip errors (for FastAPI)
**Problem:** Python dependencies failing.

**Solution:**
1. Ensure Python 3.8+ is installed
2. Install pip if missing:
   ```bash
   python -m ensurepip --upgrade
   ```
3. Install Python dependencies separately:
   ```bash
   pip install -r requirements.txt
   ```

### Error 7: "@dnd-kit" package errors
**Problem:** Drag-and-drop packages might have compatibility issues.

**Solution:**
```bash
# Try installing with specific versions
npm install @dnd-kit/core@^6.0.0 @dnd-kit/sortable@^8.0.0 @dnd-kit/utilities@^3.2.0

# Or skip drag-and-drop packages if not needed
# The app will work without them (just no drag-and-drop)
```

### Error 8: TypeScript or build errors
**Problem:** Type errors during installation.

**Solution:**
```bash
# Install without running post-install scripts
npm install --ignore-scripts

# Then fix TypeScript issues separately
npm run build
```

## Step-by-Step Clean Install

If nothing works, try a complete clean install:

```bash
# 1. Delete everything
Remove-Item -Recurse -Force node_modules, package-lock.json

# 2. Clear npm cache
npm cache clean --force

# 3. Verify Node.js version (should be 16+)
node --version

# 4. Update npm to latest
npm install -g npm@latest

# 5. Install dependencies
npm install

# 6. If still failing, try with legacy peer deps
npm install --legacy-peer-deps
```

## Alternative: Install Without Drag-and-Drop

If @dnd-kit packages are causing issues, you can temporarily remove them:

1. Edit `package.json` and remove these lines:
   ```json
   "@dnd-kit/core": "^6.1.0",
   "@dnd-kit/sortable": "^8.0.0",
   "@dnd-kit/utilities": "^3.2.2"
   ```

2. The app will still work, just without drag-and-drop functionality.

3. Install:
   ```bash
   npm install
   ```

## Check Your Environment

Run these commands to check your setup:

```bash
# Check Node.js version (should be 16+)
node --version

# Check npm version (should be 8+)
npm --version

# Check if you're in the right directory
pwd
# Should show: .../nextjs-fastapi-todo-app-main

# Check if package.json exists
Test-Path package.json
# Should return: True
```

## Still Having Issues?

1. **Share the exact error message** - Copy the full error output
2. **Check Node.js version** - Run `node --version`
3. **Check npm version** - Run `npm --version`
4. **Check if you're in the right directory** - Should be in the project root
5. **Try installing one package at a time** to identify the problematic package

## Quick Fixes Summary

```bash
# Most common fix
npm install --legacy-peer-deps

# If that doesn't work
npm cache clean --force
npm install

# Nuclear option (clean everything)
Remove-Item -Recurse -Force node_modules, package-lock.json
npm cache clean --force
npm install
```
