# Deployment Guide

This guide provides detailed instructions for deploying your BlogCMS application to production.

## Architecture Overview

BlogCMS is a full-stack application with two parts that need to be deployed:

1. **Frontend** (React SPA) - Best deployed to Netlify, Vercel, or similar
2. **Backend** (Node.js API) - Requires a Node.js host with PostgreSQL database

## Option 1: Netlify Frontend + Railway Backend (Recommended)

This is the easiest and most cost-effective option for beginners.

### Step 1: Deploy Backend to Railway

1. **Sign up for Railway:**
   - Go to [railway.app](https://railway.app)
   - Sign up with your GitHub account

2. **Create New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your blog-cms repository

3. **Add PostgreSQL Database:**
   - In your project, click "+ New"
   - Select "Database" → "PostgreSQL"
   - Railway will automatically provision a database

4. **Configure Environment Variables:**
   - Click on your service (blog-cms)
   - Go to "Variables" tab
   - Add the following variables:
     ```
     DATABASE_URL=${{Postgres.DATABASE_URL}}
     SESSION_SECRET=<generate-random-string>
     NODE_ENV=production
     ```
   - Railway automatically connects your database

5. **Configure Build Settings:**
   - Railway should auto-detect your app
   - Build Command: `npm run build`
   - Start Command: `npm start`

6. **Deploy:**
   - Railway will automatically deploy
   - Get your backend URL (e.g., `https://blog-cms-production.up.railway.app`)

### Step 2: Deploy Frontend to Netlify

1. **Sign up for Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with your GitHub account

2. **Create New Site:**
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select your repository

3. **Configure Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `dist/public`
   - Click "Show advanced" and add environment variables:
     ```
     VITE_API_URL=https://your-backend-url.railway.app
     ```

4. **Deploy:**
   - Click "Deploy site"
   - Netlify will build and deploy your site

5. **Custom Domain (Optional):**
   - Go to "Domain settings"
   - Add your custom domain
   - Follow DNS configuration instructions

### Step 3: Update Backend for Production

You need to configure CORS to allow your Netlify frontend to access the Railway backend.

1. **Update `server/index.ts`:**
   ```typescript
   import cors from 'cors';
   
   app.use(cors({
     origin: [
       'http://localhost:5000',
       'https://your-site.netlify.app',
       'https://your-custom-domain.com'
     ],
     credentials: true
   }));
   ```

2. **Install cors package:**
   ```bash
   npm install cors
   npm install --save-dev @types/cors
   ```

3. **Commit and push:**
   ```bash
   git add .
   git commit -m "Add CORS configuration"
   git push
   ```
   Railway will automatically redeploy.

### Step 4: Seed Production Database

1. **Connect to Railway project:**
   - Install Railway CLI: `npm i -g @railway/cli`
   - Login: `railway login`
   - Link project: `railway link`

2. **Run seed script:**
   ```bash
   railway run npx tsx server/seed.ts
   ```

## Option 2: Vercel (Full-Stack)

Vercel can host both frontend and serverless backend functions.

### Step 1: Prepare for Vercel

1. **Create `vercel.json`:**
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist/public",
     "devCommand": "npm run dev",
     "installCommand": "npm install",
     "framework": null,
     "rewrites": [
       {
         "source": "/api/(.*)",
         "destination": "/api"
       }
     ]
   }
   ```

2. **Convert backend to serverless:**
   - Create `api/index.ts` that exports your Express app
   - This requires some refactoring of your backend

### Step 2: Deploy to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Add Environment Variables:**
   - Go to Vercel dashboard → Your Project → Settings → Environment Variables
   - Add: `DATABASE_URL`, `SESSION_SECRET`

4. **Deploy Production:**
   ```bash
   vercel --prod
   ```

## Option 3: Traditional VPS (Advanced)

For full control, deploy to a VPS like DigitalOcean, Linode, or AWS EC2.

### Prerequisites

- A VPS with Ubuntu 22.04
- Domain name (optional)
- SSH access to your server

### Step 1: Server Setup

1. **Connect to your server:**
   ```bash
   ssh root@your-server-ip
   ```

2. **Update system:**
   ```bash
   apt update && apt upgrade -y
   ```

3. **Install Node.js:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   apt install -y nodejs
   ```

4. **Install PostgreSQL:**
   ```bash
   apt install postgresql postgresql-contrib -y
   systemctl start postgresql
   systemctl enable postgresql
   ```

5. **Install Nginx:**
   ```bash
   apt install nginx -y
   systemctl start nginx
   systemctl enable nginx
   ```

6. **Install PM2:**
   ```bash
   npm install -g pm2
   ```

### Step 2: Database Setup

