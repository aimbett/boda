# Troubleshooting Guide

Common problems and their solutions.

---

## Deployment Issues

### "404 Not Found" on GitHub Pages

**Symptom:** Site not accessible at GitHub Pages URL

**Check:**
1. Is repo public? (Settings → Visibility)
2. Is GitHub Pages enabled? (Settings → Pages)
3. Is source set to `main` branch, `/ (root)` folder?
4. Have you waited 60 seconds after enabling?

**Solutions:**
- Verify repo is public (must be for GitHub Pages)
- Re-enable GitHub Pages: Settings → Pages → Select source → Save
- Wait 5 minutes and try again
- Check GitHub status (github.com/status)
- Try in incognito/private mode (clears cache)

---

## RSVP Issues

### "RSVP not saving" (form won't submit)

**Symptom:** Click submit, see success message, but no entry in Google Sheet

**Check:**
1. Is `SHEET_URL` correct? (index.html line 491)
2. Is Google Apps Script deployed?
3. Is `SECRET` correct? (index.html line 492)
4. Is Google Sheet accessible?

**Solutions:**

**First, check the basics:**
```
Google Apps Script URL:
https://script.google.com/macros/s/[SCRIPT_ID]/usercontent

Do you have [SCRIPT_ID]?
```

If not:
1. Go to Google Apps Script
2. Deploy → Manage deployments
3. Copy the full URL from "Latest" deployment
4. Paste into index.html line 491

**Then, verify SECRET:**
```
index.html line 492:
const SECRET = 'torontoboda2026';

Google Apps Script line 5:
const SECRET = 'torontoboda2026';
```

Must be identical.

**If still not working:**
1. Open browser console (F12)
2. Look for network errors
3. Try submitting again
4. Go to Google Sheet manually
5. Check if row appears

**If no row appears:**
- Check Google Apps Script logs:
  - Google Apps Script editor
  - View → Execution log
  - Look for errors
  - Usually: SECRET mismatch or Sheet not found

### "Admin panel" shows error "Error al conectar con el Sheet"

**Symptom:** Admin tries to view responses, gets error message

**Check:**
1. Is `SHEET_URL` correct?
2. Is `SECRET` correct?
3. Does Google Sheet have data?
4. Is Google Apps Script deployed?

**Solutions:**

**Verify CORS configuration:**

The admin panel makes a GET request that requires CORS headers. Current workaround:

1. Open browser console (F12 → Network tab)
2. Check if GET request is being made
3. Look for "CORS" errors

If CORS error:
- Google Apps Script GET endpoint needs CORS headers
- See `docs/GOOGLE_DRIVE_SETUP.md` for CORS configuration
- Or use `no-cors` mode (less reliable but works)

**Verify data exists:**
1. Open your Google Sheet directly
2. Check if rows are present
3. If no rows: RSVP submissions aren't being saved

**Test manually:**
1. Google Apps Script editor
2. Select `testDoGet()` function
3. Click Run
4. Check Execution log for data

---

## Styling Issues

### "Colors look wrong" or "CSS not applying"

**Symptom:** Site looks broken, colors different, text size wrong

**Check:**
1. Hard refresh browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Clear browser cache
3. Try in incognito/private mode
4. Check on different device

**Solutions:**
- GitHub Pages caches CSS for 10 minutes
- Force refresh clears local cache
- Incognito mode bypasses browser cache
- Wait 10 minutes, then refresh

### "Styling breaks on mobile"

**Symptom:** Mobile view looks distorted, unreadable

**Check:**
1. Test at 480px breakpoint (F12 device mode)
2. Verify viewport meta tag is present (line 5 in index.html)
3. Test on real device, not just DevTools

**Solutions:**
- Ensure viewport meta tag exists: `<meta name="viewport" ...>`
- Test at exact 480px breakpoint
- Real device testing shows actual rendering
- Clear mobile browser cache
- Restart phone browser

### "Font doesn't match what I see in mockup"

**Symptom:** Typography looks different, font size/weight wrong

**Check:**
1. Are Google Fonts loading? (check network tab in DevTools)
2. Font-family CSS correct? (should match @import fonts)
3. Browser has internet access? (fonts loaded from CDN)

**Solutions:**
- Check network tab: look for `fonts.googleapis.com` requests
- If fonts not loading: check internet connection
- If fonts loading but wrong: verify font-family in CSS matches import
- Try different browser (check if font works)

---

## Functionality Issues

### "Countdown timer shows wrong time"

