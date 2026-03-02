# EmbedPrep 🚀 (Static Site Edition)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![Netlify](https://img.shields.io/badge/Deploy%20on-Netlify-00C7B7)](https://netlify.com)

> **Frontend-Only Interview Preparation Platform for Embedded Systems, Firmware, and IoT Engineers**

**This is the simplified static site version** - no backend required! All questions are embedded directly in the frontend for easy deployment on Netlify.

![EmbedPrep Preview](https://via.placeholder.com/800x400/0a0a0f/3b82f6?text=EmbedPrep+-+Master+Embedded+Systems)

## ✨ Features

- **60+ Curated Questions** covering all embedded domains (C, C++, Protocols, RTOS, Microcontrollers, IoT, PCB)
- **Categories**: C Programming, C++, Protocols, RTOS, Microcontrollers, IoT, PCB Design
- **Difficulty Levels**: Easy, Medium, Hard
- **Experience Levels**: Fresher to Senior (including Automotive & Product Companies)
- **Question Types**: MCQ and Descriptive
- **Dark Modern UI**: Premium developer-focused design
- **Fully Responsive**: Works on desktop, tablet, and mobile
- **No Backend Required**: All data is static, deploy anywhere!

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (Static Export)
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Lucide icons
- **Deployment**: Netlify (or any static host)

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/EmbedPrep.git
cd EmbedPrep
cd frontend
npm install
```

### 2. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Build for Production

```bash
npm run build
```

The static site will be generated in `frontend/dist/`.

## 📦 Deployment on Netlify

### Option 1: Drag & Drop (Easiest)

1. Run `npm run build` in the `frontend` folder
2. Go to [Netlify Drop](https://app.netlify.com/drop)
3. Drag and drop the `frontend/dist` folder
4. Your site is live! 🎉

### Option 2: Git-based Deployment

1. Push your code to GitHub
2. Connect your repo on [Netlify](https://netlify.com)
3. Build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Click Deploy

## 📁 Project Structure

```
EmbedPrep/
├── frontend/                 # Next.js application (static export)
│   ├── app/                 # App router pages
│   │   ├── main/           # Main routes (questions, search, etc.)
│   │   ├── question/[id]/  # Question detail pages (SSG)
│   │   ├── admin/          # Admin panel (disabled in static mode)
│   │   ├── layout.tsx
│   │   └── page.tsx        # Home page
│   ├── components/          # React components
│   ├── lib/                 # Utilities & data
│   │   ├── data.ts         # All questions data (static)
│   │   └── api.ts          # Local data API
│   ├── types/               # TypeScript types
│   ├── dist/                # Build output (static files)
│   ├── next.config.js
│   └── package.json
│
├── netlify.toml             # Netlify configuration
├── package.json             # Root package.json
└── README.md
```

## 📝 Adding/Modifying Questions

Since this is a static site, to add or modify questions:

1. Edit `frontend/lib/data.ts`
2. Add your question to the `rawQuestions` array following the existing format
3. Rebuild and redeploy

Example question format:
```typescript
{
  category: "C Programming",
  subcategory: "Pointers",
  type: "MCQ",
  difficulty: "Medium",
  experienceLevel: "1-3 Years",
  question: "What is a pointer?",
  options: [
    { id: "a", text: "A variable" },
    { id: "b", text: "Memory address" }
  ],
  correctAnswer: "b",
  explanation: "A pointer stores memory address.",
  tags: ["C", "Pointer"]
}
```

## 🎯 Available Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with categories |
| `/main/questions` | Browse all questions |
| `/main/c-mcq` | C Programming MCQs |
| `/main/cpp-mcq` | C++ Programming MCQs |
| `/main/protocols` | Communication Protocols |
| `/main/interview` | Interview Questions |
| `/main/search` | Search questions |
| `/question/[id]` | Individual question page |

## 🔧 Configuration

### next.config.js
```javascript
module.exports = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
}
```

### netlify.toml
```toml
[build]
  base = "frontend"
  publish = "dist"
  command = "npm run build"
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Questions curated from real interviews at Qualcomm, Intel, NXP, Bosch, Texas Instruments, STMicroelectronics
- Embedded Systems community
- Contributors and maintainers

---

**Made with ❤️ for Embedded Engineers**

> Note: This is the static site version. For the full-stack version with admin panel and database, check the original repository.
