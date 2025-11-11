# BlogCMS - Modern Content Management Platform

A professional blog platform with full-featured CMS, inspired by clean, minimalist design. Built with React, Node.js, Express, PostgreSQL, and TypeScript.

![BlogCMS Screenshot](screenshots/homepage.png)

## Features

- **Clean, Minimalist Design** - Card-based layout with smooth animations and hover effects
- **Rich Text Editor** - Create articles with YouTube videos, images, and rich formatting
- **Full CMS Dashboard** - Complete content management with sidebar navigation
- **Category Management** - Organize articles into categories
- **Dark Mode** - Beautiful light and dark themes
- **Search Functionality** - Real-time article search across titles and content
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **PostgreSQL Database** - Persistent storage for all your content

## Tech Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Utility-first styling
- **Wouter** - Lightweight routing
- **TanStack Query** - Server state management
- **React Quill** - Rich text editor with YouTube & image support
- **Shadcn UI** - High-quality UI components

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **PostgreSQL** - Relational database
- **Drizzle ORM** - Type-safe database toolkit
- **Zod** - Schema validation

## Project Structure

```
.
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities and configurations
│   │   └── App.tsx        # Main app component
├── server/                # Backend Express application
│   ├── db.ts             # Database connection
│   ├── storage.ts        # Data access layer
│   ├── routes.ts         # API routes
│   └── index.ts          # Server entry point
├── shared/               # Shared code between frontend and backend
│   └── schema.ts         # Database schema and types
├── screenshots/          # Application screenshots
└── attached_assets/      # Generated images and assets
```

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v20 or higher) - [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js)
- **PostgreSQL** (v14 or higher) - [Download PostgreSQL](https://www.postgresql.org/download/)
- **Git** - [Download Git](https://git-scm.com/)

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd blog-cms
```

### 2. Install Dependencies

```bash
npm install
```

This will install all the required packages for both frontend and backend.

### 3. Set Up PostgreSQL Database

#### On macOS (using Homebrew):
```bash
brew install postgresql@16
brew services start postgresql@16
createdb blogcms
```

#### On Windows:
1. Download PostgreSQL from https://www.postgresql.org/download/windows/
2. Run the installer and follow the setup wizard
3. Open pgAdmin or SQL Shell (psql)
4. Create a new database called `blogcms`

#### On Linux (Ubuntu/Debian):
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo -u postgres createdb blogcms
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/blogcms

# Session Secret (generate a random string)
SESSION_SECRET=your-super-secret-random-string-here

# Port (optional, defaults to 5000)
PORT=5000
```

**Important Notes:**
- Replace `username` and `password` with your PostgreSQL credentials
- On macOS/Linux with default PostgreSQL setup, you might use: `postgresql://localhost:5432/blogcms`
- Generate a strong random string for `SESSION_SECRET` (e.g., use `openssl rand -base64 32`)

### 5. Initialize the Database

Push the database schema to create tables:

```bash
npm run db:push
```

This creates the `categories` and `articles` tables in your database.

### 6. Seed Sample Data (Optional)

To populate your blog with sample articles:

```bash
npx tsx server/seed.ts
```

This creates:
- 2 categories (Documentation, Guides)
- 5 sample articles with rich content

### 7. Start the Development Server

```bash
npm run dev
```

This starts both the backend Express server and frontend Vite dev server.

The application will be available at:
- **Frontend:** http://localhost:5000
- **API:** http://localhost:5000/api

## Usage Guide

### Accessing the Blog

1. Open your browser and go to `http://localhost:5000`
2. You'll see the homepage with categories and articles
3. Click on any article to read it
4. Use the search bar to find specific articles

### Using the CMS Dashboard

1. Navigate to `http://localhost:5000/cms` or click "CMS Dashboard" in the header
2. The dashboard shows all your articles in a table format

#### Creating a New Article

1. Click "Create Article" button in the CMS dashboard
2. Fill in the article details:
   - **Title** - The main heading of your article
   - **Slug** - URL-friendly version (auto-generated from title)
   - **Excerpt** - Brief summary shown on article cards
   - **Thumbnail URL** - Featured image URL
   - **Category** - Select from existing categories
   - **Read Time** - Estimated minutes to read
   - **Content** - Rich text editor with formatting options

3. **Adding YouTube Videos:**
   - Click the video icon in the editor toolbar
   - Paste the YouTube URL
   - The video will be embedded in your article

4. **Adding Images:**
   - Click the image icon in the editor toolbar
   - Enter the image URL
   - The image will be inserted into your article

5. Click "Create Article" to save

#### Editing an Article

1. In the CMS dashboard, click the edit icon (pencil) next to any article
2. Make your changes
3. Click "Update Article" to save

#### Deleting an Article

1. Click the delete icon (trash) next to any article
2. Confirm the deletion in the dialog

### Search Functionality

- Use the search bar on the homepage to find articles
- Search works across article titles, excerpts, and content
- Results update in real-time as you type

### Dark Mode

- Click the moon/sun icon in the top-right corner to toggle dark mode
- Your preference is saved in browser storage

## API Documentation

### Categories

#### Get All Categories
```
GET /api/categories
```
Returns all categories with article counts.

#### Get Category by ID
```
GET /api/categories/:id
```
Returns a specific category with its articles.

#### Create Category
```
POST /api/categories
Content-Type: application/json

{
  "name": "Tutorials",
  "slug": "tutorials",
  "description": "Step-by-step tutorials",
  "icon": "https://example.com/icon.png"
}
```

### Articles

#### Get All Articles
```
GET /api/articles
GET /api/articles?search=query
GET /api/articles?category=categoryId
```
Returns all articles, optionally filtered by search query or category.

#### Get Article by Slug
```
GET /api/articles/:slug
```
Returns a specific article by its URL slug.

#### Create Article
```
POST /api/articles
Content-Type: application/json

{
  "title": "My Article",
  "slug": "my-article",
  "excerpt": "Brief summary",
  "content": "<p>Article content with HTML</p>",
  "thumbnail": "https://example.com/image.jpg",
  "categoryId": "category-uuid",
  "readTime": 5
}
```

#### Update Article
```
PUT /api/articles/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "<p>Updated content</p>"
}
```

#### Delete Article
```
DELETE /api/articles/:id
```

## Deployment

### Frontend (Netlify)

1. **Build the Frontend:**
```bash
npm run build
```

2. **Deploy to Netlify:**
   - Sign up at [netlify.com](https://netlify.com)
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist/public`
   - Add environment variables in Netlify settings

### Backend (Any Node.js Host)

Your backend needs to be hosted separately. Options include:
- **Railway** - Easy deployment with PostgreSQL
- **Render** - Free tier available
- **Heroku** - Popular platform
- **DigitalOcean App Platform**
- **AWS, Google Cloud, Azure**

**Backend Environment Variables:**
```
DATABASE_URL=your-production-database-url
SESSION_SECRET=your-secret-key
NODE_ENV=production
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Troubleshooting

### Database Connection Issues

**Error:** "DATABASE_URL must be set"
- **Solution:** Make sure your `.env` file exists and has the correct DATABASE_URL

**Error:** "Connection refused"
- **Solution:** Ensure PostgreSQL is running (`brew services start postgresql` on macOS)
- Check that the database exists (`createdb blogcms`)

### Port Already in Use

**Error:** "Port 5000 is already in use"
- **Solution:** Change the PORT in your `.env` file or stop the other application using port 5000

### React Quill Editor Not Loading

**Error:** Editor shows "Loading editor..."
- **Solution:** This is normal on first load. The editor loads asynchronously.
- If it persists, check browser console for errors

### Articles Not Showing

- Make sure you've run the database migration: `npm run db:push`
- Run the seed script to add sample data: `npx tsx server/seed.ts`
- Check that the backend is running and API endpoints are accessible

## Development Tips

### Adding New Features

1. **Database Changes:**
   - Update `shared/schema.ts` with new tables/columns
   - Run `npm run db:push` to sync with database
   - Update storage interface in `server/storage.ts`

2. **New API Routes:**
   - Add routes in `server/routes.ts`
   - Follow the existing pattern for validation and error handling

3. **Frontend Components:**
   - Create reusable components in `client/src/components/`
   - Use TypeScript for type safety
   - Follow the design system (Shadcn UI components)

### Code Style

- Use TypeScript for type safety
- Follow existing naming conventions
- Use Tailwind CSS for styling
- Keep components small and focused
- Add data-testid attributes for testing

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

If you encounter any issues or have questions:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review the [API Documentation](#api-documentation)
3. Check existing GitHub issues
4. Create a new issue with details about your problem

## Acknowledgments

- Design inspired by [Notis.ai](https://help.notis.ai/)
- Built with modern web technologies and best practices
- UI components from [Shadcn UI](https://ui.shadcn.com/)
