# Free CI/CD Deployment: GitHub Actions + Render

## 🎯 What You Get (ALL FREE!)

- **GitHub Actions**: Free CI/CD pipeline (unlimited for public repos)
- **Render**: Free tier for both backend and frontend
- **Automatic Deployments**: Push to GitHub → Auto-deploy to Render
- **No credit card required**

---

## 📋 Step 1: Prepare Your Code

### Initialize Git Repository

```bash
cd /Users/apple/Desktop/CIcd/jobportal-yt

# Initialize git
git init
git add .
git commit -m "Initial commit"
git branch -M main
```

### Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Create repository named `jobportal-yt` (or your choice)
3. Don't initialize with README
4. Click "Create repository"

### Push Your Code to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/jobportal-yt.git
git push -u origin main
```

---

## 🚀 Step 2: Deploy Backend on Render

### 2.1 Connect Render to GitHub

1. Go to [render.com](https://render.com)
2. Sign up with GitHub (this is easiest)
3. Grant permissions to access your repositories

### 2.2 Create Backend Service

1. Click "New +" → "Web Service"
2. Select your `jobportal-yt` repository
3. Configure:
   - **Name**: `jobportal-backend`
   - **Environment**: Node
   - **Region**: Choose closest to users
   - **Branch**: `main`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm run dev`

4. **Click "Create Web Service"**

### 2.3 Add Environment Variables (Backend)

In Render dashboard for backend service:
- Click "Environment"
- Add these variables:

```
MONGO_URI=mongodb+srv://shvm208:shvm2270@cluster0.cooghst.mongodb.net/jobportal?retryWrites=true&w=majority
SECRET_KEY=shivam2270
CLOUD_NAME=dqxevwcnw
API_KEY=499678813237232
API_SECRET=GWly8QmkvZiv8-B0qaIVapb5ApY
NODE_ENV=production
PORT=3000
CLIENT_URL=https://jobportal-frontend-xxxx.onrender.com
```

