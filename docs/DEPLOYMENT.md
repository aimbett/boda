# GitHub Pages Deployment Guide

Complete step-by-step guide to deploy this wedding invitation website to GitHub Pages.

---

## Prerequisites

- GitHub account (free at github.com)
- This repository cloned or forked to your account
- Google Sheets + Google Apps Script already set up (see `GOOGLE_DRIVE_SETUP.md`)
- The `SHEET_URL` from your Google Apps Script deployment

---

## Step 1: Prepare Your GitHub Repository

### If starting fresh:

1. **Create a new public repository**
   - Go to github.com → New repository
   - Name: `boda` (or any name you prefer)
   - **MUST be PUBLIC** (private repos require GitHub Pro for Pages)
   - Add README (optional, this guide replaces it)
   - Click "Create repository"

2. **Clone the repo locally**
   ```bash
   git clone https://github.com/YOUR_USERNAME/boda.git
   cd boda
   ```

3. **Copy files from this project**
   - Copy `index.html`, `invitados.js`, `README.md`, `CLAUDE.md`
   - Create `docs/` folder and add all documentation files

### If using existing repo:

1. **Ensure it's public**
   - Settings → Change repository visibility → Public

2. **Add/update files**
   - Replace old `index.html` with this version
   - Update `invitados.js` with your guest list
   - Add `docs/` folder with all guides

---

## Step 2: Configure Your Site Files

### Update `index.html`

**Line 491 - Add your Google Apps Script URL:**
```javascript
const SHEET_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/usercontent';
```

Replace `YOUR_SCRIPT_ID` with the actual ID from your Apps Script deployment.
See `GOOGLE_DRIVE_SETUP.md` for how to get this.

**Line 490 - Update admin password hash:**
```javascript
const PASS_HASH = 'YOUR_NEW_HASH_HERE';
```

Instructions in `SECURITY.md` for generating this.

**Line 492 - Update secret token:**
```javascript
const SECRET = 'your_unique_secret_here';
```

Use a unique random string (20+ characters recommended).

### Update `invitados.js`

Add your guests:
```javascript
const INVITADOS = [
  {
    grupo: "Familia-Garcia",
    personas: ["María García", "Carlos García"],
    mesa: "Familia"
  },
  {
    grupo: "Amigos-Universidad",
    personas: ["Diego Martínez"],
    mesa: "Amigos"
  }
  // ... more guests
];
```

---

## Step 3: Test Locally Before Deployment

### Start a local web server

**Using Python 3:**
```bash
python3 -m http.server 8000
```

**Using Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

**Using Node.js (if installed):**
```bash
npx http-server
```

Then visit: `http://localhost:8000`

### Test functionality

- [ ] Welcome screen appears
- [ ] Countdown timer updates
- [ ] Test personalized URL: `?grupo=test&personas=Test%20User`
- [ ] RSVP form loads
- [ ] Try submitting (should appear in Google Sheet)
- [ ] Click admin button (golden dot, bottom right)
- [ ] Enter admin password
- [ ] Admin panel loads responses

**Note:** RSVP submission may silently fail locally due to CORS. This is OK — it will work on GitHub Pages after we configure it.

---

## Step 4: Commit and Push to GitHub

```bash
# Stage all changes
git add .

# Commit with a message
git commit -m "Initial wedding invitation deployment

- Add index.html with personalized RSVP system
- Add invitados.js with guest list
- Configure Google Apps Script URL and secrets
- Add comprehensive documentation"

# Push to GitHub
git push origin main
```

**Important:** Make sure you're pushing to `main` branch (or `master`, depending on your repo).

---

## Step 5: Enable GitHub Pages

1. **Go to your repository on GitHub**
   - Navigate to `github.com/YOUR_USERNAME/boda`

2. **Open Settings**
   - Click "Settings" tab (top right)

3. **Find Pages section**
   - Left sidebar → "Pages" (or "GitHub Pages")

4. **Configure deployment source**
   - **Source:** Deploy from a branch
   - **Branch:** `main` (or `master`)
   - **Folder:** `/ (root)`
   - Click "Save"

5. **Wait for deployment**
   - GitHub will build and deploy (usually 30 seconds)
   - You'll see a green checkmark and URL: `https://YOUR_USERNAME.github.io/boda/`

---

## Step 6: Verify Deployment

1. **Visit your live site**
   - Open the URL from Step 5 in your browser
   - Should see the invitation page

2. **Test functionality**
   - [ ] Welcome screen with countdown
   - [ ] Personalized invitation: `?grupo=Familia-Garcia&personas=Maria%20Garcia`
   - [ ] RSVP form submission
   - [ ] Check Google Sheet for new entry
   - [ ] Admin panel access (gold dot + password)
   - [ ] Admin panel loads responses

