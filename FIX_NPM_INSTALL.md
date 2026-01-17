# Fix npm install Error

## Quick Fixes (Try in Order)

### 1. Try with Legacy Peer Deps (Most Common Fix)
```bash
npm install --legacy-peer-deps
```
This ignores peer dependency conflicts which are common with React 18.

### 2. Clean Install
```bash
# Delete node_modules and lock file
Remove-Item -Recurse -Force node_modules, package-lock.json

# Clear npm cache
npm cache clean --force

# Reinstall
npm install
```

### 3. If Still Failing - Install Without Drag-and-Drop First
The drag-and-drop packages might be causing issues. You can install without them first:

```bash
# Install core packages first
npm install --legacy-peer-deps --no-save @radix-ui/react-slot axios class-variance-authority clsx lucide-react next react react-dom react-hook-form react-hot-toast tailwind-merge tailwindcss typescript zod

# Then try installing drag-and-drop separately
npm install --legacy-peer-deps @dnd-kit/core@^6.1.0 @dnd-kit/sortable@^7.0.2 @dnd-kit/utilities@^3.2.2
```

### 4. Alternative: Skip Drag-and-Drop (App Still Works)
If drag-and-drop packages keep failing, you can remove them temporarily:

1. Edit `package.json` and remove these 3 lines:
   ```json
   "@dnd-kit/core": "^6.1.0",
   "@dnd-kit/sortable": "^7.0.2",
   "@dnd-kit/utilities": "^3.2.2"
   ```

2. Then install:
   ```bash
   npm install --legacy-peer-deps
   ```

3. The app will work perfectly, just without drag-and-drop functionality.

## Most Likely Solution

**90% of npm install errors are fixed by:**
```bash
npm install --legacy-peer-deps
```

Try this first!

## If You Get a Specific Error

Please share the **exact error message** you're seeing. Common ones:

- **"ERESOLVE"** → Use `--legacy-peer-deps`
- **"EACCES"** → Permission issue, run as admin or fix npm permissions
- **"ENOENT"** → Missing file/folder, try clean install
- **"Cannot find module"** → Delete node_modules and reinstall
- **Network timeout** → Check internet or use `--timeout=60000`

## Verify Your Setup

Before installing, make sure:
```bash
# Check Node.js is installed
node --version
# Should show v16+ or v18+

# Check npm is installed  
npm --version
# Should show 8+ or 9+

# Check you're in the right directory
Get-Location
# Should be in: .../nextjs-fastapi-todo-app-main
```

## Still Stuck?

Share the **full error message** and I'll help you fix it specifically!
