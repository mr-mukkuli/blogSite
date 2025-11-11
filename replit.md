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
- **PostgreSQL Database** - Persistent data storage with Drizzle ORM
- **Type-Safe** - Full TypeScript support with Zod validation
- **Database Migrations** - Automated schema management with Drizzle Kit

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

**Categories:**
- GET /api/categories - List all categories with article counts
- GET /api/categories/:id - Get single category with articles
- POST /api/categories - Create new category

**Articles:**
- GET /api/articles - List all articles (supports ?search and ?category)
- GET /api/articles/:slug - Get article by URL slug
- POST /api/articles - Create new article
- PUT /api/articles/:id - Update article
- DELETE /api/articles/:id - Delete article

### Frontend Routes

- `/` - Homepage with categories and articles
- `/article/:slug` - Article detail page
- `/cms` - CMS dashboard (article list)
- `/cms/articles/:id/edit` - Article editor (create/edit)
- `/cms/articles/new/edit` - Create new article

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
│   │   │   ├── CMSDashboardConnected.tsx   # CMS dashboard
│   │   │   └── ArticleEditor.tsx           # Create/edit articles
│   │   ├── lib/                # Utilities
│   │   │   └── queryClient.ts   # TanStack Query config
│   │   └── App.tsx             # Main app with routing
│   └── index.html              # HTML entry point
├── server/                      # Backend Express application
│   ├── db.ts                   # Database connection
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

## Last Updated

November 11, 2025 - Initial version with full CMS functionality
