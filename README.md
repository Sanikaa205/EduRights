# 📚 EduRights

An interactive learning platform teaching children about their fundamental rights through gamified modules. Built with React, Express, and MongoDB.

## Features

- 📖 **6 Learning Modules** - Comprehensive coverage of children's rights
- 🎮 **4 Interactive Games** - Legal Hero Journey, Build Your School, Broken Story, Match the Right
- 📊 **Progress Tracking** - Real-time points, badges, and achievement system
- 🎯 **Personal Dashboard** - Track your learning journey

## 🛠️ Tech Stack

**Frontend**
- ⚛️ React 19 + ⚡ Vite 7
- 🎨 Tailwind CSS + Radix UI
- 🔄 TanStack Query
- 🧭 React Router

**Backend**
- 🟢 Node.js + Express 5
- 🍃 MongoDB + Mongoose 9
- 🔐 bcrypt + CORS

**Tooling**
- ✅ ESLint 9
- 🔄 Nodemon

## 📋 Prerequisites

- 🟢 **Node.js** v18+ - [Download](https://nodejs.org/)
- 📦 **npm** (comes with Node.js)
- 🍃 **MongoDB** v6+ - [Download](https://www.mongodb.com/try/download/community)

## 🚀 Installation

Monorepo structure: frontend at root, backend in `server/` directory.

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd edurights
```

### 2. Frontend Setup

Install all frontend dependencies:

```bash
npm install
```

**Key Dependencies:**

🎯 **Core**
- `react` & `react-dom` - UI library
- `vite` - Lightning-fast build tool
- `react-router-dom` - Client-side routing
- `axios` - HTTP client for API calls
- `@tanstack/react-query` - Data fetching & caching

🎨 **UI & Styling**
- `tailwindcss` - Utility-first CSS framework
- `@radix-ui/*` - Accessible component primitives
- `lucide-react` - Icon library
- `clsx` & `tailwind-merge` - Class utilities
- `next-themes` - Theme management

✨ **Animations**
- `framer-motion` - Smooth animations
- `react-confetti` - Celebration effects
- `react-dnd` - Drag-and-drop for games

📊 **Visualization** - `recharts` for charts & statistics

📝 **Forms** - `react-hook-form` for form handling

**Other Features** - `sonner` (toasts), `react-pageflip` (storybook), `@emailjs/browser` (feedback), custom fonts

**Dev Tools** - ESLint, Autoprefixer, PostCSS

### 3. Backend Setup

Navigate to server directory and install dependencies:

```bash
cd server
npm install
```

**Dependencies:**
- 🚀 `express` - Web framework
- 🍃 `mongoose` - MongoDB ODM
- 🔐 `bcryptjs` - Password hashing
- 🌐 `cors` - Cross-origin requests
- ⚙️ `dotenv` - Environment variables
- 🔄 `nodemon` - Auto-restart on changes

### 4. MongoDB Setup

Make sure MongoDB is running:

**Windows:**
```bash
# Start MongoDB service
net start MongoDB
```

**macOS/Linux:**
```bash
# Start MongoDB
brew services start mongodb-community
# OR
sudo systemctl start mongod
```

**Verify MongoDB is running:**
```bash
# Connect to MongoDB shell
mongosh
```

The app will automatically create the `edurights` database on first run.

### 5. Environment Configuration

Create a `.env` file in the `server/` directory:

```bash
cd server
# Create .env file
echo. > .env  # Windows
touch .env    # macOS/Linux
```

Add these variables to `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/edurights
```

**Note:** Currently, the server code has these values hardcoded, so the .env is optional for now but recommended for production deployment.

## 🧪 Testing

### Step 1: Start Backend Server

Open a terminal and start the backend:

```bash
cd server
npm run dev
```

**Expected Output:**
```
Server running on port 5000
MongoDB Connected
```

If MongoDB connection fails, ensure MongoDB service is running (see MongoDB Setup section).

### Step 2: Start Frontend Server

Open another terminal and start the frontend:

```bash
# From project root
npm run dev
```

**Expected Output:**
```
  VITE v7.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
```

### Step 3: Test the Application

1. **Open Browser** - Navigate to `http://localhost:5173`

2. **Test Registration**
   - Go to Register page
   - Create a new account with name, email, password, and age
   - Submit form

3. **Test Login**
   - Login with your credentials
   - Should redirect to dashboard

4. **Test Modules**
   - Navigate to Modules section
   - Select any module (1-6)
   - Complete the story, explanation, and quiz
   - Verify progress is saved

5. **Test Games**
   - Go to Games section
   - Try each game:
     - Legal Hero Journey (5 levels)
     - Build Your School
     - Broken Story (10 levels)
     - Match the Right
   - Check if badges are awarded

6. **Test Dashboard**
   - Return to dashboard
   - Verify stats: points, progress, badges
   - Check if data persists after refresh

### Step 4: Test API Endpoints

Use Postman, Thunder Client, or curl:

**Test Registration:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123","age":12}'
```

**Test Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

**Test Dashboard (replace userId):**
```bash
curl http://localhost:5000/api/user/{userId}/dashboard
```

### Common Test Scenarios

**User Flow Test**
- Register → Login → Complete Module → Play Game → Check Dashboard

**Progress Persistence Test**
- Complete 50% of module → Logout → Login → Verify progress saved

**Badge System Test**
- Complete game level → Verify badge appears in dashboard

**Points Calculation Test**
- Submit quiz score → Check if points update correctly

### Troubleshooting Tests

**Can't connect to backend**
- Verify backend is running on port 5000
- Check MongoDB is running
- Look for error messages in server terminal

**Frontend API calls failing**
- Check Vite proxy config in `vite.config.js`
- Verify CORS is enabled in backend
- Check browser console for errors

**Data not persisting**
- Verify MongoDB connection
- Check `mongosh` and view `edurights` database
- Use `db.users.find()` to verify data

## 📁 Project Structure

```
edurights/
├── public/                    # Static assets
│   ├── assets/               # Images and icons
│   ├── canva-book/          # Module storybook pages
│   └── images/              # Module-specific images
├── server/                   # Backend application
│   ├── config/
│   │   └── db.js            # MongoDB connection logic
│   ├── controllers/         # Request handlers
│   │   ├── authController.js
│   │   ├── learnController.js
│   │   └── pointsController.js
│   ├── models/              # Mongoose schemas
│   │   ├── User.js
│   │   ├── QuizPoints.js
│   │   ├── LearnProgress.js
│   │   └── UserBadge.js
│   ├── routes/              # API endpoints
│   │   ├── authRoutes.js
│   │   ├── badges.js
│   │   ├── dashboard.js
│   │   ├── learn.js
│   │   └── pointsRoutes.js
│   ├── server.js            # Express app entry
│   └── package.json         # Backend dependencies
├── src/
│   ├── components/          # React components
│   │   ├── layout/         # Navbar, Footer
│   │   ├── StoryBook/      # Page-flip components
│   │   └── ui/             # Reusable UI primitives
│   ├── pages/              # Route components
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Modules.jsx
│   │   ├── module1-6/      # Learning modules
│   │   └── EducationalGames/ # Game components
│   ├── data/               # Static data files
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── App.jsx             # Root component with routes
│   └── main.jsx            # Entry point
├── eslint.config.js        # ESLint configuration
├── tailwind.config.js      # Tailwind customization
├── vite.config.js          # Vite build config
└── package.json            # Frontend dependencies
```

## Available Scripts

### Frontend (Root Directory)

```bash
npm run dev      # Start development server with hot reload
npm run build    # Create production build in dist/
npm run preview  # Preview production build locally
npm run lint     # Check code quality with ESLint
```

### Backend (server/ Directory)

```bash
npm run dev      # Start server with nodemon (auto-restart)
npm start        # Start server with node (production)
```

## 🔌 API Documentation

Base URL: `http://localhost:5000/api`

### 🔐 Authentication (`/api/auth`)

**Register User**
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepass123",
  "age": 12
}
```

**Login**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepass123"
}
```

### 📊 Dashboard

**Get User Dashboard**
```http
GET /api/user/:userId/dashboard
```
Returns comprehensive dashboard with name, level, total points, overall progress, game-wise progress, learning progress, and earned badges.

### 🏆 Badges (`/api/badges`)

**Earn Badge**
```http
POST /api/badges/earn
Content-Type: application/json

{
  "userId": "...",
  "gameType": "legalHero",
  "levelId": "1",
  "badge": "Bronze Champion"
}
```

**Get Badges by Game**
```http
GET /api/badges/game/:gameType/:userId
```

### 📚 Learning Progress (`/api/learn`)

**Get Progress**
```http
GET /api/learn/progress/:userId
```

**Update Progress**
```http
POST /api/learn/progress
Content-Type: application/json

{
  "userId": "...",
  "moduleKey": "module-1-progress",
  "progress": 75
}
```

**Reset Progress**
```http
DELETE /api/learn/progress/:userId
```

### 🎯 Quiz Points (`/api/points`)

**Submit Score**
```http
POST /api/points/submit/:userId
Content-Type: application/json

{
  "moduleId": "module-1",
  "score": 85
}
```
Automatically saves the highest score per module.

**Get User Points**
```http
GET /api/points/:userId
```
Returns total points and per-module breakdown.

## 🗄️ Database Schema

### User Model
```javascript
{
  name: String,
  age: Number,
  email: String (unique),
  password: String (bcrypt hashed)
}
```

### QuizPoints Model
```javascript
{
  userId: ObjectId,
  moduleId: String,
  highestScore: Number
}
```
Unique constraint on userId + moduleId.

### LearnProgress Model
```javascript
{
  userId: ObjectId,
  moduleKey: String,  // module-1-progress, module-2-progress, etc.
  progress: Number,   // 0-100
  completedAt: Date
}
```
Unique constraint on userId + moduleKey.

### UserBadge Model
```javascript
{
  userId: ObjectId,
  gameType: String,   // legalHero, brokenStory, buildSchool, matchTheRight
  levelId: String,
  badge: String,
  earnedAt: Date
}
```

## 🧭 Frontend Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/login` | User login |
| `/register` | New user registration |
| `/dashboard` | Personalized dashboard |
| `/modules` | Module selection screen |
| `/module-1` to `/module-6` | Individual learning modules |
| `/module-*/explanation` | Module explanation section |
| `/module-*/quiz` | Module quiz |
| `/games` | Games hub |
| `/games/legal-hero-journey` | Legal Hero game |
| `/games/legal-hero-journey/level-:id` | Specific level |
| `/games/build-your-school` | Build Your School game |
| `/games/build-your-school/level/:id` | School building level |
| `/games/broken-story` | Broken Story game |
| `/games/match-the-right` | Match the Right game |
| `/resources` | Educational resources |
| `/feedback` | Feedback form |

## 💡 Development Tips

### Hot Reload
Both frontend (Vite) and backend (nodemon) support hot reload. Changes reflect automatically without restart.

### Vite Alias
Use `@/` to import from src directory:
```javascript
import { Button } from '@/components/ui/button'
```

### Tailwind Theme
Custom design tokens are in `tailwind.config.js`. Uses CSS variables for theming.

### React Query
API calls are cached and managed by TanStack Query. Check network tab to see optimized requests.

### MongoDB Connection
If you see connection errors, verify:
1. MongoDB service is running
2. Port 27017 is not blocked
3. Database name matches in connection string

## 📦 Building for Production

### Frontend Build

```bash
npm run build
```

Creates optimized production build in `dist/` directory. To test:

```bash
npm run preview
```

### Backend Production

```bash
cd server
npm start
```

For production deployment:
1. Use environment variables properly (configure dotenv in server.js)
2. Set up reverse proxy (nginx/apache)
3. Use process manager like PM2
4. Configure MongoDB Atlas for cloud database
5. Add rate limiting and security middleware
6. Implement proper JWT authentication

## 🔧 Common Issues & Solutions

**Port already in use:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000    # Windows
lsof -i :5000                   # macOS/Linux

# Kill the process
taskkill /PID <PID> /F          # Windows
kill -9 <PID>                   # macOS/Linux
```

**MongoDB connection failed:**
- Check if MongoDB service is running
- Verify connection string in server code
- Try `mongosh` to test connection manually

**Module not found errors:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`

**Vite port conflict:**
Vite will automatically try next available port (5174, 5175, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🔒 Security Notes

**Current Limitations:**
- No JWT implementation yet
- Passwords hashed but no session management
- CORS enabled for all origins
- No input validation middleware
- No rate limiting

**Before Production:**
- Implement proper authentication with JWT/cookies
- Add request validation (express-validator)
- Configure CORS for specific origins only
- Add rate limiting (express-rate-limit)
- Use helmet.js for security headers
- Implement refresh token rotation
- Add logging (winston/morgan)

## 📄 License

This project is currently unlicensed. Please add appropriate license before distribution.

---

<div align="center">
  <strong>Made with ❤️ for children's education and rights awareness</strong>
</div>