**Symptom:** Timer shows negative numbers or wrong countdown

**Check:**
1. Is wedding date/time correct? (index.html line 489)
2. Browser timezone correct?
3. Wedding date in the past? (timer shows "¡Hoy es el gran día!")

**Solutions:**
```javascript
// Check wedding date format
const WD = new Date('2026-10-10T18:00:00');  // Must be this format

// If this date has passed, timer shows finished message
// After October 10, 2026, timer shows: "¡Hoy es el gran día!"
```

To fix:
1. Edit index.html line 489
2. Update date/time: `'YYYY-MM-DDTHH:MM:SS'`
3. Save and push to GitHub
4. Wait 30 seconds for update

### "Personalized invitation not showing"

**Symptom:** Generic locked RSVP shown, even with URL parameters

**Check:**
1. URL has parameters? `?grupo=...&personas=...`
2. Are `grupo` and `personas` values correct?
3. Match `invitados.js` exactly?

**Solutions:**
- Check URL bar: should show full URL with parameters
- Verify spelling matches `invitados.js` exactly (case-sensitive)
- Example: `?grupo=Familia-Garcia&personas=Maria%20Garcia,Carlos%20Garcia`
- URL encode spaces as `%20`
- Use admin panel to copy pre-generated links (easier)

### "Admin password not working"

**Symptom:** Enter password, get "Contraseña incorrecta" error

**Check:**
1. Is `PASS_HASH` correct in index.html line 490?
2. Did you generate hash correctly?
3. Typed password correctly?

**Solutions:**
- Regenerate hash:
  1. Open browser console (F12)
  2. Paste and run: `crypto.subtle.digest('SHA-256', new TextEncoder().encode('YOUR_PASSWORD')).then(h => Array.from(new Uint8Array(h)).map(b => b.toString(16).padStart(2,'0')).join('')).then(console.log)`
  3. Copy the result
  4. Update index.html line 490
  5. Commit and push to GitHub
  6. Test again

### "Admin panel not loading responses" (continued from earlier section)

**Additional steps:**
1. Manually test Google Apps Script:
   - Google Apps Script editor
   - Select `testDoGet()`
   - Click Run
   - Check Execution log for data
   - Check for errors

2. Check browser network tab:
   - F12 → Network tab
   - Refresh admin panel
   - Look for GET request to SHEET_URL
   - Check if it returns 200 or shows CORS error

---

## Data Issues

### "My responses disappeared!"

**Symptom:** Responses were visible, now they're gone

**Causes:**
1. Delete button was clicked by accident
2. Google Sheet accidentally cleared
3. Browser cache issue

**Solutions:**
1. Check Google Sheet directly (may be browser cache)
2. Admin panel → Refresh button
3. If truly deleted, check if Google Drive has version history:
   - Open Google Sheet
   - File → Version history
   - Look for previous version with data
   - Restore if available

4. If lost and no backup:
   - Don't delete from Google Sheet anymore
   - Keep local Excel backups going forward
   - Consider asking guests to resubmit

### "Can't export responses to Excel"

**Symptom:** Excel export not working

**Solutions:**
1. Open Google Sheet directly
2. File → Download → Excel (.xlsx)
3. Save locally
4. Open in Excel/Numbers

If that fails:
1. Download as CSV instead: File → Download → CSV
2. Open in Excel
3. Format as needed

---

## Performance Issues

### "Site loading slowly"

**Symptom:** Takes >5 seconds to load

**Check:**
1. Internet connection speed (run speedtest.net)
2. Browser cache cleared?
3. Too many browser tabs open?

**Solutions:**
- Clear browser cache: Settings → Clear browsing data
- Close other browser tabs
- Restart browser
- Try different network (WiFi vs cellular)
- GitHub Pages usually loads in <1 second
- If very slow: check internet connection

### "Admin panel very slow"

**Symptom:** Admin panel takes >10 seconds to load responses

**Check:**
1. How many responses? (1000+ gets slower)
2. Browser console for errors?
3. Network tab shows slow request?

**Solutions:**
- With <500 responses: Should be instant
- With 500-1000 responses: May take 5-10 seconds (acceptable)
- With 1000+ responses: May need optimization (rare for weddings)

If very slow consistently:
1. Delete old test responses from Google Sheet
2. Refresh admin panel
3. Should speed up

---

## Browser Compatibility

### "Site doesn't work in Safari"

**Symptom:** Buttons don't respond, forms not working, styling broken

