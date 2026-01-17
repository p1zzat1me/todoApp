# Railway Deployment Guide - Step by Step

This guide will help you deploy your FastAPI backend to Railway.

## Prerequisites

- ✅ Your code is pushed to GitHub
- ✅ You have a Railway account (free at https://railway.app)
- ✅ You have your PostgreSQL database URL (from Render or wherever you created it)

---

## Step 1: Prepare Your GitHub Repository

Make sure your code is pushed to GitHub:

1. **Commit all changes:**
   ```powershell
   git add .
   git commit -m "Prepare for Railway deployment"
   git push
   ```

2. **Verify your repository is up to date** on GitHub

---

## Step 2: Sign Up / Log In to Railway

1. **Go to:** https://railway.app
2. **Click:** "Login" or "Start a New Project"
3. **Sign up** with GitHub (recommended) or email

---

## Step 3: Create New Project

1. **Click:** "New Project" (or "+ New" button)
2. **Select:** "Deploy from GitHub repo"
3. **Authorize Railway** to access your GitHub (if prompted)
4. **Select your repository** from the list
5. **Click:** "Deploy Now"

---

## Step 4: Configure the Service

After Railway creates the project, you need to configure it:

### 4.1. Change Service Type (Important!)

1. **Click on your service** (it might be named after your repo)
2. **Go to:** "Settings" tab
3. **Under "Deploy":**
   - **Root Directory:** Leave empty (Railway will detect it)
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn api.index:app --host 0.0.0.0 --port $PORT`

### 4.2. Add Environment Variables

1. **Go to:** "Variables" tab
2. **Click:** "+ New Variable"
3. **Add this variable:**
   ```
   Name: DATABASE_URL
   Value: your_postgresql_connection_string_here
   ```
   
   **Example:** 
   ```
   postgresql://niki:R0eJzsrBLq2rIgZKtIrtZm64Uxe0xEDR@dpg-d5lsfbdactks73bu53fg-a.oregon-postgres.render.com:5432/todo_ry10
   ```

4. **Click:** "Add" to save

### 4.3. Set Python Version (Optional but Recommended)

1. **Go to:** "Variables" tab
2. **Click:** "+ New Variable"
3. **Add:**
   ```
   Name: PYTHON_VERSION
   Value: 3.11
   ```

---

## Step 5: Configure Port and Health Check

Railway automatically sets the `$PORT` environment variable, which we're using in the start command.

### 5.1. Check Service Health

1. **Go to:** "Settings" tab
2. **Scroll to:** "Healthcheck Path"
3. **Set:** `/health` (optional, but helps Railway monitor your service)

---

## Step 6: Deploy

1. **Railway will automatically start building** when you save settings
2. **Watch the build logs** in the "Deployments" tab
3. **Wait for:** "Build successful" message

---

## Step 7: Get Your Backend URL

1. **Go to:** "Settings" tab
2. **Scroll to:** "Domains" section
3. **Click:** "Generate Domain" (if not already generated)
4. **Copy the URL** (it will look like: `https://your-app-name.up.railway.app`)

**This is your backend URL!** Save it - you'll need it for the next step.

---

## Step 8: Configure Vercel to Use Railway Backend

1. **Go to:** Your Vercel project dashboard
2. **Settings** → **Environment Variables**
3. **Add new variable:**
   ```
   Name: NEXT_PUBLIC_API_URL
   Value: https://your-app-name.up.railway.app
   ```
   (Replace with your actual Railway URL)
4. **Environment:** Select "Production", "Preview", and "Development" (or just Production)
5. **Click:** "Save"
6. **Redeploy** your Vercel app (go to "Deployments" → click "..." → "Redeploy")

---

## Step 9: Update CORS in Backend (if needed)

Your backend CORS is already configured to allow all origins. If you want to restrict it:

1. **Go to:** Railway → Your service → "Variables"
2. **Add:**
   ```
   Name: ALLOWED_ORIGINS
   Value: https://your-vercel-app.vercel.app,https://your-vercel-app-*.vercel.app
   ```
   (Replace with your actual Vercel URLs)

---

## Step 10: Test Your Deployment

1. **Visit your Railway backend:**
   - `https://your-app-name.up.railway.app/docs` (should show FastAPI docs)
   - `https://your-app-name.up.railway.app/health` (should show health status)

2. **Visit your Vercel frontend:**
   - Try adding a todo
   - Check browser console (F12) for any errors

---

## Troubleshooting

### Build Fails: "Module not found"

**Solution:** Make sure `requirements.txt` is in the root directory and includes all dependencies.

### Service Won't Start: "Port already in use"

**Solution:** Make sure your start command uses `$PORT` environment variable:
```
uvicorn api.index:app --host 0.0.0.0 --port $PORT
```

### Database Connection Error

**Solution:**
1. Check your `DATABASE_URL` in Railway Variables
2. Make sure it's the external connection string (not internal)
3. Verify the database is accessible from Railway's servers

### CORS Errors in Browser

**Solution:**
1. Make sure your Vercel frontend URL is in the backend's allowed origins
2. Or use `ALLOWED_ORIGINS=*` in Railway variables (for development)

### Service Keeps Restarting

**Check logs:**
1. Go to Railway → Your service → "Deployments"
2. Click on the latest deployment
3. Check "Logs" tab for error messages

---

## Quick Commands Reference

**Railway CLI (optional):**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link to project
railway link

# Deploy
railway up
```

**Check service status:**
- Visit: `https://your-app.up.railway.app/health`
- Should return: `{"status": "ok", "server": "running", "database": "connected"}`

---

## Environment Variables Summary

| Variable | Value | Purpose |
|----------|-------|---------|
| `DATABASE_URL` | `postgresql://...` | Database connection string |
| `PYTHON_VERSION` | `3.11` | Python version (optional) |
| `ALLOWED_ORIGINS` | `https://...` | CORS origins (optional) |

---

## Next Steps After Deployment

1. ✅ Test your backend API at `https://your-app.up.railway.app/docs`
2. ✅ Update Vercel environment variables with your Railway URL
3. ✅ Redeploy Vercel app
4. ✅ Test the full app (frontend + backend)

---

## Need Help?

- **Railway Docs:** https://docs.railway.app
- **Railway Discord:** https://discord.gg/railway
- **Check logs:** Railway dashboard → Your service → Deployments → Logs

---

## Success Checklist

- [ ] Code pushed to GitHub
- [ ] Railway project created
- [ ] Build command set: `pip install -r requirements.txt`
- [ ] Start command set: `uvicorn api.index:app --host 0.0.0.0 --port $PORT`
- [ ] `DATABASE_URL` environment variable added
- [ ] Service deployed successfully
- [ ] Backend URL obtained
- [ ] Vercel `NEXT_PUBLIC_API_URL` set
- [ ] Vercel app redeployed
- [ ] Tested adding todos
- [ ] Everything works! 🎉

Good luck with your deployment! 🚀
