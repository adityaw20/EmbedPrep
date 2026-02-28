# EmbedPrep 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)](https://www.mongodb.com/cloud/atlas)

> Comprehensive Interview Preparation Platform for Embedded Systems, Firmware, and IoT Engineers

![EmbedPrep Preview](https://via.placeholder.com/800x400/0a0a0f/3b82f6?text=EmbedPrep+-+Master+Embedded+Systems)

## ✨ Features

- **5000+ Curated Questions** covering all embedded domains
- **Categories**: C Programming, C++, Protocols, RTOS, Microcontrollers, IoT, PCB Design
- **Difficulty Levels**: Easy, Medium, Hard
- **Experience Levels**: Fresher to Senior (including Automotive & Product Companies)
- **Question Types**: MCQ and Descriptive
- **Admin Panel**: Add, edit, delete questions; bulk upload via CSV/JSON
- **Dark Modern UI**: Premium developer-focused design
- **Fully Responsive**: Works on desktop, tablet, and mobile

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Lucide icons
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **ODM**: Mongoose
- **Security**: Helmet, CORS, Rate Limiting
- **Authentication**: JWT

### Deployment
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas

## 📁 Project Structure

```
EmbedPrep/
├── backend/                  # Express.js API
│   ├── config/              # Database configuration
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Auth, error handling
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── utils/               # Seed script
│   ├── .env.example         # Environment template
│   ├── package.json
│   └── server.js            # Entry point
│
├── frontend/                 # Next.js application
│   ├── app/                 # App router pages
│   │   ├── (main)/          # Main routes
│   │   ├── admin/           # Admin panel
│   │   ├── question/[id]/   # Question detail
│   │   ├── layout.tsx
│   │   ├── page.tsx         # Home page
│   │   └── globals.css
│   ├── components/          # React components
│   ├── lib/                 # Utilities & API
│   ├── types/               # TypeScript types
│   ├── .env.local.example
│   ├── next.config.js
│   ├── tailwind.config.ts
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/EmbedPrep.git
cd EmbedPrep
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your credentials
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/embedprep
# JWT_SECRET=your_super_secret_key
# ADMIN_USERNAME=admin
# ADMIN_PASSWORD_HASH=your_bcrypt_hashed_password

# Generate admin password hash (run in Node.js)
# const bcrypt = require('bcryptjs');
# bcrypt.hash('your_password', 10).then(console.log);

# Seed the database with 1000 sample questions
npm run seed

# Start development server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.local.example .env.local

# Edit .env.local
# NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Start development server
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📦 Deployment

### Backend Deployment (Render)

1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**: Add all variables from `.env`

### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Environment Variables**: `NEXT_PUBLIC_API_URL=https://your-render-api.onrender.com/api`

### Database Setup (MongoDB Atlas)

1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user
3. Whitelist your IP address (or use `0.0.0.0/0` for all IPs)
4. Get your connection string and add to environment variables

## 🔑 Admin Panel Access

1. Navigate to `/admin/login`
2. Login with admin credentials:
   - **Username:** `aditya`
   - **Password:** `aditya@20`
3. Access features:
   - Add single question
   - Bulk upload (CSV/JSON)
   - Manage existing questions
   - View statistics

### CSV Upload Format

```csv
category,subcategory,type,difficulty,experienceLevel,question,options,correctAnswer,explanation,tags
C Programming,Pointers,MCQ,Medium,1-3 Years,"What is a pointer?","[{id:""a"",text:""A variable""},{id:""b"",text:""Memory address""}]",b,"A pointer stores memory address.","C,Pointer"
```

### JSON Upload Format

```json
{
  "questions": [
    {
      "category": "C Programming",
      "subcategory": "Pointers",
      "type": "MCQ",
      "difficulty": "Medium",
      "experienceLevel": "1-3 Years",
      "question": "What is a pointer?",
      "options": [
        { "id": "a", "text": "A variable" },
        { "id": "b", "text": "Memory address" }
      ],
      "correctAnswer": "b",
      "explanation": "A pointer stores memory address.",
      "tags": ["C", "Pointer"]
    }
  ]
}
```

## 📋 API Endpoints

### Questions
- `GET /api/questions` - Get all questions (with filters & pagination)
- `GET /api/questions/:id` - Get single question
- `GET /api/questions/:id/related` - Get related questions
- `POST /api/questions` - Create question (Admin)
- `POST /api/questions/bulk` - Create multiple questions (Admin)
- `PUT /api/questions/:id` - Update question (Admin)
- `DELETE /api/questions/:id` - Delete question (Admin)

### Categories & Stats
- `GET /api/categories` - Get all categories
- `GET /api/stats` - Get statistics

### Admin
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify token

### Upload
- `POST /api/upload/csv` - Upload CSV (Admin)
- `POST /api/upload/json` - Upload JSON (Admin)

## 🎯 Roadmap

- [ ] User authentication & progress tracking
- [ ] Bookmark questions
- [ ] Mock tests & quizzes
- [ ] Discussion forum
- [ ] Mobile app (React Native)
- [ ] AI-powered question recommendations

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Embedded Systems community
- Contributors and maintainers
- Open source projects that made this possible

## 📧 Contact

- Website: [embedprep.com](https://embedprep.com)
- Email: contact@embedprep.com
- Twitter: [@embedprep](https://twitter.com/embedprep)

---

Made with ❤️ for Embedded Engineers