3. **Test on mobile**
   - Open on phone/tablet
   - Verify responsive layout
   - Test RSVP form on mobile

---

## Step 7: Generate and Share Invitation Links

1. **Open admin panel**
   - Click golden dot (bottom right)
   - Enter admin password
   - Scroll to "Links por grupo"

2. **Copy invitation links**
   - "Copiar" button copies URL to clipboard
   - Share with each group via email/WhatsApp

**Example invitation link:**
```
https://YOUR_USERNAME.github.io/boda/?grupo=Familia-Garcia&personas=Maria%20Garcia,Carlos%20Garcia
```

---

## Step 8: Monitor Responses

1. **Check Google Sheet directly**
   - Open your Google Sheet
   - See responses in real-time

2. **Use admin panel**
   - Click golden dot → Enter password
   - Scroll to "Confirmaciones"
   - Click "Actualizar" to refresh
   - See all responses with statistics

---

## Customization After Deployment

### Update guest list

1. Edit `invitados.js`
2. Commit: `git add invitados.js && git commit -m "Update guest list"`
3. Push: `git push origin main`
4. GitHub Pages auto-updates (wait 30 seconds)

### Change colors

**Option 1 - Permanent (in code):**
1. Edit CSS in `index.html` (search `:root`)
2. Change hex colors
3. Commit and push

**Option 2 - User controlled (admin panel):**
- Admin can customize colors via admin panel
- Changes save to browser localStorage (temporary)

### Update wedding details

Edit `index.html`:
- Line 311: Date display
- Line 335: Date card
- Line 345: Time
- Line 358-360: Venue and address
- Line 380-381: Dress code
- Line 398: Hotel discount code
- Line 415-417: Gift message

---

## Troubleshooting Deployment

### "GitHub Pages not enabled"

**Solution:**
- Go to Settings → Pages
- Ensure source is set to `main` branch, `/ (root)` folder
- Click Save
- Wait 60 seconds and try again

### "404 Not Found on GitHub Pages"

**Solution:**
- Verify files were pushed: `git status` (should be clean)
- Check deployment status in repo → Settings → Pages (look for deployment log)
- If still failing, try pushing again: `git push origin main --force`

### "CSS/JS not loading"

**Solution:**
- Hard refresh browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Clear browser cache
- Try in incognito/private mode

### "RSVP not saving to Google Sheet"

**Solution:**
- Verify `SHEET_URL` is correct in `index.html` line 491
- Check Google Apps Script is deployed
- Verify Google Sheet exists and has data columns
- Check browser console (F12) for errors
- See `GOOGLE_DRIVE_SETUP.md` for setup verification

### "Admin panel not loading responses"

**Solution:**
- Google Apps Script needs CORS configured
- See `GOOGLE_DRIVE_SETUP.md` for CORS instructions
- Verify `SECRET` matches between `index.html` and Google Apps Script

### "My custom domain isn't working"

**To use custom domain:**
1. Buy domain (GoDaddy, Namecheap, etc.)
2. Point DNS to GitHub Pages (see GitHub docs)
3. In Settings → Pages → Custom domain → Enter your domain
4. GitHub auto-creates SSL certificate

---

## Continuous Updates

### Deploy updates to your site

After making changes:

```bash
# 1. Make changes in editor
# 2. Stage files
git add .

# 3. Commit
git commit -m "Describe your changes"

# 4. Push to GitHub
git push origin main

# 5. GitHub auto-deploys (wait 30 seconds)
# 6. Refresh your site URL
```

### Rollback to previous version

If something breaks:

```bash
# View commit history
git log --oneline

# Revert to specific commit
git revert COMMIT_HASH

# Push revert
git push origin main
```

---

## Performance & Caching

### GitHub Pages CDN

- Your site is automatically cached worldwide
- Fast load times from any location
- 10-minute cache by default (good balance)

### Browser caching

- First visit: Full download
- Return visits: Uses cached files
- If changes aren't visible:
  - Hard refresh: `Ctrl+Shift+R` (Chrome/Firefox)
  - Clear cache (Settings → Clear browsing data)

---

## Going Live Checklist

Before sending invitations:

- [ ] Site is live at GitHub Pages URL
- [ ] Personalized invitations work (`?grupo=...&personas=...`)
- [ ] RSVP form saves to Google Sheet
- [ ] Admin panel works (password protected)
- [ ] Mobile layout looks good
- [ ] All guest names are correct in `invitados.js`
- [ ] Wedding date/time/location are correct
- [ ] Colors look good (if customized)
- [ ] Links for all guest groups generated and ready

---

## Support

**Still having issues?**
- See `docs/TROUBLESHOOTING.md`
- Check `CLAUDE.md` for technical details
- Review Google Apps Script logs for backend errors
- Check browser console (F12) for client-side errors

---

**Ready to go live? Generate your guest links and send them out!** 💍✨
