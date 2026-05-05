# Job Portal - Complete Deployment Guide

## 🚀 Quick Start Deployment (Railway - Recommended)

### Prerequisites:
- GitHub account (push your code)
- MongoDB Atlas account (already configured)
- Cloudinary account (already configured)

### Step 1: Push to GitHub

```bash
cd /Users/apple/Desktop/CIcd/jobportal-yt
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/jobportal-yt.git
git push -u origin main
```

### Step 2: Deploy on Railway

1. **Go to [railway.app](https://railway.app)**
2. **Click "New Project" → "Deploy from GitHub repo"**
3. **Connect your GitHub account and select `jobportal-yt`**
4. **Railway will auto-detect it's a Node.js project**

### Step 3: Configure Services

#### Create Backend Service:
1. Railway auto-creates a service from `package.json`
2. Click on the service → Variables
3. Add all variables from `.env`:
   ```
   MONGO_URI=mongodb+srv://shvm208:shvm2270@cluster0.cooghst.mongodb.net/jobportal?retryWrites=true&w=majority
   SECRET_KEY=shivam2270
   CLOUD_NAME=dqxevwcnw
   API_KEY=499678813237232
   API_SECRET=GWly8QmkvZiv8-B0qaIVapb5ApY
   NODE_ENV=production
   PORT=3000
   CLIENT_URL=https://your-frontend-url.vercel.app
   ```

#### Add MongoDB Service:
1. Click "Add" button in Railway
2. Select "MongoDB"
3. Copy the generated connection string
4. Update `MONGO_URI` in backend service

#### Create Frontend Service:
1. Click "New Service" → "GitHub Repo"
2. Select your repo again
3. Configure:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Start Command**: `npx serve -s dist -l 5173`
   - **Environment Variables**:
     ```
     VITE_API_BASE_URL=https://your-backend-url.railway.app
     ```

### Step 4: Update Environment Files

Update these files with production URLs:

**frontend/src/utils/constant.js:**
```javascript
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const USER_API_END_POINT = `${API_URL}/api/v1/user`;
export const JOB_API_END_POINT = `${API_URL}/api/v1/job`;
export const APPLICATION_API_END_POINT = `${API_URL}/api/v1/application`;
export const COMPANY_API_END_POINT = `${API_URL}/api/v1/company`;
```

**backend/index.js** (Already configured):
```javascript
const corsOptions = {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
};
```

---

## 🌍 Alternative: Vercel + Railway

### Deploy Frontend on Vercel (Free):
1. Go to [vercel.com](https://vercel.com)
2. Import from GitHub
3. Select `frontend` directory
4. Add environment variable: `VITE_API_BASE_URL=your-railway-backend-url`
5. Deploy!

### Deploy Backend on Railway:
- Follow "Deploy Backend Service" steps above

---

## 📊 Comparison of Hosting Options

| Platform | Cost | Ease | Backend | Frontend | Database |
|----------|------|------|---------|----------|----------|
| **Railway** | $5-20/mo | ⭐⭐⭐⭐ | ✅ | ✅ | ✅ |
| **Vercel + Railway** | $5-15/mo | ⭐⭐⭐⭐ | Railway | ✅ (Free) | Railway |
| **Render** | Free-$15 | ⭐⭐⭐ | ✅ | ✅ | ✅ |
| **Docker + VPS** | $5-50/mo | ⭐⭐ | ✅ | ✅ | ✅ |
| **AWS/Google/Azure** | $10-100/mo | ⭐ | ✅ | ✅ | ✅ |

---

## ✅ Pre-Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] `.env` file is in `.gitignore`
- [ ] MongoDB connection working
- [ ] All API endpoints tested locally
- [ ] Frontend builds successfully (`npm run build`)
- [ ] Environment variables configured on hosting platform
- [ ] Frontend and backend URLs updated in code
- [ ] CORS configured for frontend domain
- [ ] Test login/signup flow after deployment

---

## 🔧 Post-Deployment Tasks

### 1. Verify Deployment
- [ ] Backend API responds: `https://your-backend.railway.app/api/v1/job/get`
- [ ] Frontend loads: `https://your-frontend.vercel.app`
- [ ] Can login/signup
- [ ] Can apply for jobs
- [ ] Can create company/post job (as recruiter)

### 2. Enable HTTPS (Usually automatic)
- Railway provides HTTPS by default
- Vercel provides HTTPS by default

### 3. Set Up Custom Domain (Optional)
- Railway: Project Settings → Custom Domain
- Vercel: Settings → Domains

### 4. Monitor Logs
- Railway: Deployments tab → View logs
- Vercel: Deployments → Analytics

---

## 🐛 Troubleshooting

### Issue: "CORS error" on frontend
**Solution**: Update `CLIENT_URL` in backend environment variables

### Issue: "Cannot find module" errors
**Solution**: Ensure all dependencies installed: `npm install`

### Issue: "MongoDB connection timeout"
**Solution**: 
- Check connection string in environment
- Verify IP whitelist in MongoDB Atlas
- Check firewall/network settings

### Issue: "Port already in use"
**Solution**: Railway/Vercel will assign a port automatically

### Issue: Frontend shows "Cannot connect to backend"
**Solution**: Update `VITE_API_BASE_URL` with correct backend URL

---

## 📚 Resources

- [Railway Docs](https://docs.railway.app/)
- [Vercel Docs](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Express Production Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)

---

## 💡 Recommendation

**Best value for your project:**
- **Frontend**: Vercel (Free tier - great for React)
- **Backend**: Railway ($5-10/month)
- **Database**: MongoDB Atlas (Free tier)
- **Total Cost**: ~$5-10/month

This gives you a production-grade deployment with minimal cost!

---

## 🚀 Ready to Deploy?

Tell me which platform you'd like to use, and I'll help you set it up step by step!
