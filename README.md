# FlashLearn - Interactive Flashcard Learning System

A full-stack flashcard application with spaced repetition, analytics, and a premium UI.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure JWT-based login/register with bcrypt password hashing
- **Flashcard Management**: Full CRUD operations for flashcards
- **Advanced Filtering**: Search, tag filtering, sorting by multiple criteria
- **Pagination**: Efficient data loading with pagination controls
- **Spaced Repetition**: Leitner system for optimal learning intervals
- **Quiz Mode**: Interactive quiz with immediate feedback
- **Analytics Dashboard**: Track progress, accuracy, and mastery levels

### Technical Highlights
- **Backend**: Node.js, Express, Prisma ORM, MySQL
- **Frontend**: React, TailwindCSS, Framer Motion
- **Premium UI**: Dark theme, smooth animations, glassmorphism effects
- **Responsive Design**: Works seamlessly on all devices

## 📦 Tech Stack

### Backend
- Node.js & Express.js
- Prisma ORM (v5)
- MySQL Database
- JWT Authentication
- bcryptjs for password hashing

### Frontend
- React 19
- TailwindCSS 3
- Framer Motion (animations)
- Axios (HTTP client)
- React Router (navigation)
- Lucide React (icons)

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- MySQL Server running locally
- npm or yarn

### Quick Start

1. **Clone and Install**
```bash
cd /Users/krishdabas/Desktop/evaluation
npm install
```

2. **Configure Database**
Update `server/.env` with your MySQL credentials:
```env
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/flashlearn"
JWT_SECRET="supersecret_flashlearn_key"
PORT=3000
```

3. **Run Database Migration**
```bash
cd server
npx prisma migrate dev
npx prisma generate
cd ..
```

4. **Start the Application**
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:3000`
- Frontend on `http://localhost:5173`

## 📖 Usage

### Getting Started
1. Open `http://localhost:5173`
2. Register a new account
3. Create your first flashcard
4. Start learning!

### Features Guide

#### Dashboard
- **Search**: Find cards by question or answer content
- **Filter by Tag**: Filter cards by specific tags
- **Sort**: Sort by date, question, review date, or mastery level
- **Pagination**: Navigate through your card collection

#### Quiz Mode
- Click "Quiz" in the header
- Review cards due for study
- Mark answers as correct/incorrect
- Cards automatically reschedule based on Leitner system

#### Analytics
- View total cards and cards due today
- Track average quiz accuracy
- See mastery distribution across 5 boxes
- Review recent quiz session history

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Flashcards
- `GET /api/flashcards` - Get flashcards (with pagination, search, filter, sort)
- `POST /api/flashcards` - Create flashcard
- `PUT /api/flashcards/:id` - Update flashcard
- `DELETE /api/flashcards/:id` - Delete flashcard

### Quiz & Analytics
- `GET /api/quiz` - Get quiz cards (spaced repetition)
- `POST /api/quiz/submit` - Submit quiz answer
- `POST /api/quiz/session` - Save quiz session
- `GET /api/analytics` - Get user analytics

## 🎨 Design Philosophy

- **Premium Aesthetics**: Modern dark theme with gradient accents
- **Smooth Animations**: Framer Motion for delightful interactions
- **Responsive**: Mobile-first design approach
- **Accessible**: Semantic HTML and proper contrast ratios

## 🔧 Project Structure

```
evaluation/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── context/       # Auth context
│   │   ├── lib/           # Utilities
│   │   └── App.jsx        # Main app component
│   └── package.json
├── server/                # Express backend
│   ├── src/
│   │   ├── controllers/   # Business logic
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Auth middleware
│   │   └── utils/         # Prisma client
│   ├── prisma/
│   │   └── schema.prisma  # Database schema
│   └── package.json
└── package.json           # Root orchestration
```

## 🧪 Spaced Repetition Algorithm

FlashLearn uses the **Leitner System**:
- **Box 1**: Review in 1 day
- **Box 2**: Review in 2 days
- **Box 3**: Review in 4 days
- **Box 4**: Review in 8 days
- **Box 5**: Review in 16 days

Correct answers move cards forward; incorrect answers reset to Box 1.

## 🤝 Contributing

This is a portfolio project. Feel free to fork and customize!

## 📝 License

MIT License - feel free to use for learning and portfolio purposes.

## 🎓 Author

Built as a full-stack demonstration project showcasing modern web development practices.
