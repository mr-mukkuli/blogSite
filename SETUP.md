# Setup Guide - BlogCMS

This guide will walk you through setting up BlogCMS on your local machine step by step. No prior experience required!

## What You'll Need

Before we begin, you need to install some software on your computer:

### 1. Node.js (JavaScript Runtime)

Node.js allows you to run JavaScript on your computer (not just in browsers).

**On Windows:**
1. Go to https://nodejs.org/
2. Download the LTS (Long Term Support) version
3. Run the installer
4. Click "Next" through the installation wizard
5. Verify installation:
   - Open Command Prompt
   - Type: `node --version`
   - You should see something like `v20.11.0`

**On macOS:**
1. Open Terminal (Applications → Utilities → Terminal)
2. Install Homebrew (if not installed):
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
3. Install Node.js:
   ```bash
   brew install node@20
   ```
4. Verify: `node --version`

**On Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version
```

### 2. PostgreSQL (Database)

PostgreSQL stores all your blog data (articles, categories, etc.).

**On Windows:**
1. Download from https://www.postgresql.org/download/windows/
2. Run the installer
3. Remember the password you set during installation!
4. Default port is 5432 - keep it
5. Complete the installation

**On macOS:**
```bash
brew install postgresql@16
brew services start postgresql@16
```

**On Linux:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 3. Git (Version Control)

Git helps you manage your code and download the project.

**Download from:** https://git-scm.com/downloads

After installation, verify:
```bash
git --version
```

### 4. Code Editor (Optional but Recommended)

Download VS Code: https://code.visualstudio.com/

## Step-by-Step Setup

### Step 1: Get the Code

1. **Open Terminal/Command Prompt**
   - Windows: Search for "cmd" or "Command Prompt"
   - macOS: Applications → Utilities → Terminal
   - Linux: Ctrl+Alt+T

2. **Navigate to where you want the project**
   ```bash
   cd Desktop  # or wherever you want
   ```

3. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd blog-cms
   ```

### Step 2: Install Dependencies

This downloads all the code libraries your project needs.

```bash
npm install
```

This will take a few minutes. You'll see a lot of text scrolling - that's normal!

### Step 3: Set Up the Database

#### Create the Database

**On Windows (using pgAdmin):**
1. Open pgAdmin (installed with PostgreSQL)
2. Expand "Servers" → "PostgreSQL 16"
3. Enter your password
4. Right-click "Databases" → "Create" → "Database"
5. Name it: `blogcms`
6. Click "Save"

**On macOS/Linux (using Terminal):**
```bash
# If PostgreSQL is running with default user
createdb blogcms

# If you need to use a specific user
sudo -u postgres createdb blogcms
```

#### Get Your Database Connection String

You need to know:
- **Username**: Usually `postgres` (or your computer username on macOS)
- **Password**: The one you set during installation
- **Host**: `localhost`
- **Port**: `5432` (default)
- **Database name**: `blogcms`

Your connection string looks like:
```
postgresql://username:password@localhost:5432/blogcms
```

**Example:**
```
postgresql://postgres:mypassword@localhost:5432/blogcms
```

### Step 4: Configure Environment Variables

Environment variables are settings that tell your app how to connect to the database.

1. **Create a `.env` file** in the project root folder:
   - Right-click in the project folder
   - New File → name it `.env` (yes, it starts with a dot!)
   
   OR use Terminal:
   ```bash
   touch .env
   ```

2. **Edit the `.env` file** and add:
   ```
   DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/blogcms
   SESSION_SECRET=my-super-secret-random-string-12345
   PORT=5000
   ```

3. **Replace `yourpassword`** with your actual PostgreSQL password

**Important:** The `.env` file contains sensitive information. Never share it or commit it to GitHub!

### Step 5: Initialize the Database

This creates the tables your blog needs (categories, articles).

```bash
npm run db:push
```

You should see:
```
✓ Changes applied
```

### Step 6: Add Sample Data (Optional)

To see your blog with some content right away:

```bash
npx tsx server/seed.ts
```

This creates:
- 2 categories (Documentation, Guides)
- 5 sample articles with content

### Step 7: Start the Application

```bash
npm run dev
```

You should see:
```
[express] serving on port 5000
```

## Access Your Blog

1. **Open your web browser** (Chrome, Firefox, Safari, etc.)

2. **Go to:** http://localhost:5000

