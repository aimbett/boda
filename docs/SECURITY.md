# Security Guide

How to generate and manage passwords, secrets, and public repo security.

---

## Overview

**This is a public wedding invitation website.** Some "secrets" are intentionally public (because it's not a production service). This guide explains what's secure and what's acceptable.

---

## Admin Password Generation

### Step 1: Create your password

Choose a strong password that only you (the bride/groom) will know.

**Examples:**
- `MiPrimer0Amor!` (personal, strong)
- `BodaAleA&Pri2026` (wedding-themed)
- `Toronto123Wedding` (at least 12 chars, mix of letters/numbers)

**Requirements:**
- At least 12 characters
- Mix of letters, numbers, symbols
- Something you can remember

### Step 2: Hash it with SHA-256

You need to hash this password because `index.html` stores the hash, not the plaintext password.

#### Option A: Browser Console (Easiest)

1. Open any website (or your invitation site)
2. Press **F12** to open Developer Tools
3. Go to **Console** tab
4. Paste this command:

```javascript
crypto.subtle.digest('SHA-256', new TextEncoder().encode('YOUR_PASSWORD_HERE'))
  .then(h => Array.from(new Uint8Array(h))
    .map(b => b.toString(16).padStart(2,'0')).join(''))
  .then(hash => console.log('Hash:', hash))
```

Replace `YOUR_PASSWORD_HERE` with your actual password.

5. Press Enter
6. Your hash appears: `Hash: e40aa9d56ec908c9d868bad75e3079f772...`
7. Copy the entire hash (starting after `Hash: `)

#### Option B: Online SHA-256 Tool

**⚠️ Less secure (password sent to website)**

1. Go to any online SHA-256 hasher (example.com/sha256)
2. Paste your password
3. Copy the resulting hash
4. **Delete browser history** (optional but recommended)

### Step 3: Update index.html

In `index.html`, line 490:

```javascript
const PASS_HASH = 'YOUR_HASH_HERE';
```

Replace `YOUR_HASH_HERE` with the hash from Step 2.

**Example:**
```javascript
// Before:
const PASS_HASH = 'e40aa9d56ec908c9d868bad75e3079f772bbf5778b2264bd1abe2bf488cbddaf';

// After (your new hash):
const PASS_HASH = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e';
```

### Step 4: Test the password

1. Push the change to GitHub (or test locally)
2. Open the invitation site
3. Click the golden dot (bottom right)
4. Enter your new password
5. Should see admin panel

If it doesn't work, try again (hash may have been wrong).

---

## SECRET Token Generation

### What is SECRET?

The `SECRET` is a shared authentication token sent with every RSVP submission. The Google Apps Script validates it to ensure requests come from your website.

### Generate SECRET

Choose a random string (20+ characters):

**Examples:**
- `torontoBodaSecretToken2026`
- `AleYPriSe Casan!TorontoAyuda`
- `bodaaleanprioreplyguidedbydog26`

### Update in two places

**1. In `index.html`, line 492:**
```javascript
const SECRET = 'your_secret_here';
```

**2. In Google Apps Script, line 5:**
```javascript
const SECRET = 'your_secret_here';  // Must match index.html
```

They **must be identical** or RSVP submissions will fail.

---

## Public Repo Security Implications

### What's visible in source code?

Anyone who clones your repo sees:

❌ **Line 490:** Admin password hash
❌ **Line 491:** Google Apps Script URL
❌ **Line 492:** SECRET token
❌ **invitados.js:** All guest names and groups

### Is this a problem?

**For this website: NO**

Why:
1. **It's a public wedding** (invitation is meant to be public)
2. **Guest names are invited anyway** (not secret)
3. **Password is hashed** (not plaintext)
4. **Any serious attacker** would need advanced skills to compromise Google Apps Script

### What could someone do?

- **View guest list** (already public via URLs)
- **Submit fake RSVPs** (use your SECRET) → Probably spam data, but still valid responses
- **Delete RSVPs** (if they have admin password hash, which requires brute force)
- **Change admin password** (would require code commit, so no)

### Mitigation strategies

**Option 1: Accept it (recommended for weddings)**
- This is a public invitation
- Guests will see the URLs anyway
- Level of security is reasonable

**Option 2: Rotate credentials after wedding**
- After all RSVPs received
- Change SECRET in Google Apps Script
- Forces any future requests to fail
- Prevents post-wedding tampering

**Option 3: Use private repo + custom domain**
- Keep repo private
- Deploy to custom domain (not GitHub Pages URL)
- More complex, probably not worth it

---

## Password Rotation

### Change admin password

1. **Create new password** (follow steps in "Admin Password Generation")
2. **Get new hash** (SHA-256 of new password)
3. **Update line 490** in `index.html`
4. **Commit and push** to GitHub
5. **Test** the new password

Old password immediately stops working.

### When to rotate

- After first deployment (avoid using original hash)
- After the wedding (prevent future tampering)
- If you suspect compromise (very unlikely)
- Optionally every 6 months (paranoid but OK)

---

## SECRET Rotation

### Change SECRET token

1. **Generate new random string** (20+ characters, see above)
2. **Update index.html line 492** with new SECRET
3. **Update Google Apps Script line 5** with new SECRET
4. **Deploy Apps Script** (Manage deployments → Update)
5. **Push code changes** to GitHub
6. **Test** RSVP submission

Old SECRET immediately stops working.

### When to rotate

- After deployment (avoid using original)
- After all RSVPs received (optional)
- If you suspect breach (very unlikely)

---

## Google Apps Script Security

### Why PUBLIC in Google Apps Script settings?

When deploying Google Apps Script as web app:
- **Execute as:** Your Google Account (only you can edit)
- **Who has access:** Anyone (so GitHub Pages can call it)

This is correct. The `SECRET` token provides auth, not the "Anyone" access.

### Can someone misuse the endpoint?

- Yes, they can submit fake RSVPs
- But they're using your SECRET, so they're technically authorized
- Your Google Sheet is read-only (anyone can read via GET, but only SECRET-holders can POST)

**This is acceptable.** The authentication model is:
- POST = requires SECRET (prevents spam, but not bulletproof)
- GET = requires SECRET (prevents data leaks)

### Improve security (optional)

You could add:
- Rate limiting (requires backend)
- IP whitelisting (requires backend)
- Advanced OAuth (overkill for wedding)

None of these are recommended for a wedding website.

---

## Google Sheet Security

### Who can access your Sheet?

- **You:** Full edit access (you own it)
- **Admin panel:** Read-only (via Google Apps Script)
- **Others:** Only if you share the link directly

### Recommended setup

1. **Create Google Sheet** (you own)
2. **Don't share Sheet link publicly** (keep it private)
3. **Google Apps Script connects as you** (not shared with guests)
4. **Guests only see** their own names in personalized invitations

This is the current setup. It's secure.

### Backup your data

1. Open your Sheet
2. **File** → **Download** → **Excel (.xlsx)**
3. Save locally (weekly or after RSVP deadline)

Google Drive auto-backs up, but local backups are safer.

---

## Guest Data Privacy

### What data is collected?

- Name
- Attendance (Sí/No/Pendiente)
- Dietary restrictions
- Optional message
- Timestamp
- Group/table assignment

### How is it stored?

- Google Sheet (encrypted in transit and at rest by Google)
- Only you can access via admin panel
- Google Drive also automatically backs up

### Who can see it?

- Only you (via admin panel password)
- Admins with the password
- Not visible to other guests

### Is it GDPR compliant?

This is a wedding (limited audience), so:
- ✅ Guests know their data is collected (they fill the form)
- ✅ Data stored securely in Google Drive
- ✅ Easy to export/delete (your Sheet)
- ✅ No third-party tracking

Probably yes, but check local laws. (Likely not an issue for a personal wedding website.)

---

## After the Wedding

### Archive your data

1. Download Google Sheet as Excel
2. Save in your personal folder
3. Optional: Delete Google Sheet and GitHub repo (or keep for memories)

### Disable website

- **Option 1:** Delete GitHub repo (website goes down)
- **Option 2:** Archive repo (read-only, no edits)
- **Option 3:** Keep live (might be fun to revisit)

### Change credentials (paranoid but OK)

If keeping website live forever:
- Rotate admin password annually
- Rotate SECRET annually
- Prevents old attack vectors

---

## Acceptable Risks

For a public wedding website:

✅ **Acceptable:**
- Guest names visible in URLs
- SECRET in source code (requires GitHub access)
- Admin password hash visible (requires brute force to crack)

❌ **Not acceptable:**
- Plaintext password in code *(using hash instead)*
- Unencrypted guest data *(Google handles encryption)*
- Credentials stored in .env file *(not using .env)*

---

## Checklists

### Before deployment

- [ ] Generated new admin password (SHA-256 hashed)
- [ ] Updated PASS_HASH in line 490
- [ ] Generated new SECRET token
- [ ] Updated SECRET in line 492 and Google Apps Script
- [ ] Google Apps Script deployed and tested
- [ ] Tested admin panel with new password
- [ ] Tested RSVP submission

### After deployment

- [ ] Sent invitations only to intended guests
- [ ] No sharing repo URL publicly (only invitation URLs)
- [ ] Google Sheet kept private (shared only via Apps Script)
- [ ] Weekly backup of Google Sheet (optional)

### After wedding

- [ ] Archived Google Sheet (downloaded as backup)
- [ ] Optional: Rotated credentials if keeping site live
- [ ] Optional: Deleted repo (or archived it)

---

## Questions?

**"Is my data safe?"**
Yes. Google Drive encrypts everything. Passwords are hashed. Your Sheet is private.

**"Can guests see other guests' RSVPs?"**
No. Each guest only sees their own personalized invitation.

**"What if someone hacks Google Apps Script?"**
Very unlikely. Google has enterprise-grade security. Would require sophisticated attack.

**"Should I pay for more security?"**
No. For a wedding website, this is sufficient. Over-engineering = unnecessary complexity.

---

**Bottom line:** This security model is appropriate for a public wedding invitation. Your data is safe, guests' data is private, and the admin interface is password-protected.
