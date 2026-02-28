# Deployment Guide

This guide covers deploying EmbedPrep to production environments.

## Table of Contents

- [Prerequisites](#prerequisites)
- [MongoDB Atlas Setup](#mongodb-atlas-setup)
- [Backend Deployment (Render)](#backend-deployment-render)
- [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
- [Post-Deployment](#post-deployment)
- [Troubleshooting](#troubleshooting)

## Prerequisites

- GitHub account
- MongoDB Atlas account
- Render account (free tier available)
- Vercel account (free tier available)

## MongoDB Atlas Setup

1. **Create Cluster**
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a new cluster (M0 free tier is sufficient to start)
   - Choose AWS/GCP/Azure and nearest region

2. **Configure Database Access**
   - Go to Database Access → Add New Database User
   - Create username and password (save these securely)
   - Set privileges: Read and Write to any database

3. **Configure Network Access**
   - Go to Network Access → Add IP Address
   - Click "Allow Access from Anywhere" (0.0.0.0/0) for development
   - For production, restrict to your server IPs

4. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `embedprep`

## Backend Deployment (Render)

1. **Prepare Repository**
   ```bash
   # Ensure your code is pushed to GitHub
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Create Web Service on Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

3. **Configure Service**
   - **Name**: `embedprep-api` (or your preference)
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

4. **Add Environment Variables**
   Click "Advanced" and add:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/embedprep?retryWrites=true&w=majority
   NODE_ENV=production
   PORT=10000
   JWT_SECRET=your_super_secret_random_string_at_least_32_chars
   ADMIN_USERNAME=aditya
   ADMIN_PASSWORD_HASH=$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi
   FRONTEND_URL=https://embedprep.vercel.app
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

   To generate admin password hash:
   ```javascript
   // Run this locally
   const bcrypt = require('bcryptjs');
   bcrypt.hash('your_admin_password', 10).then(console.log);
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy
   - Note the URL (e.g., `https://embedprep-api.onrender.com`)

## Frontend Deployment (Vercel)

1. **Prepare Frontend**
   - Ensure `frontend/.env.local` has:
     ```
     NEXT_PUBLIC_API_URL=https://embedprep-api.onrender.com/api
     ```
   - Commit and push to GitHub

2. **Import Project on Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your GitHub repository

3. **Configure Project**
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `next build`
   - **Output Directory**: `.next`

4. **Environment Variables**
   Add the following:
   ```
   NEXT_PUBLIC_API_URL=https://embedprep-api.onrender.com/api
   ```

5. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically
   - Your site will be live at `https://embedprep.vercel.app`

6. **Configure Custom Domain (Optional)**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

## Post-Deployment

### 1. Seed the Database

Once backend is deployed, seed the database:

```bash
# Locally, with production database
export MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/embedprep
cd backend
npm run seed
```

### 2. Verify Deployment

- Visit frontend URL
- Check API health: `https://embedprep-api.onrender.com/health`
- Test admin login
- Verify questions are loading

### 3. Configure CORS

If frontend and backend are on different domains, ensure CORS is properly configured:

In backend `.env`:
```
FRONTEND_URL=https://embedprep.vercel.app
```

The backend already has CORS configured to accept requests from `FRONTEND_URL`.

### 4. Enable Analytics (Optional)

- Add Google Analytics to frontend
- Configure MongoDB Atlas monitoring
- Set up Render analytics

## Troubleshooting

### Backend Issues

**Build fails**
- Check Node.js version (should be >= 18)
- Verify all dependencies in package.json
- Check build logs on Render

**Database connection fails**
- Verify MONGODB_URI format
- Check Network Access settings in MongoDB Atlas
- Ensure password is URL-encoded if contains special characters

**CORS errors**
- Verify FRONTEND_URL matches exactly (including https://)
- Check browser console for specific error

### Frontend Issues

**API calls fail**
- Verify NEXT_PUBLIC_API_URL is set correctly
- Check that API URL doesn't have trailing slash
- Verify backend is running

**Build fails**
- Check for TypeScript errors: `npm run build` locally
- Verify all imports are correct
- Check next.config.js settings

### MongoDB Issues

**Connection timeout**
- Whitelist IP addresses properly
- Check cluster tier limits (M0 has connection limits)
- Verify connection string format

**Authentication fails**
- Verify username/password
- Check if user has proper permissions
- Ensure password is correct in connection string

## Maintenance

### Regular Tasks

- Monitor Render and MongoDB dashboards
- Check for dependency updates monthly
- Review and moderate new questions
- Backup database periodically

### Scaling

When you need to scale:

1. **Database**: Upgrade MongoDB Atlas tier
2. **Backend**: Upgrade Render plan
3. **Frontend**: Vercel Pro for better performance

## Support

For deployment issues:
- Check service status pages
- Review logs on respective dashboards
- Open an issue on GitHub

---

Happy Deploying! 🚀
