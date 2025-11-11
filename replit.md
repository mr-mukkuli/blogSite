# BlogCMS - Project Overview

## What is This Project?

BlogCMS is a complete, production-ready blog platform with content management system (CMS). It features a clean, minimalist design inspired by Notis.ai, with modern UI components and full CRUD functionality for managing blog content.

## Key Features Built

### Frontend (React + TypeScript)
- **Homepage** - Beautiful card-based layout displaying categories and recent articles
- **Search** - Real-time article search with keyboard shortcut (⌘K)
- **Article Pages** - Clean reading experience with YouTube video embeds, images, and related articles
- **CMS Dashboard** - Full content management interface with sidebar navigation
- **Article Editor** - Rich text editor supporting YouTube videos, images, and formatting
- **Dark Mode** - Complete light/dark theme support
- **Responsive Design** - Works on desktop, tablet, and mobile devices

### Backend (Node.js + Express + PostgreSQL)
- **RESTful API** - Complete CRUD operations for articles and categories
- **Authentication** - Secure user authentication with bcrypt password hashing and session management
- **PostgreSQL Database** - Persistent data storage with Drizzle ORM
- **Type-Safe** - Full TypeScript support with Zod validation
- **Database Migrations** - Automated schema management with Drizzle Kit
- **Protected Routes** - All write operations (POST/PUT/DELETE) require authentication

### Content Management
- **Categories** - Organize articles by topic
- **Rich Text Editor** - React Quill with YouTube and image embedding
- **Article CRUD** - Create, read, update, and delete articles
- **Real-time Updates** - TanStack Query for optimistic UI updates
- **Slug Generation** - Automatic URL-friendly slugs

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Wouter, TanStack Query, React Quill
- **Backend**: Node.js, Express, PostgreSQL, Drizzle ORM
- **UI Components**: Shadcn UI (Radix UI primitives)
- **Styling**: Tailwind CSS with custom design system
- **Database**: PostgreSQL (Neon-backed)

## Architecture

### Database Schema

**Users Table:**
- id (varchar, UUID primary key)
- username (text, unique) - Minimum 3 characters
- password (text) - Bcrypt hashed with 12 rounds
- createdAt (timestamp, default now)

**Categories Table:**
- id (varchar, UUID primary key)
- name (text, unique)
- description (text, nullable)
- slug (text, unique)
- icon (text, nullable)

**Articles Table:**
- id (varchar, UUID primary key)
- title (text)
- slug (text, unique)
- excerpt (text, nullable)
- content (text) - Stores HTML from rich text editor
- thumbnail (text, nullable) - Image URL
- categoryId (varchar, foreign key, nullable)
- readTime (integer, nullable) - Minutes to read
- published (timestamp, default now)
- updatedAt (timestamp, default now)

### API Endpoints

**Authentication:**
- POST /api/register - Create new user account
- POST /api/login - Login with username/password
- POST /api/logout - Logout and destroy session
- GET /api/user - Get current logged-in user (returns 401 if not authenticated)

**Categories:**
- GET /api/categories - List all categories with article counts (public)
- GET /api/categories/:id - Get single category with articles (public)
- POST /api/categories - Create new category (requires auth)

**Articles:**
- GET /api/articles - List all articles (public, supports ?search and ?category)
- GET /api/articles/:slug - Get article by URL slug (public)
- POST /api/articles - Create new article (requires auth)
- PUT /api/articles/:id - Update article (requires auth)
- DELETE /api/articles/:id - Delete article (requires auth)

### Frontend Routes

- `/` - Homepage with categories and articles (public)
- `/article/:slug` - Article detail page (public)
- `/auth` - Login and signup page
- `/cms` - CMS dashboard (protected, requires login)
- `/cms/articles/:id/edit` - Article editor (protected, requires login)

## Project Structure

```
.
├── client/                      # Frontend React application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── ArticleCard.tsx        # Article preview card
│   │   │   ├── ArticleContent.tsx     # Renders article HTML
│   │   │   ├── CategoryCard.tsx       # Category display card
│   │   │   ├── Header.tsx             # Site header
│   │   │   ├── SearchHero.tsx         # Homepage search
│   │   │   ├── ThemeToggle.tsx        # Dark mode toggle
│   │   │   ├── RichTextEditor.tsx     # React Quill editor
│   │   │   ├── AppSidebar.tsx         # CMS sidebar navigation
│   │   │   └── ui/                    # Shadcn UI components
│   │   ├── pages/              # Page components
│   │   │   ├── HomeConnected.tsx           # Homepage
│   │   │   ├── ArticleDetailConnected.tsx  # Article view
│   │   │   ├── AuthPage.tsx                # Login/signup page
│   │   │   ├── CMSDashboardConnected.tsx   # CMS dashboard
│   │   │   └── ArticleEditor.tsx           # Create/edit articles
│   │   ├── hooks/              # React hooks
│   │   │   └── use-auth.tsx    # Authentication context and hooks
│   │   ├── lib/                # Utilities
│   │   │   ├── queryClient.ts   # TanStack Query config
│   │   │   └── protected-route.tsx  # Route protection component
│   │   └── App.tsx             # Main app with routing
│   └── index.html              # HTML entry point
├── server/                      # Backend Express application
│   ├── db.ts                   # Database connection
│   ├── auth.ts                 # Authentication setup (passport, bcrypt, sessions)
│   ├── storage.ts              # Data access layer (DatabaseStorage)
│   ├── routes.ts               # API route handlers
│   ├── seed.ts                 # Database seeding script
│   └── index.ts                # Server entry point
├── shared/                      # Shared types and schemas
│   └── schema.ts               # Drizzle database schema + Zod types
├── screenshots/                 # Application screenshots for portfolio
├── attached_assets/             # Generated images and assets
├── README.md                    # Complete user documentation
├── SETUP.md                     # Beginner-friendly setup guide
├── DEPLOYMENT.md                # Deployment instructions
└── drizzle.config.ts           # Drizzle ORM configuration
```