Replace `jobportal-frontend-xxxx` with your frontend URL (you'll get it in Step 3)

### 2.4 Get Your Backend URL

- Render will give you a URL like: `https://jobportal-backend-xxxx.onrender.com`
- Wait for first deployment to complete (5-10 minutes)

---

## 🎨 Step 3: Deploy Frontend on Render

### 3.1 Create Frontend Service

1. Click "New +" → "Web Service"
2. Select your `jobportal-yt` repository
3. Configure:
   - **Name**: `jobportal-frontend`
   - **Environment**: Node
   - **Region**: Same as backend
   - **Branch**: `main`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Start Command**: `cd frontend && npx serve -s dist -l 3000`

4. **Click "Create Web Service"**

### 3.2 Add Environment Variables (Frontend)

In Render dashboard for frontend service:
- Click "Environment"
- Add this variable:

```
VITE_API_BASE_URL=https://jobportal-backend-xxxx.onrender.com
```

Replace with your actual backend URL from Step 2.4

### 3.3 Update Backend's CLIENT_URL

1. Go back to backend service
2. Click "Environment"
3. Update `CLIENT_URL` to your frontend URL (something like `https://jobportal-frontend-xxxx.onrender.com`)
4. Trigger redeploy

---

## 🤖 Step 4: Set Up GitHub Actions CI/CD

### 4.1 Get Render API Key

1. Go to [render.com/account/api-tokens](https://render.com/account/api-tokens)
2. Create new API token
3. Copy the token

### 4.2 Get Service IDs

For each service (backend & frontend):

1. Go to service dashboard on Render
2. URL will look like: `https://dashboard.render.com/web/srv-c1234567890`
3. The `c1234567890` part is your Service ID
4. Save both backend and frontend Service IDs

### 4.3 Add GitHub Secrets

1. Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. Click "New repository secret"
3. Add these 3 secrets:

| Secret Name | Value |
|---|---|
| `RENDER_API_KEY` | Your Render API token from 4.1 |
| `RENDER_BACKEND_SERVICE_ID` | Backend Service ID (without `srv-`) |
| `RENDER_FRONTEND_SERVICE_ID` | Frontend Service ID (without `srv-`) |

**Example:**
- Service URL: `https://dashboard.render.com/web/srv-c1234567890`
- Service ID: `c1234567890` (store this value)

---

## ✨ Step 5: Test the Pipeline

### Make a Test Commit

```bash
cd /Users/apple/Desktop/CIcd/jobportal-yt

# Make a small change (e.g., add a comment in a file)
echo "# Deployment test" >> README.md

# Commit and push
git add .
git commit -m "test: CI/CD pipeline"
git push origin main
```

### Monitor Deployment

1. **GitHub Actions**: Go to repo → **Actions** tab
   - Should see your workflow running
   - Should complete in 2-3 minutes

2. **Render**: Go to both services
   - Check "Events" tab for deployment logs
   - Wait for "Deploy succeeded" message

3. **Test URLs**:
   - Frontend: `https://jobportal-frontend-xxxx.onrender.com`
   - Backend API: `https://jobportal-backend-xxxx.onrender.com/api/v1/job/get`

---

## 📊 What Happens on Each Push

```
You push to main
    ↓
GitHub Actions triggers
    ↓
├─ Test Backend (npm install, verify syntax)
├─ Test Frontend (npm install, npm run build)
    ↓
Both tests pass? YES
    ↓
├─ Trigger Backend redeploy on Render
├─ Trigger Frontend redeploy on Render
    ↓
Render rebuilds and deploys
    ↓
Your app is live with latest code! 🚀
```

---

## 🛠️ Update Frontend API Endpoint

Update `frontend/src/utils/constant.js`:

```javascript
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const USER_API_END_POINT = `${API_URL}/api/v1/user`;
export const JOB_API_END_POINT = `${API_URL}/api/v1/job`;
export const APPLICATION_API_END_POINT = `${API_URL}/api/v1/application`;
export const COMPANY_API_END_POINT = `${API_URL}/api/v1/company`;
```

Then commit and push:
```bash
git add .
git commit -m "feat: update API endpoints for production"
git push origin main
```

---

## 📝 Optional: Update Backend index.js

Already configured, but verify `backend/index.js` has:

```javascript
const corsOptions = {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
};
```

---

## 🎉 You're Done!

Your complete CI/CD pipeline is now live:

✅ **Cost**: $0 (completely free)  
✅ **Speed**: Auto-deploys in 2-3 minutes  
✅ **Reliability**: GitHub + Render uptime  
✅ **Scalability**: Can upgrade anytime  

### Checklist:
- [ ] Repository on GitHub
- [ ] Backend deployed on Render
- [ ] Frontend deployed on Render
- [ ] Environment variables configured
- [ ] GitHub Actions workflow running
- [ ] Test push completed successfully
- [ ] Can access frontend and backend URLs
- [ ] Can login/signup
- [ ] Can view jobs
- [ ] Can apply to jobs

---

## 🔍 Troubleshooting

### Workflow fails on GitHub Actions
**Check**: Backend starts successfully locally with `npm run dev`

### Backend deployment fails on Render
**Check**: 
- MongoDB connection string is correct
- All environment variables added
- Port is set to 3000

### Frontend deployment fails on Render
**Check**:
- Build command works locally: `npm run build`
- `VITE_API_BASE_URL` environment variable is set
- Backend URL is correct

### App doesn't work after deployment
**Check**:
- Both backend and frontend have latest environment URLs
- CORS is enabled on backend
- MongoDB Atlas IP whitelist allows all IPs (or add Render IPs)

### "MongoDB connection timeout" error
**Fix**:
1. Go to MongoDB Atlas
2. Click "Network Access"
3. Click "Add IP Address"
4. Select "Allow access from anywhere" (0.0.0.0/0)

---

## 📞 Need Help?

- GitHub Actions Docs: https://docs.github.com/en/actions
- Render Docs: https://render.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/

**Happy deploying! 🚀**
