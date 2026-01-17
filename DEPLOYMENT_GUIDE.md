# Deployment Guide - Vercel + FastAPI Backend

## The Problem

Vercel only hosts your **Next.js frontend**, not your FastAPI backend. Your frontend needs to connect to a separately deployed backend.

## Solution: Deploy Backend Separately

You need to deploy your FastAPI backend to a service that supports Python apps, then configure your Vercel frontend to use it.

---

## Step 1: Deploy FastAPI Backend

Choose one of these platforms:

### Option A: Railway (Recommended - Easy)

1. **Go to** https://railway.app
2. **Sign up** or log in
3. **Create new project** → "Deploy from GitHub repo"
4. **Select your repo** (or connect it)
5. **Add service** → "Empty Service"
6. **Settings** → Add these environment variables:
   ```
   DATABASE_URL=your_postgresql_connection_string
   ```
7. **Settings** → Build command: `pip install -r requirements.txt`
8. **Settings** → Start command: `uvicorn api.index:app --host 0.0.0.0 --port $PORT`
9. Railway will give you a URL like: `https://your-app.up.railway.app`

### Option B: Render

1. **Go to** https://render.com
2. **Sign up** or log in
3. **New** → "Web Service"
4. **Connect your GitHub repo**
5. **Settings:**
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn api.index:app --host 0.0.0.0 --port $PORT`
   - Environment: Python 3
6. **Environment Variables:**
   ```
   DATABASE_URL=your_postgresql_connection_string
   ```
7. Render will give you a URL like: `https://your-app.onrender.com`

### Option C: Fly.io

1. **Install Fly CLI:** https://fly.io/docs/getting-started/installing-flyctl/
2. **Login:** `fly auth login`
3. **In your project:** `fly launch`
4. **Follow prompts** and set environment variables
5. **Deploy:** `fly deploy`

---

## Step 2: Configure Vercel Environment Variables

1. **Go to your Vercel project** dashboard
2. **Settings** → **Environment Variables**
3. **Add these variables:**

   | Name | Value | Environment |
   |------|-------|-------------|
   | `NEXT_PUBLIC_API_URL` | `https://your-backend-url.railway.app` (or your backend URL) | Production, Preview |

   **Important:** Replace `your-backend-url.railway.app` with your actual backend URL!

4. **Save** and **Redeploy** your Vercel app

---

## Step 3: Update Your Code

The code has been updated to:
- ✅ Check for `NEXT_PUBLIC_API_URL` in production
- ✅ Show error if not configured
- ✅ Use the deployed backend URL when available

---

## Step 4: Test Your Deployment

1. **Visit your Vercel app** (e.g., `https://your-app.vercel.app`)
2. **Open browser console** (F12)
3. **Check console logs** - you should see your backend URL
4. **Try adding a todo** - it should work!

---

## Troubleshooting

### Error: "Backend API URL not configured"

**Solution:** Set `NEXT_PUBLIC_API_URL` in Vercel environment variables

### Error: "Cannot connect to server"

**Check:**
1. Is your backend deployed and running?
2. Visit your backend URL directly: `https://your-backend-url.railway.app/docs`
3. Check CORS settings in your backend - make sure it allows your Vercel domain

### Error: "405 Method Not Allowed"

**Solution:** Your backend might not be running or the URL is wrong. Check your `NEXT_PUBLIC_API_URL` environment variable.

### CORS Errors

**Fix:** Update your FastAPI CORS settings to include your Vercel domain:

```python
origins = [
    "http://localhost:3000",
    "https://your-app.vercel.app",  # Add your Vercel URL
    "https://*.vercel.app",  # Or allow all Vercel preview deployments
]
```

---

## Quick Checklist

- [ ] Backend deployed (Railway/Render/Fly.io)
- [ ] Backend URL works (visit `/docs` endpoint)
- [ ] `NEXT_PUBLIC_API_URL` set in Vercel
- [ ] CORS configured in backend for your Vercel domain
- [ ] Vercel app redeployed after setting env vars
- [ ] Tested adding a todo in production

---

## Example URLs

After deployment, your setup should look like:

- **Frontend (Vercel):** `https://your-app.vercel.app`
- **Backend (Railway):** `https://your-api.up.railway.app`
- **Environment Variable:** `NEXT_PUBLIC_API_URL=https://your-api.up.railway.app`

---

## Need Help?

If you're still having issues:
1. Check your browser console for errors
2. Check your backend logs (Railway/Render dashboard)
3. Verify your environment variables are set correctly
4. Make sure your backend is actually running
