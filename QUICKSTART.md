# Quick Start Guide - BlogCMS

## 🚀 How to Use Your Blog CMS

### On Render (Live Production Site)

Your live site: **https://blogsite-zhux.onrender.com**

#### First Time Setup

1. **Visit your live site** at the URL above
2. **Click "CMS Dashboard"** button in the top right
3. You'll be redirected to the **login page**
4. **Click the "Register" tab** to create your account
5. Fill in:
   - **Username**: Choose a username (minimum 3 characters)
   - **Password**: Create a secure password (minimum 6 characters)
6. Click **"Create Account"**
7. You'll be automatically logged in and redirected to the CMS Dashboard!

#### Creating Your First Article

1. In the **CMS Dashboard**, click **"New Article"** (or the + icon)
2. Fill in the article details:
   - **Title**: Your article title
   - **Slug**: URL-friendly version (e.g., "my-first-post")
   - **Excerpt**: Short summary (shows on homepage)
   - **Content**: Your full article content
   - **Category**: (Optional) Select or create a category
   - **Thumbnail URL**: (Optional) Link to an image
   - **Read Time**: (Optional) Estimated minutes to read
3. Click **"Save"** or **"Publish"**
4. Your article is now live! Visit the homepage to see it

#### Managing Your Blog

**To edit an article:**
1. Go to CMS Dashboard
2. Find the article in the list
3. Click **"Edit"**
4. Make your changes
5. Click **"Update"**

**To delete an article:**
1. Go to CMS Dashboard
2. Find the article
3. Click **"Delete"**
4. Confirm deletion

**To logout:**
1. Click the **"Logout"** button in the top right
2. You'll be redirected to the homepage

### Important Notes About Free Tier on Render

#### The "Sleep" Behavior
- After **15 minutes of no visitors**, your app goes to sleep (to save resources)
- The **first visitor** after sleep waits **30-60 seconds** for the app to wake up
- Once awake, it runs normally for everyone
- This is standard for free hosting - not a bug!

**Tip**: If showing to your client, visit the site 1-2 minutes before your demo to wake it up.

#### Database Limit
- Free database: **1GB storage** (enough for thousands of articles)
- Expires after **90 days** if not upgraded
- You can export/migrate data before expiration

### Production Checklist

Before sharing with your client, make sure you've:

1. ✅ **Set SESSION_SECRET** in Render dashboard
   - Go to your Web Service → Environment
   - Add `SESSION_SECRET` with a strong random string
   - Example: Use `openssl rand -base64 32` to generate one

2. ✅ **Created your admin account** on the live site

3. ✅ **Created at least one sample article** so the site doesn't look empty

4. ✅ **Tested the full flow**: Login → Create article → View on homepage → Logout

### Common Issues

**"Session errors" or "Login doesn't persist"**
- Make sure `SESSION_SECRET` is set in Render environment variables

**"Database connection failed"**
- Verify `DATABASE_URL` is set correctly in Render
- Use the **Internal Database URL** from your Render PostgreSQL dashboard

**"App is slow to load"**
- This is the sleep behavior on free tier
- Wait 30-60 seconds on first visit after inactivity
- Consider upgrading to Starter plan ($7/mo) for always-on hosting

**"CMS Dashboard button doesn't work"**
- Make sure you're on the latest deployment
- Clear browser cache and try again

### Need Help?

1. Check the **DEPLOYMENT.md** file for detailed deployment instructions
2. Check Render logs in your dashboard for error messages
3. All environment variables are documented in DEPLOYMENT.md

### Sharing with Your Client

When your site is ready:

1. Share the live URL: `https://blogsite-zhux.onrender.com`
2. Explain the 30-60 second wake-up delay (free tier limitation)
3. Show them how to access the CMS (if giving them access)
4. Or just show them the published articles on the homepage

That's it! You now have a fully functional blog CMS deployed and ready to use.
