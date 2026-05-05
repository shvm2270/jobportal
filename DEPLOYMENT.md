# Job Portal - Deployment Guide

## Hosting Options

### 1. **Railway (Recommended - Easiest)**
- Free tier: $5/month credit
- Automatic deployments from GitHub
- Supports MongoDB, Node.js, and React
- **Cost**: ~$10-20/month for small app

**Steps:**
1. Push your code to GitHub
2. Go to [railway.app](https://railway.app)
3. Connect GitHub account
4. Create new project → Deploy from GitHub
5. Select your repo
6. Add MongoDB plugin
7. Set environment variables
8. Deploy!

---

### 2. **Render (Alternative)**
- Free tier available
- Deploy from GitHub
- Full stack support
- **Cost**: Free to ~$15/month

**Steps:**
1. Go to [render.com](https://render.com)
2. Create account and connect GitHub
3. Create Web Service for backend
4. Create Static Site for frontend
5. Add MongoDB Atlas (cloud database)
6. Set environment variables
7. Deploy!

---

### 3. **Vercel + Heroku (Separate)**
- Vercel for Frontend (Free)
- Heroku for Backend ($7/month minimum)
- MongoDB Atlas (free tier available)

---

### 4. **AWS / Google Cloud / Azure (Production)**
- Full control and scalability
- More complex setup
- **Cost**: $5-50+/month depending on usage

---

## What You Need to Deploy

### 1. **MongoDB Atlas (Cloud Database)**
   - Already done! Your cluster is ready
   - Just use connection string from `.env`

### 2. **Environment Variables for Production**
   ```
   MONGO_URI=<your-mongodb-cluster-connection>
   SECRET_KEY=<your-jwt-secret>
   CLOUD_NAME=<cloudinary-cloud-name>
   API_KEY=<cloudinary-api-key>
   API_SECRET=<cloudinary-api-secret>
   NODE_ENV=production
   PORT=3000
   ```

### 3. **GitHub Repository**
   - Push your code to GitHub
   - Make `.env` files are in `.gitignore`

---

## Step-by-Step: Deploy on Railway (Recommended)

### Backend Deployment:

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub"
   - Connect your GitHub account
   - Select your `jobportal-yt` repository

3. **Configure Backend Service**
   - Railway detects it's a Node.js app
   - Add environment variables:
     - `MONGO_URI`
     - `SECRET_KEY`
     - `CLOUD_NAME`
     - `API_KEY`
     - `API_SECRET`
     - `NODE_ENV=production`
   - Set start command: `npm run dev` or `node index.js`

4. **Add MongoDB**
   - In Railway dashboard, click "Add" → "Add Service"
   - Select "MongoDB"
   - This creates a new MongoDB instance
   - Copy connection string to `MONGO_URI`

### Frontend Deployment:

1. **Option A: Deploy to Railway**
   - Create another service in same Railway project
   - Configure for frontend
   - Build command: `npm run build`
   - Start command: `npx serve -s dist -l 5173`

2. **Option B: Deploy to Vercel (Easier for React)**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Import project
   - Set build command: `npm run build`
   - Set output directory: `dist`
   - Add environment variable: `VITE_API_BASE_URL=<your-backend-url>`
   - Deploy!

---

## After Deployment

### Update CORS & Environment

Backend needs to allow frontend domain:

```javascript
// backend/index.js
const corsOptions = {
    origin: 'https://your-frontend-domain.com', // Update this
    credentials: true
}
```

Frontend needs correct backend URL:

```javascript
// frontend/src/utils/constant.js
export const USER_API_END_POINT = "https://your-backend-url.railway.app/api/v1/user";
// ... update all endpoints
```

---

## Recommended Approach (Cheapest)

1. **Backend**: Railway ($5/month)
2. **Frontend**: Vercel (Free tier)
3. **Database**: MongoDB Atlas (Free tier)

**Total Cost**: ~$5-10/month

---

## Which option would you like to proceed with?

1. Railway (Full stack - easiest)
2. Vercel + Railway (Best frontend experience)
3. Docker + Server (VPS like DigitalOcean)
4. Something else?