**Check:**
1. Safari version (should be recent)
2. JavaScript disabled?
3. Cookies/storage allowed?

**Solutions:**
- Update Safari to latest version
- Settings → Privacy → Check if storage allowed
- Try in different browser
- Check browser console (F12) for errors

### "Site doesn't work in Internet Explorer"

**Answer:** Internet Explorer is not supported (uses modern JavaScript).

**Solution:** Use any modern browser:
- Chrome, Firefox, Safari, Edge (all free)
- IE users: ask them to use Chrome or Firefox

---

## Data Privacy Issues

### "My Google Sheet is visible on Google Drive"

**Check:** Is Sheet shared publicly?

**If yes, that's bad:**
1. Open Sheet
2. Share button (top right)
3. Remove "Anyone with link can view"
4. Set to "Restricted" (only you can access)

**If no:**
- Sheet is private (good)
- Only Google Apps Script can access it
- Guests can't see it

---

## When Nothing Else Works

### "I've tried everything and it still doesn't work"

**Debug checklist:**

1. **Check browser console (F12):**
   - Errors messages?
   - Network failures?
   - Copy error message

2. **Check Google Apps Script logs:**
   - Google Apps Script editor
   - View → Execution log
   - Errors in doPost() or doGet()?

3. **Manually test Google Apps Script:**
   - testDoPost() → Execution log
   - testDoGet() → Execution log
   - Do they work?

4. **Check Google Sheet:**
   - Open directly in Google Drive
   - Does it exist?
   - Does it have columns?
   - Can you manually add a row?

5. **Start from scratch:**
   - Create NEW Google Sheet
   - Create NEW Google Apps Script
   - Deploy as new web app
   - Test testDoPost() manually
   - See if it works
   - If yes: use new URLs
   - If no: there's a systemic issue

6. **Nuclear option:**
   - GitHub: Revert to last known working commit
   - Google: Delete and recreate Sheet/Apps Script
   - Start fresh with new credentials

### "I'm still stuck"

Options:
1. Read `docs/DEPLOYMENT.md` step by step (might have missed something)
2. Check `docs/GOOGLE_DRIVE_SETUP.md` for Google configuration
3. Review `CLAUDE.md` for technical details
4. Try on different device/browser (isolates issues)
5. Wait 24 hours, caches may be issue

---

## Reporting Issues Effectively

If asking for help, include:
1. **What you expected:** "Admin panel should show 5 responses"
2. **What actually happened:** "Admin panel shows error message"
3. **URL:** What exact URL are you visiting?
4. **Browser:** Chrome, Firefox, Safari, Edge?
5. **Device:** Desktop, mobile, tablet?
6. **Steps to reproduce:** Exactly what did you do?
7. **Error messages:** Copy/paste exact errors
8. **Screenshots:** Visual problems are easier to debug

Example:
```
Expected: RSVP form should submit when I click the button
Actually: Button doesn't respond
URL: https://username.github.io/boda/?grupo=test&personas=John
Browser: Chrome on Mac
Error: None visible (console says "RSVP saved" but data never appears in Sheet)
Steps: 1. Click "Sí, voy!", 2. Select diet, 3. Click submit button, 4. See "¡Gracias!" message
```

Much easier to help with this info!

---

## Getting Help

1. **Check this guide first** (you probably found your answer)
2. **Check documentation**: README.md, CLAUDE.md, docs/
3. **Check other docs**: DEPLOYMENT.md, GOOGLE_DRIVE_SETUP.md
4. **Try Google it**: "GitHub Pages [issue]" or "Google Apps Script [issue]"
5. **Try different browser**: Rules out browser-specific issues
6. **Wait 24 hours**: Caches/propagation may resolve
7. **Start fresh**: Create new GitHub repo, new Google Sheet

---

## Prevention

To avoid most issues:

✅ **Before deployment:**
- Test locally (python3 -m http.server 8000)
- Test RSVP submission (check Google Sheet)
- Test admin panel (view responses)
- Test mobile view
- Test all guest links

✅ **After deployment:**
- Keep Google Sheet backed up (weekly Excel download)
- Test personalized links before sending
- Don't delete Google Apps Script (keep current version)
- Don't rename Google Sheet
- Keep documentation handy

✅ **Ongoing:**
- Monitor Google Sheet for new responses
- Check admin panel daily until wedding
- No code changes needed after initial setup
- Just manage data (add/delete responses as needed)

---

**Still need help?** Check the full documentation or contact technical support.
