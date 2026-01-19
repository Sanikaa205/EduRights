## EduRights

EduRights is a learning platform that teaches children their rights through interactive modules and games. It includes a React + Vite frontend and an Express + MongoDB backend, with progress tracking, points, and badges.

**Highlights**
- Modern React 19 app powered by Vite 7 and Tailwind CSS
- Game-based learning: Legal Hero Journey, Build Your School, Broken Story, Match the Right
- Learning modules (1–6) with story, explanation, and quiz flows
- Progress, points, badges, and a consolidated dashboard API

## Tech Stack
- Frontend: React 19, Vite, Tailwind CSS, Radix UI primitives, TanStack Query, React Router
- Visualization & UI: Recharts, Lucide Icons, Sonner toasts
- Backend: Node.js, Express 5, Mongoose 9, MongoDB
- Tooling: ESLint 9, PostCSS, Autoprefixer

## Monorepo Layout
- Frontend (Vite) at project root
- Backend (Express) in `server/`

## Prerequisites
- Node.js 18+ and npm
- MongoDB (local or hosted)

## Quick Start
1) Install dependencies (root + server):
```bash
# frontend
npm install

# backend
cd server
npm install
```

2) Configure environment:
- Copy `server/.env.example` to `server/.env` and set values.
- Note: The current server code connects to `mongodb://127.0.0.1:27017/edurights` and listens on port `5000` even if env vars are set. Ensure your local MongoDB matches this, or update `server/server.js` to use `dotenv` and `process.env`.

3) Run dev servers:
```bash
# terminal A (backend)
cd server
npm run dev

# terminal B (frontend)
cd ..
npm run dev
```
The Vite dev server proxies `/api` to `http://localhost:5000` (see `vite.config.js`).

## Configuration
Environment variables (server):
- `PORT` (default: 5000)
- `MONGO_URI` (default in code: `mongodb://127.0.0.1:27017/edurights`)

Vite dev proxy:
- `/api` → `http://localhost:5000`

## NPM Scripts
- Frontend (root):
	- `dev`: start Vite
	- `build`: production build
	- `preview`: preview built assets
	- `lint`: run ESLint
- Backend (`server/`):
	- `dev`: start Express with nodemon
	- `start`: start Express with node

## API Reference (Summary)
Base URL: `/api`

- Auth (`/auth`)
	- `POST /register` – body: `{ name, email, password, age }`
	- `POST /login` – body: `{ email, password }`

- Dashboard
	- `GET /user/:id/dashboard` – returns name, level, points, overall progress, game progress, learn progress, badges grouped per game

- Badges (`/badges`)
	- `POST /earn` – body: `{ userId, gameType, levelId, badge }` – creates badge and updates user progress/level
	- `GET /game/:gameType/:userId` – fetch badges by game

- Learn Progress (`/learn`)
	- `GET /progress/:userId` – map of moduleKey → progress
	- `POST /progress` – body: `{ userId, moduleKey, progress }` (0–100)
	- `DELETE /progress/:userId` – reset all progress for a user

- Points (`/points`)
	- `POST /submit/:userId` – body: `{ moduleId, score }` – stores highest score per module
	- `GET /:userId` – total points and per-module highest scores

Notes:
- No JWT or session issued on login; tailor for production needs before deployment.
- CORS is enabled and JSON body parsing is configured.

## Data Models (Server)
- `User` – `{ name, age, email (unique), password }`
- `QuizPoints` – `{ userId, moduleId, highestScore }` (unique per user+module)
- `LearnProgress` – `{ userId, moduleKey ∈ module-1..6-progress, progress(0–100), completedAt }` (unique per user+moduleKey)
- `UserBadge` – `{ userId, gameType ∈ legalHero|brokenStory|buildSchool|matchTheRight, levelId, badge, earnedAt }`

## Frontend Routes (Key)
- `/` – Landing page
- `/login`, `/register`
- `/dashboard`
- `/modules` – Module selection
- `/module-1..6` – Module starts; each with `/explanation` and `/quiz`
- `/games` – Games hub
	- `/games/legal-hero-journey` and `/games/legal-hero-journey/level-1..5`
	- `/games/build-your-school` (levels list) and `/games/build-your-school/level/:id`
	- `/games/broken-story` (levels list) and specific levels (1–10)
	- `/games/match-the-right` (levels list) and `/games/match-the-right/level/:levelId`
- `/resources`, `/feedback`

## Development Notes
- Frontend uses TanStack Query for data fetching/caching and Radix UI primitives.
- Tailwind design tokens are defined in `tailwind.config.js` with a CSS variable-driven theme.
- Vite alias `@` → `src/` (see `vite.config.js`).

## Folder Structure (Excerpt)
```
.
├─ README.md
├─ package.json              # frontend
├─ vite.config.js
├─ tailwind.config.js
├─ postcss.config.js
├─ public/
├─ src/
│  ├─ pages/                 # Index, Dashboard, Modules, Games, Modules 1–6
│  ├─ components/            # UI primitives, layout, StoryBook components
│  ├─ data/                  # story, levels, right-or-wrong datasets
│  └─ ...
└─ server/
	 ├─ server.js              # Express app & route mounting
	 ├─ routes/                # auth, badges, dashboard, learn, points
	 ├─ controllers/           # business logic
	 ├─ models/                # User, QuizPoints, LearnProgress, UserBadge
	 └─ .env.example
```

## Build & Preview (Frontend)
```bash
npm run build
npm run preview
```

## Production Considerations
- Use environment variables in `server/server.js` (`dotenv`) for `PORT` and `MONGO_URI`.
- Add authentication (JWT/cookies), request validation, and rate limiting.
- Configure CORS appropriately for deployed origins.
- Use a process manager (PM2) and connection pooling for MongoDB.

## License
No license file has been provided. Add one if required.