1. **Create database and user:**
   ```bash
   sudo -u postgres psql
   ```
   
   ```sql
   CREATE DATABASE blogcms;
   CREATE USER bloguser WITH ENCRYPTED PASSWORD 'your-secure-password';
   GRANT ALL PRIVILEGES ON DATABASE blogcms TO bloguser;
   \q
   ```

### Step 3: Deploy Application

1. **Clone repository:**
   ```bash
   cd /var/www
   git clone <your-repo-url> blog-cms
   cd blog-cms
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   nano .env
   ```
   
   Add:
   ```
   DATABASE_URL=postgresql://bloguser:your-secure-password@localhost:5432/blogcms
   SESSION_SECRET=your-random-secret
   NODE_ENV=production
   ```

4. **Build application:**
   ```bash
   npm run build
   ```

5. **Run migrations and seed:**
   ```bash
   npm run db:push
   npx tsx server/seed.ts
   ```

6. **Start with PM2:**
   ```bash
   pm2 start npm --name "blog-cms" -- start
   pm2 save
   pm2 startup
   ```

### Step 4: Configure Nginx

1. **Create Nginx config:**
   ```bash
   nano /etc/nginx/sites-available/blog-cms
   ```

2. **Add configuration:**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

3. **Enable site:**
   ```bash
   ln -s /etc/nginx/sites-available/blog-cms /etc/nginx/sites-enabled/
   nginx -t
   systemctl reload nginx
   ```

4. **Setup SSL with Certbot:**
   ```bash
   apt install certbot python3-certbot-nginx -y
   certbot --nginx -d your-domain.com
   ```

## Environment Variables Reference

### Required Variables

```bash
# Database connection string
DATABASE_URL=postgresql://user:password@host:port/database

# Secret key for sessions (generate with: openssl rand -base64 32)
SESSION_SECRET=your-random-secret-key
```

### Optional Variables

```bash
# Node environment
NODE_ENV=production

# Server port (default: 5000)
PORT=5000

# Frontend URL for CORS (if frontend is separate)
FRONTEND_URL=https://your-site.netlify.app
```

## Post-Deployment Checklist

- [ ] Backend is accessible and returns data
- [ ] Frontend loads without errors
- [ ] Database migrations are applied
- [ ] Sample data is seeded (optional)
- [ ] CORS is configured correctly
- [ ] SSL certificate is installed
- [ ] Environment variables are set
- [ ] Monitoring is set up (optional)
- [ ] Backups are configured (for database)
- [ ] Domain DNS is pointing to your deployment

## Monitoring and Maintenance

### Database Backups

**Railway:** Automatic backups included in paid plans

**Manual Backups:**
```bash
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql
```

### Application Logs

**Railway:** View logs in dashboard

**PM2 on VPS:**
```bash
pm2 logs blog-cms
pm2 monit
```

### Updating Application

1. **Pull latest code:**
   ```bash
   git pull origin main
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build:**
   ```bash
   npm run build
   ```

4. **Run migrations:**
   ```bash
   npm run db:push
   ```

5. **Restart:**
   ```bash
   pm2 restart blog-cms
   ```

## Troubleshooting Deployment

### 502 Bad Gateway

- Check if backend is running: `pm2 status`
- Check backend logs: `pm2 logs`
- Verify DATABASE_URL is correct

### CORS Errors

- Ensure backend has CORS configured
- Check FRONTEND_URL matches your Netlify domain
- Verify credentials: true in CORS config

### Database Connection Errors

- Verify DATABASE_URL format
- Check database is running
- Ensure database user has proper permissions
- For Railway: Check database is in same project

### Build Failures

- Check Node.js version (should be 20+)
- Verify all dependencies are in package.json
- Check build logs for specific errors

## Cost Estimation

### Free Tier Deployment

- **Netlify:** Free (100GB bandwidth)
- **Railway:** Free $5 credit/month (enough for small projects)
- **Total:** Free for low-traffic blogs

### Paid Options

- **Railway Hobby:** $5/month per service
- **Custom Domain:** $10-15/year
- **VPS:** $5-10/month (DigitalOcean, Linode)

## Security Best Practices

1. **Use strong SESSION_SECRET**
2. **Enable HTTPS/SSL**
3. **Keep dependencies updated**
4. **Use environment variables for secrets**
5. **Regular database backups**
6. **Monitor application logs**
7. **Use rate limiting for API**
8. **Sanitize user inputs**

## Support

For deployment issues:
1. Check application logs
2. Verify environment variables
3. Test API endpoints manually
4. Check database connectivity
5. Review this guide's troubleshooting section

Need more help? Create an issue on GitHub with:
- Deployment platform
- Error messages
- Steps you've tried