## How It Works

### Data Flow

1. **User visits homepage** → Frontend fetches categories and articles from API
2. **User searches** → Frontend sends search query to `/api/articles?search=query`
3. **User reads article** → Frontend fetches article by slug from `/api/articles/slug`
4. **User creates article** → CMS sends POST to `/api/articles` with article data
5. **Database updates** → Backend validates with Zod, stores in PostgreSQL
6. **UI updates** → TanStack Query invalidates cache, refetches data

### Rich Text Content

Articles support rich formatting via React Quill:
- **YouTube embeds**: Users paste YouTube URL, editor creates iframe
- **Images**: Users provide image URL, editor inserts img tag
- **HTML storage**: Content stored as HTML in database
- **Safe rendering**: Frontend uses `dangerouslySetInnerHTML` with styled container

### Search Implementation

- **Frontend filtering**: Search works on fetched articles client-side
- **Backend filtering**: API supports `?search=query` for server-side filtering
- **Real-time**: Search updates as user types
- **Scope**: Searches across title, excerpt, and content

## Development Workflow

### Running Locally

```bash
# Install dependencies
npm install

# Set up database
npm run db:push

# Add sample data (optional)
npx tsx server/seed.ts

# Start development server
npm run dev
```

Access at:
- Frontend: http://localhost:5000
- CMS: http://localhost:5000/cms
- API: http://localhost:5000/api

### Making Changes

1. **Database schema changes:**
   - Edit `shared/schema.ts`
   - Run `npm run db:push`
   - Update `server/storage.ts` if needed

2. **New API endpoints:**
   - Add route in `server/routes.ts`
   - Use Zod for validation
   - Update storage interface if needed

3. **Frontend components:**
   - Create in `client/src/components/`
   - Use TypeScript and Tailwind CSS
   - Follow Shadcn UI patterns

4. **New pages:**
   - Create in `client/src/pages/`
   - Add route in `client/src/App.tsx`
   - Use TanStack Query for data fetching

## Deployment

### Frontend (Netlify)
- Build command: `npm run build`
- Publish directory: `dist/public`
- Environment variables: `VITE_API_URL`

### Backend (Railway)
- Automatically detects Node.js
- Provisions PostgreSQL database
- Environment variables: `DATABASE_URL`, `SESSION_SECRET`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## Documentation

- **README.md** - Complete project documentation with API reference
- **SETUP.md** - Step-by-step setup guide for beginners
- **DEPLOYMENT.md** - Production deployment instructions
- **replit.md** (this file) - Architecture and development guide

## Sample Data

The seed script (`server/seed.ts`) creates:
- 2 categories: Documentation, Guides
- 5 articles with rich content including:
  - YouTube video embeds
  - Images
  - Code blocks
  - Lists and formatting

## User Preferences

- Design inspired by Notis.ai (clean, minimalist)
- Purple accent color (HSL: 262 83% 58%)
- Card-based layout with hover effects
- Dark mode support
- Mobile-responsive design
- Focus on readability and content

## Future Enhancements

Potential features to add:
- Image upload (currently uses URLs)
- Draft/publish workflow
- Article versioning
- User authentication
- Comments system
- Analytics dashboard
- SEO meta tags generation
- RSS feed
- Social media sharing
- Tag system

## Authentication System

### How It Works

The app uses session-based authentication with the following components:

**Server Side:**
- **Passport.js** with LocalStrategy for username/password authentication
- **bcrypt** for secure password hashing (12 rounds)
- **express-session** with PostgreSQL session store for persistent sessions
- **Secure cookies** with httpOnly, sameSite, and secure flags in production

**Client Side:**
- **AuthProvider** using React Context and TanStack Query
- **ProtectedRoute** component to guard CMS routes
- **useAuth** hook for accessing user state and auth mutations

### Security Features

- Passwords hashed with bcrypt (12 rounds)
- Session data stored in PostgreSQL
- CSRF protection via sameSite cookies
- httpOnly cookies prevent XSS attacks
- Secure cookies in production (HTTPS)
- 7-day session expiration
- Trust proxy configuration for Render deployment

### User Flow

1. **First Visit**: User clicks "CMS Dashboard" → Redirected to /auth
2. **Registration**: User creates account → Auto-logged in → Redirected to CMS
3. **Login**: User logs in → Session created → Access to CMS
4. **Logout**: User clicks logout → Session destroyed → Redirected to homepage
5. **Protected Access**: Unauthenticated users trying to access /cms → Redirected to /auth

### Environment Variables

**Required for Production:**
- `SESSION_SECRET` - Strong random string for session encryption (CRITICAL)
- `DATABASE_URL` - PostgreSQL connection string
- `NODE_ENV` - Set to "production"

**Local Development:**
- Uses fallback session secret (automatically handled)
- DATABASE_URL from local Replit database

## Last Updated

November 11, 2025 - Added authentication system with bcrypt and session management