You should see your blog homepage!

3. **Access the CMS Dashboard:** http://localhost:5000/cms

## Understanding the Project Structure

```
blog-cms/
├── client/              # Frontend (what users see)
│   ├── src/
│   │   ├── components/  # Reusable pieces (buttons, cards, etc.)
│   │   ├── pages/       # Different pages (Home, Article, CMS)
│   │   └── App.tsx      # Main app file
├── server/              # Backend (API, database)
│   ├── db.ts           # Database connection
│   ├── routes.ts       # API endpoints
│   └── storage.ts      # Database operations
├── shared/             # Code used by both frontend and backend
│   └── schema.ts       # Database structure
├── .env                # Your secret settings (DO NOT SHARE)
├── package.json        # Project info and dependencies
└── README.md          # Project documentation
```

## Common Issues and Solutions

### Issue: "Cannot connect to database"

**Problem:** Your DATABASE_URL in `.env` is wrong

**Solution:**
1. Check your PostgreSQL password
2. Make sure PostgreSQL is running:
   - Windows: Check Services
   - macOS: `brew services list`
   - Linux: `sudo systemctl status postgresql`

### Issue: "Port 5000 is already in use"

**Problem:** Another app is using port 5000

**Solution:**
1. Change PORT in `.env` to `5001` or another number
2. Or stop the other application using port 5000

### Issue: "Command not found: npm"

**Problem:** Node.js isn't installed or not in your PATH

**Solution:**
1. Re-install Node.js
2. Close and reopen Terminal/Command Prompt
3. Verify: `node --version`

### Issue: "Permission denied" (macOS/Linux)

**Solution:** Add `sudo` before the command:
```bash
sudo npm install
```

### Issue: Database tables don't exist

**Problem:** You forgot to run migrations

**Solution:**
```bash
npm run db:push
```

## Next Steps

Now that your blog is running:

1. **Create your first article:**
   - Go to http://localhost:5000/cms
   - Click "Create Article"
   - Fill in the form
   - Add YouTube videos using the video button
   - Save!

2. **Customize the blog:**
   - Edit files in `client/src/`
   - Changes auto-reload in your browser

3. **Learn more:**
   - Read [README.md](./README.md) for full documentation
   - Read [DEPLOYMENT.md](./DEPLOYMENT.md) to publish online

## Development Workflow

1. **Make changes** to your code
2. **Save the file** - the app auto-reloads
3. **Test** in your browser
4. **Commit changes** to Git:
   ```bash
   git add .
   git commit -m "Describe what you changed"
   ```

## Stopping the Application

Press `Ctrl+C` in the terminal where `npm run dev` is running.

## Restarting After Computer Restart

1. Make sure PostgreSQL is running
2. Navigate to project folder: `cd path/to/blog-cms`
3. Start the app: `npm run dev`

## Getting Help

If you're stuck:
1. Check this guide again
2. Read error messages carefully
3. Google the error message
4. Check the main [README.md](./README.md)
5. Create an issue on GitHub

## Useful Commands Reference

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Create/update database tables
npm run db:push

# Add sample data
npx tsx server/seed.ts

# Build for production
npm run build

# Start production server
npm start

# Check TypeScript types
npm run check
```

## Environment Variables Explained

| Variable | What it does | Example |
|----------|--------------|---------|
| `DATABASE_URL` | Tells app where database is | `postgresql://user:pass@localhost:5432/blogcms` |
| `SESSION_SECRET` | Encrypts user sessions | Any random string |
| `PORT` | Which port app runs on | `5000` |
| `NODE_ENV` | Development or production | `development` |

## Security Notes

- Never commit `.env` file to Git
- Use strong passwords for database
- Keep `SESSION_SECRET` random and secret
- Don't share your PostgreSQL password

## What to Do If Something Breaks

1. **Read the error message** - it usually tells you what's wrong
2. **Check the logs** - scroll up in terminal to see full error
3. **Google it** - copy error message and search
4. **Start fresh:**
   ```bash
   # Delete node_modules and reinstall
   rm -rf node_modules
   npm install
   
   # Reset database
   npm run db:push --force
   npx tsx server/seed.ts
   ```

## Congratulations! 🎉

You now have a fully functional blog with CMS running on your computer!

Next: Read [DEPLOYMENT.md](./DEPLOYMENT.md) to learn how to publish it online.
