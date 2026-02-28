# Quick Setup Guide

Follow these steps to get EmbedPrep running locally in minutes.

## Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (free)
- Git

## Step-by-Step Setup

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/EmbedPrep.git
cd EmbedPrep

# Install dependencies for root, backend, and frontend
npm run install:all
```

### 2. Setup MongoDB

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist your IP (0.0.0.0/0 for development)
5. Copy the connection string

### 3. Configure Backend

```bash
cd backend
cp .env.example .env
```

Edit `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/embedprep?retryWrites=true&w=majority
JWT_SECRET=your_random_secret_key_here
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=$2a$10$your_bcrypt_hash
FRONTEND_URL=http://localhost:3000
```

Generate admin password hash:
```bash
node -e "require('bcryptjs').hash('your_password', 10).then(console.log)"
```

### 4. Seed Database

```bash
# From backend directory
npm run seed
```

This will insert 1000+ sample questions.

### 5. Configure Frontend

```bash
cd frontend
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 6. Start Development

**Option 1: Use root package.json (runs both)**
```bash
cd ..
npm run dev
```

**Option 2: Run separately**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 7. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Admin Panel: http://localhost:3000/admin/login

**Default admin credentials:**
- Username: `aditya`
- Password: `aditya@20`

## Next Steps

- Read [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
- Check [CONTRIBUTING.md](CONTRIBUTING.md) to contribute questions
- Explore the admin panel to add more questions

## Troubleshooting

**Port already in use**
- Backend: Change `PORT` in backend `.env`
- Frontend: Use `npm run dev -- -p 3001`

**MongoDB connection fails**
- Check IP whitelist in MongoDB Atlas
- Verify connection string format
- Ensure password doesn't have special characters (or URL encode them)

**Module not found errors**
- Delete `node_modules` and run `npm run install:all` again

## Project Structure

```
EmbedPrep/
├── backend/          # Express.js API (Port 5000)
├── frontend/         # Next.js App (Port 3000)
├── README.md         # Full documentation
├── DEPLOYMENT.md     # Deployment guide
└── SETUP.md          # This file
```

Need help? Open an issue on GitHub!
