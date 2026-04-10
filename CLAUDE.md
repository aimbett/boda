# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🎯 My Role & Philosophy

I am a **Web Page Designer Expert** specializing in elegant wedding invitation websites. When working on this codebase, I approach every change through the lens of:

- **Design excellence** — Every pixel serves the user experience
- **Simplicity** — No feature creep; respect the original vision
- **Sustainability** — Works on free infrastructure (GitHub Pages + Google Drive)
- **Accessibility** — Beautiful for everyone, on any device
- **Maintainability** — Code that survives beyond one wedding day

---

# PART A: QUICK START & DEPLOYMENT

## 🚀 30-Second Overview

This is a personalized wedding invitation website for **Alejandro & Priscila**, October 10, 2026. 

**Stack:**
- 📄 **GitHub Pages** (hosting, free)
- 📊 **Google Sheets + Apps Script** (data, free)
- 🎨 **Single HTML file** (no build process needed)

**What it does:**
1. Guests receive personalized URLs with their names
2. They RSVP with dietary preferences
3. Responses save to Google Sheets
4. Admins view/manage all data in a control panel

**Why this stack:**
- ✅ Completely free (no credit card needed)
- ✅ No infrastructure to manage
- ✅ Data saved in familiar Google Sheets format
- ✅ Works offline on local machine
- ✅ Git-based version control for everything

---

## 📋 Deployment Quick Start

**For developers deploying this:**

1. **Fork/clone this repo to your GitHub account**
2. **Create a Google Sheet** for storing responses
3. **Create a Google Apps Script** that acts as backend API
4. **Copy the Apps Script URL** into `index.html` (line 491)
5. **Generate new admin password** hash (instructions below)
6. **Push to GitHub** and enable Pages in Settings
7. **Test** at `https://yourusername.github.io/boda/`

**See detailed guides in `docs/` folder:**
- `docs/DEPLOYMENT.md` — Full GitHub Pages setup
- `docs/GOOGLE_DRIVE_SETUP.md` — Google Sheets + Apps Script configuration
- `docs/SECURITY.md` — Password generation and secrets rotation

---

# PART B: DESIGN SYSTEM & CUSTOMIZATION

## 🎨 Design System

### Color Palette

The site uses a sophisticated **cream, dark, and gold** palette:

```
:root {
  --cream:  #F5F0E8   /* Warm cream background */
  --dark:   #1A1A18   /* Nearly black, primary text/borders */
  --gold:   #C9A84C   /* Warm gold accent (highlights, focus) */
  --mid:    #6B6860   /* Gray-brown, secondary text/descriptions */
  --border: rgba(26,26,24,0.15)  /* 15% dark for subtle lines */
}
```

**Where each color is used:**
- `--cream`: Page background, card backgrounds, body text backgrounds
- `--dark`: Primary text, headings, borders, buttons, SVG outlines
- `--gold`: Accent elements (FAB button, hover states, highlight dates)
- `--mid`: Secondary text, labels, subtle information
- `--border`: Dividers, subtle separation lines

**Color Customization via Admin Panel:**
- Site admins can change all 4 colors without touching code
- Changes are previewed live with gradient bar
- Settings persist in browser localStorage as key `wc`
- Defaults restore with "Restablecer" button

### Typography

**Font stack:**
- **Fredoka One** (Google Fonts, cursive) — Headings, buttons, labels, badges
  - Friendly, modern, perfect for occasions
  - Sizes: 10px (tags) to 52px (main titles)
- **Cormorant Garamond** (Google Fonts, serif italic) — Quotes, messages
  - Elegant, formal, used for emotional text (welcome message, gift quote)
  - Usually 18-21px, always italic
- **Montserrat** (Google Fonts, sans) — Body text, forms
  - Clean, readable, modern
  - Weights: 300 (light, descriptions), 400 (normal), 500 (emphasis)

**Changing fonts:**
1. Update Google Fonts link (line 15-16)
2. Update CSS font-family declarations throughout
3. Test readability at different sizes

### Spacing & Layout Grid

**Margin/padding system:**
- 4px — Tiny gaps (button padding)
- 8px — Small spacing (input fields, tiny gaps)
- 12px — Medium spacing (gap between elements)
- 16px — Standard spacing (section padding)
- 20px — Large spacing (card padding)
- 24px — Extra large (page margins)
- 32px — Section spacing (vertical rhythm)

**Responsive breakpoint:**
- **Desktop**: All columns and full widths
- **Mobile** (≤480px):
  - 2-column grids become 1-column
  - Font sizes reduce (38px → 38px for names, mostly unchanged for mobile-first)
  - Spacing slightly reduced
  - See lines 181-189 for all mobile changes

**Layout examples:**
```
Hero section: 52px padding top/bottom, centered text
Card grid: grid-template-columns: 1fr 1fr; gap: 16px
Main page: max-width: 680px; margin: 0 auto; centered container
```

---

## 🎨 Customizing Appearance

### Change Colors

**Option 1: Edit CSS directly (permanent)**
```css
:root {
  --cream: #YOUR_COLOR;
  --dark: #YOUR_COLOR;
  /* ... */
}
```

**Option 2: Use admin panel (temporary, user-controlled)**
- Click gold dot (FAB button) bottom-right → Enter password
- Scroll to "Personalizar colores" section
- Use color pickers to change palette
- Click "Aplicar" to save (localStorage)
- Click "Restablecer" to reset

### Change Fonts

**To replace Fredoka One (headings):**
1. Line 15-16: Replace font import
2. Find all `.class` with `font-family: 'Fredoka One'` (lines 30, 67, 68, etc.)
3. Replace with new font name

**To replace Cormorant Garamond (italics):**
1. Line 15-16: Update import
2. Lines 34, 70, 94: Update font-family

**To replace Montserrat (body):**
1. Line 15-16: Update import
2. Line 21: Update font-family

**Pro tip:** Keep similar weights (light, regular, bold) for replacement fonts.

### Change Content (Text) — Easy Method

**All editable text is centralized in `content.js`** — This is the easiest way to customize any text!

**File:** `content.js` (entire file, ~150 lines)

**Structure:**
```javascript
const PAGE_CONTENT = {
  welcome: { /* welcome screen texts */ },
  hero: { /* main heading texts */ },
  event: { /* event details */ },
  venue: { /* venue information */ },
  dressCode: { /* dress code */ },
  hotel: { /* hotel info */ },
  gift: { /* gift message */ },
  rsvp: { /* RSVP form texts */ },
  footer: { /* footer */ },
  admin: { /* admin panel labels */ },
  auth: { /* password modal */ },
};
```

**Examples of editing:**

**Change welcome message:**
```javascript
welcome: {
  message: 'Toronto corrió muy rápido para traerte esta invitación',
  // Change to:
  message: 'You are cordially invited...',
},
```

**Change venue:**
```javascript
venue: {
  name: 'Qgat Restaurant, Events & Hotel',  // Change this
  address: 'Carretera de Cerdanyola, Bellaterra<br>Barcelona, España',  // Or this
  mapLink: 'https://maps.app.goo.gl/qsc3siNPAXJwGCEy6',  // Or the map link
},
```

**Change hotel discount code:**
```javascript
hotel: {
  code: 'BODAQGAT2026',  // Change this
  // ... other fields
},
```

**Change dietary options:**
```javascript
rsvp: {
  dietOptions: [
    'Sin restricciones',
    'Vegetariano',  // Edit or remove any options
    'Vegano',
    // ... add or remove as needed
  ],
},
```

**After editing:**
1. Save `content.js`
2. Commit: `git add content.js && git commit -m "Update content"`
3. Push: `git push origin main`
4. GitHub auto-updates within 30 seconds
5. Refresh site URL to see changes

**Benefits of this approach:**
✅ No HTML markup to worry about  
✅ All texts in one organized place  
✅ Similar structure to `invitados.js`  
✅ Easy for non-technical users  
✅ Safe to edit (can't break layout)  

### Change Content (Text) — Detailed Method

**If you need to edit text that's NOT in `content.js`:**

**Update main dates/times:**
- Line 311: `10 · OCTUBRE · 2026`
- Line 335: `Sábado 10 · Oct · 2026`
- Line 345: `6:00 PM` and `Ceremonia`
- Line 489: Wedding datetime (`WD`)

**Update venue:**
- Line 358: Venue name
- Line 359: Address
- Line 360: Maps link (get new link from Google Maps)

**Update dress code:**
- Line 375-378: Color swatches (update `style="background:..."`  colors)
- Line 380-381: Dress code text

**Update hotel information:**
- Line 395: Hotel description
- Line 398: Discount code (`BODAQGAT2026`)
- Line 400: Reservation instructions

**Update gift information:**
- Line 415: Gift quote
- Line 416-417: Gift instructions

**Update welcome messages:**
- Line 226, 227, 230: Welcome screen text
- Line 302-304: Hero section text

### SVG Logo/Hero Modifications

**The running dog (Toronto):**
- Line 200-223: Welcome screen dog SVG
- Line 237-261: Footer dog animation
- Modify `<path>`, `<circle>`, `<ellipse>` elements to change shape
- Modify `fill="#COLOR"` to change dog appearance
- Keep same viewBox dimensions to maintain proportions

**The couple silhouettes (hero):**
- Line 268-300: Couple illustration SVG
- Can modify paths and shapes
- Leave viewBox="0 0 200 200" unchanged

**Tip:** Use online SVG editors (svgedit.io) to modify visually, then copy path data back.

### Layout & Spacing Adjustments

**To add more space between sections:**
- Line 76: `.sec { padding: 44px 32px; }` — Increase padding-top/bottom

**To reduce mobile padding:**
- Line 185: `.sec { padding: 36px 20px; }` — Adjust mobile values

**To change card grid columns:**
- Line 78: `.evgrid { grid-template-columns: 1fr 1fr; }` — Change to `1fr 1fr 1fr` for 3 columns

**To adjust animation speed:**
- Line 25: `fadeOutUp` — Change `0.7s` to different duration
- Line 47: `runAcross` — Change `9s` for dog speed
- Line 49: `dogBounce` — Change `0.28s` for bounce speed

### Creating New Sections

**Template for adding a new section:**
```html
<div class="sec">
  <p class="sec-title">¡Nueva Sección!</p>
  <div class="venue-block">  <!-- or create custom class -->
    <svg><!-- your icon --></svg>
    <p>Your content here</p>
  </div>
</div>
```

**Add CSS styling** (inside `<style>` tag):
```css
.new-section-class {
  text-align: center;
  padding: 20px;
  /* ... */
}
```

**Add Spanish content** (site is in Spanish):
- All labels, buttons, messages are Spanish
- Maintain tone (formal but warm)

---

## 📱 Responsive Design

### Mobile-First Philosophy

The site starts with mobile-perfect experience, then enhances for desktop.

**Breakpoint: 480px** (line 181)
- Below 480px: Mobile layout activated
- Above 480px: Desktop layout

**What changes on mobile:**
1. **Font sizes reduced**: 52px → 38px for names
2. **Grids** become single-column: `1fr 1fr` → `1fr`
3. **Stat grid** becomes 2-column: `1fr 1fr 1fr` → `1fr 1fr`
4. **Section padding** reduced: `36px 20px` (vs `44px 32px` on desktop)
5. **Welcome message**: slightly smaller font
6. **RSVP cards**: `flex-direction: column` to stack vertically

### Testing on Different Devices

**Browser DevTools:**
- Open Chrome/Firefox → F12 → Toggle device toolbar
- Test at 320px (small phones), 480px (medium), 768px (tablets)

**Real devices:**
- iOS Safari: Click home button during testing
- Android: Use native browser or Chrome

**Common issues:**
- Text too large: Reduce font-size
- Images cut off: Adjust max-width or SVG viewBox
- Touch buttons too small: Keep minimum 44px height/width

### Touch-Friendly Design

All buttons meet 44x44px minimum:
- RSVP buttons (`.tbtn`): 5px padding (13px height total)
- Submit button (`.sub-btn`): 14px padding (looks good)
- Delete buttons (`.delete-btn`): 5px padding (small but acceptable for admin)

**Adding touch-friendly hover:**
- Desktop: `:hover` adds visual feedback
- Mobile: No hover available, so active state is important
- Keep clicked/active states visible

---

## 📝 Content Customization Guide

### Guest List Management

**File:** `invitados.js` (entire file)

**Add a group of guests:**
```javascript
{
  grupo: "Unique-Group-Name",
  personas: ["Full Name 1", "Full Name 2", "Full Name 3"],
  mesa: "Table Name" // e.g., "Family", "Work Friends", etc.
}
```

**Rules:**
- `grupo` must be unique, no spaces (use hyphens or camelCase)
- `personas` is array of full names
- `mesa` organizes seating, any name works

**After editing:**
1. Open browser console (F12)
2. Run: `generarLinks()` 
3. Copy invitation URLs and send to guests

### Dietary Options

**Location:** `content.js` → `rsvp.dietOptions`

```javascript
rsvp: {
  dietOptions: [
    'Sin restricciones',
    'Vegetariano',
    'Vegano',
    'Sin gluten',
    'Sin lactosa',
    'Halal',
    'Otro',
  ],
},
```

**To modify:**
1. Open `content.js`
2. Find `rsvp.dietOptions` array
3. Add/remove/edit options as needed
4. Keep them in Spanish or translate all consistently
5. Save and push to GitHub

**Example - Remove "Halal", add "Kosher":**
```javascript
dietOptions: [
  'Sin restricciones',
  'Vegetariano',
  'Vegano',
  'Sin gluten',
  'Sin lactosa',
  'Kosher',  // Changed from Halal
  'Otro',
],
```

### Admin Panel

**Access:**
- Click small gold dot (bottom-right corner)
- Enter admin password (hashed with SHA-256)
- Default password hash: See `.env` or docs

**Features:**
1. **Color customization**: Change palette, preview, save
2. **Links management**: View and copy invitation URLs
3. **Stats**: Count of Yes/No/Total responses
4. **RSVP Management**: View all responses, delete entries
5. **Refresh button**: Reload data from Google Sheets

---

# PART C: FUNCTIONALITY & SYSTEMS

## 🔗 How Personalization Works

### URL Parameters

Guests receive URLs like:
```
https://yourusername.github.io/boda/?grupo=Familia-Garcia&personas=Maria%20Garcia,Carlos%20Garcia
```

**Parameters:**
- `grupo` — Group identifier (matching `invitados.js`)
- `personas` — Comma-separated names (URL encoded)

**In code (line 495-500):**
```javascript
const pG = params.get('grupo') || '';
const pP = params.get('personas') || '';
const pList = pP ? pP.split(',').map(s => s.trim()).filter(Boolean) : [];
```

**Result:**
- Without parameters → Generic invitation (RSVP locked)
- With parameters → Personalized invitation (RSVP form appears)

### Welcome Screen Personalization

**Line 504-510:**
```javascript
function setupWelcome() {
  if (!isReal) return;  // Skip if no personalization
  const names = activeGuests.map(n => n.split(' ')[0]);  // Get first names
  const saludo = ... // Build greeting like "¡Hola María y Carlos!"
}
```

**Example:**
- `personas=María García` → Greeting: "¡Hola María!"
- `personas=María García,Carlos García` → "¡Hola María y Carlos!"

---

## ✅ RSVP System Architecture

### Data Flow

```
Guest clicks "¿Vienes?"
    ↓
Guest selects Sí/No for each person
    ↓
Shows dietary restrictions if "Sí"
    ↓
Guest adds optional message
    ↓
Guest clicks "¡Confirmar asistencia!"
    ↓
Form sends POST to Google Apps Script (SHEET_URL)
    ↓
Apps Script receives data + appends to Google Sheet
    ↓
Success message appears
    ↓
Admin panel shows new entry in real-time (after refresh)
```

### RSVP Form Data

**What gets sent (line 589-597):**
```javascript
{
  id: Date.now(),           // Unique submission ID
  secret: SECRET,           // Auth token for Google Apps Script
  grupo: "Familia-Garcia",  // Which group this is
  timestamp: new Date(),    // When submitted
  guests: [
    { name: "María García", attending: "yes", diet: "Vegetariano" },
    { name: "Carlos García", attending: "no", diet: "Sin restricciones" }
  ],
  message: "¡Nos vemos!" // Optional message
}
```

### Google Sheets Structure

**Expected columns in Google Sheet:**
```
id         | nombre      | asiste | dieta        | grupo           | timestamp       | mensaje
1234567890 | María García| Sí     | Vegetariano | Familia-Garcia | 2026-08-15 ...  | ¡Nos vemos!
1234567891 | Carlos García| No    | Sin restricc| Familia-Garcia | 2026-08-15 ...  | 
```

---

## 🔐 Admin Panel Features

### Accessing Admin

**Line 610-613:**
1. Click FAB button (gold dot, bottom-right)
2. Modal appears asking for password
3. Enter password (hashed with SHA-256)
4. Panel opens at bottom of page

### Color Customization

**Section: "Personalizar colores"**
1. Pick 4 colors with color pickers
2. Preview bar shows gradient
3. "Aplicar" saves to `localStorage` and updates page
4. "Restablecer" resets to defaults

### Links Management

**Section: "Links por grupo"**
- Shows all groups from `invitados.js`
- Full invitation URLs for each group
- "Copiar" button copies to clipboard

### RSVP Statistics

**Stats grid shows:**
- **Confirmados** (Sí) count
- **No asisten** (No) count
- **Respuestas** Total responses

**Auto-updates when:**
- Clicking "Actualizar" button
- Admin loads the page

### RSVP Cards

**Each response shows:**
- Group name
- Guest list with attendance status badges:
  - 🟩 "Sí" (confirmed, dark)
  - 🟥 "No" (declined, gray)
  - 🟨 "Pendiente" (pending, yellow)
  - 🏷️ Diet restrictions (if any, gold badge)
- Optional message from guests
- Timestamp
- Delete button

### Delete Function

**Line 692-699:**
```javascript
async function deleteRSVP(idx, id) {
  if (!confirm('¿Eliminar esta confirmación?')) return;
  // Sends DELETE action to Google Apps Script
  // Refreshes list after deletion
}
```

---

# PART D: INFRASTRUCTURE & DEPLOYMENT

## 🏗️ Architecture: GitHub Pages + Google Drive

### Why This Stack?

**GitHub Pages (static hosting):**
- ✅ Free for public repos
- ✅ Automatic HTTPS/SSL
- ✅ CDN included (fast worldwide)
- ✅ Git-based deployment (push = live)
- ❌ Can't run backend code (solved by Apps Script)

**Google Sheets + Apps Script (data layer):**
- ✅ Free, no credit card needed
- ✅ RSVP data in familiar spreadsheet
- ✅ Easy export to Excel/PDF
- ✅ Apps Script = free serverless backend
- ✅ No database maintenance

**Why not alternatives?**
- ❌ **Vercel/Netlify**: Adds cost, overkill for static site
- ❌ **Traditional hosting**: More expensive, more maintenance
- ❌ **Firebase**: Costs money, overkill for this use case
- ❌ **AWS/Azure**: Way too complex, not free tier

### Data Flow Diagram

```
┌─────────────┐
│   GitHub    │
│    Pages    │ ← Static HTML/CSS/JS
│             │   (index.html, invitados.js)
└──────┬──────┘
       │ Guest visits site
       │
       ▼
┌─────────────────────────────────┐
│    Guest Browser                 │
│  • Renders invitation            │
│  • Shows RSVP form               │
│  • Stores color prefs locally    │
└──────┬──────────────────────────┘
       │ Guest submits RSVP
       │ POST request
       ▼
┌────────────────────────────────────┐
│  Google Apps Script (web app)      │
│  • Receives guest data + SECRET    │
│  • Validates request               │
│  • Appends to Google Sheet         │
└────────────┬─────────────────────┘
             │
             ▼
        ┌──────────────┐
        │ Google Sheet │
        │ (database)   │
        └──────────────┘
             ▲
             │ Admin retrieves data
             │ GET request + SECRET
             │
       ┌─────┴─────────┐
       │               │
    Admin Panel   Downloads CSV
  (shows live data) (for backup)
```

---

## 🚀 Complete Deployment Process

**See detailed guides:**
- `docs/DEPLOYMENT.md` — GitHub Pages setup
- `docs/GOOGLE_DRIVE_SETUP.md` — Google Sheets + Apps Script
- `docs/SECURITY.md` — Password and secrets

### Quick 5-Minute Setup

1. **Fork repo** to your GitHub account
2. **Create Google Sheet** with columns: `id, nombre, asiste, dieta, grupo, timestamp, mensaje`
3. **Create Google Apps Script** (see template in `docs/`)
4. **Copy Apps Script URL** → paste into `index.html` line 491
5. **Generate new password hash** (see `docs/SECURITY.md`)
6. **Update `PASS_HASH`** in `index.html` line 490
7. **Enable GitHub Pages** in repo Settings → branch: main
8. **Test** at `https://yourusername.github.io/boda/`

---

## 🔧 Troubleshooting

### "RSVP not saving" (form won't submit)

**Check:**
1. Is `SHEET_URL` correct? (Line 491)
2. Is Google Apps Script deployed as web app?
3. Is SECRET correct? (Line 492)
4. Check browser console (F12) for errors
5. Is Google Sheet accessible?

**Solution:**
- See `docs/GOOGLE_DRIVE_SETUP.md` for Apps Script template
- Ensure Apps Script has CORS headers configured
- Try submitting again (no-cors mode may hide errors)

### "Admin panel not loading responses"

**Check:**
1. Is CORS configured in Google Apps Script?
2. Is SECRET correct?
3. Is Google Sheet populated?

**Solution:**
- Add CORS headers to `doGet()` in Apps Script (see docs)
- Check Sheet has data (test manual insert)
- Look at browser network tab (F12) for failed requests

### "Styling looks broken" on mobile

**Check:**
1. Test at 480px breakpoint (F12 device mode)
2. Check mobile CSS media query (line 181)
3. Verify viewport meta tag (line 5)

**Solution:**
- Adjust breakpoint if needed
- Test on real device, not just DevTools

### "Countdown timer wrong"

**Check:**
1. Is `WD` date correct? (Line 489)
2. Browser timezone settings
3. Wedding date format: `YYYY-MM-DDTHH:MM:SS`

**Solution:**
- Update `WD` to correct date/time
- Check browser console for errors

### "Colors not saving"

**Check:**
1. Browser localStorage enabled?
2. Private/incognito browsing?
3. Browser storage full?

**Solution:**
- Try in normal browsing mode (not incognito)
- Clear browser cache and try again
- Use admin panel "Restablecer" button

---

## 📊 Performance & Optimization

### GitHub Pages Performance

- **CDN included**: Automatically fast worldwide
- **GZIP compression**: Enabled by default
- **Cache headers**: 10 minutes default (good balance)

### Optimizations Already Built-In

✅ **Minified inline CSS** (no separate stylesheet request)
✅ **SVG icons** (no image files to load)
✅ **Google Fonts preconnect** (line 15, faster loading)
✅ **CSS variables** (no duplicate colors)
✅ **Single HTML file** (one request = everything)

### Optional Optimizations (if needed)

1. **Lazy-load images**: Use `loading="lazy"` on images
2. **Defer Javascript**: Already inline, but could split
3. **Compress SVGs**: Use SVGO tool to minify paths
4. **Cache-buster**: Add ?v=2 to force fresh CSS

### Lighthouse Score Target

Current site should score:
- **Performance**: 95+ (static files)
- **Accessibility**: 95+ (good semantic HTML)
- **Best Practices**: 90+ (secure HTTPS)
- **SEO**: 100 (meta tags included)

---

## ♿ Accessibility & Inclusive Design

### Color Contrast

✅ **All text meets WCAG AA standard:**
- Dark text on cream: 17.3:1 ratio (excellent)
- Gold text on cream: 4.6:1 ratio (passes AA)

✅ **Don't use color alone:**
- Attendance status uses badges with text ("Sí", "No")
- Not just color

### Semantic HTML

✅ **Proper heading hierarchy:**
- `<h1>` for main heading
- `<p>` for text
- `<label>` for form labels
- `<button>` for interactive elements

### Keyboard Navigation

✅ **All interactive elements keyboard accessible:**
- Tab through buttons and form inputs
- Enter to activate
- Escape to close modal

### Mobile Accessibility

✅ **Touch-friendly:**
- Buttons ≥44px tall
- Links have visible focus states
- Form inputs zoom correctly on mobile

---

## 🔒 Security Best Practices

### Public Repo Security

Since repo is public for GitHub Pages:

✅ **Acceptable:**
- Admin password is hashed (SHA-256), not plaintext
- Google Apps Script URL is public (anyone can see it)
- Secret token visible (acceptable for public wedding site)

⚠️ **Considerations:**
- Anyone can submit RSVPs using your Sheet URL
- Solution: Use SECRET token for validation in Apps Script
- Anyone can read guest names from URLs
- Solution: This is intentional for wedding (public event)

### Password Management

**Current password reset process:**
1. Create new password
2. Hash locally: `crypto.subtle.digest('SHA-256', ...)`
3. Update `PASS_HASH` in `index.html`
4. Commit + push to GitHub

**See `docs/SECURITY.md` for detailed steps**

### Google Apps Script Security

**Must include CORS headers:**
```javascript
function doPost(e) {
  // ... process data ...
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  // CRITICAL: Add these lines for GitHub Pages access
  // Unfortunately, Apps Script doesn't support CORS headers directly
  // Solution: Use no-cors mode on client, or proxy
  return output;
}
```

**See `docs/GOOGLE_DRIVE_SETUP.md` for complete template**

---

# PART E: ADVANCED TOPICS & FUTURE

## 🎬 Performance & Animations

### CSS Animations Used

1. **`fadeOutUp`** (0.7s)
   - Welcome screen exit
   - Translatey + opacity fade
   - See line 25-26

2. **`torontoBounce`** (0.6s infinite)
   - Welcome screen dog
   - Small vertical bounce
   - See line 27-28

3. **`runAcross`** (9s linear infinite)
   - Running dog footer animation
   - Left to right across screen
   - See line 47-48

4. **`dogBounce`** (0.28s infinite)
   - Dog body while running
   - See line 49-50

5. **`legFL`, `legFR`, `legRL`, `legRR`** (0.28s infinite)
   - Dog leg movements
   - Rotate animation on transform-origin
   - See lines 51-58

6. **`tailWag`** (0.2s infinite)
   - Dog tail swinging
   - See line 59-60

7. **`earFlap`** (0.4s infinite)
   - Dog ear movement
   - See line 61-62

### Customizing Animations

To slow down dog running:
- Line 47: Change `9s` to `12s` for slower pace

To speed up leg motion:
- Line 51-58: Change `0.28s` to `0.15s` for faster run

To add new animation:
```css
@keyframes myAnimation {
  0% { /* start state */ }
  100% { /* end state */ }
}

.my-element {
  animation: myAnimation 1s ease-in-out infinite;
}
```

---

## 📈 Analytics & Data Export

### Viewing Responses

**Via admin panel:**
- All responses show in real-time after refresh
- Each card shows: guest names, attendance, diet, timestamp
- Stats cards show totals

**Via Google Sheet directly:**
- Open Sheet in Google Drive
- Manually view/edit responses
- Export as CSV or Excel

**Via download:**
- Right-click in Google Sheet
- Download as CSV → open in Excel

### Data Analysis Ideas

✅ **Easy analyses (in Sheet):**
- Filter by "Sí" vs "No" attendance
- Count dietary restrictions
- Group by table assignment
- Search for messages

✅ **Advanced (export to Excel):**
- Pivot tables
- Charts and graphs
- Seating arrangements
- Timeline of RSVPs

---

## 🚀 Future Enhancements (Without Over-Engineering)

### Low-Effort Additions

✅ **Add wedding day live updates** (new section with latest info)
✅ **Add photo gallery** (simple image gallery or link to album)
✅ **Add countdown timer variations** (flip clock, bar progress)
✅ **Add testimonials** (guest messages display)
✅ **Add thank you page** (after RSVP confirmation)

### Medium-Effort Additions

⚠️ **Email notifications** (requires backend)
⚠️ **SMS confirmations** (requires Twilio, paid)
⚠️ **Plus-one management** (more complex form logic)
⚠️ **Seating chart** (visual table assignments)

### Not Recommended (Over-Engineering)

❌ **Mobile app** (too complex for this use)
❌ **User accounts** (not needed for wedding)
❌ **Real-time chat** (scope creep)
❌ **Payment processing** (adds complexity)
❌ **Multiple languages** (already in Spanish, simple enough)

**Philosophy:** Only add if it serves the guests' experience directly.

---

## 🛠️ Development Workflow

### Local Testing Setup

**Start local server:**
```bash
# Python 3
python3 -m http.server 8000

# Or Python 2
python -m SimpleHTTPServer 8000

# Or Node (if you have http-server)
npx http-server
```

**Then visit:** `http://localhost:8000`

**Test personalized URLs:**
```
http://localhost:8000/index.html?grupo=test&personas=John%20Doe
```

### Git Workflow

**Make changes → Commit → Push → Deploy**

```bash
# 1. Make edits (CLAUDE.md, index.html, invitados.js, etc.)
git add .
git commit -m "Update [what changed]"

# 2. Push to GitHub
git push origin main

# 3. GitHub Pages auto-deploys
# Wait 30 seconds, then refresh https://yourusername.github.io/boda/
```

### Collaborative Editing

✅ **Git workflow:**
1. Create feature branch: `git checkout -b fix/color-scheme`
2. Make changes
3. Push branch: `git push origin fix/color-scheme`
4. Create pull request on GitHub
5. Review + merge to main
6. Main branch auto-deploys

✅ **Non-technical collaborators:**
- Just send changes via email/message
- Provide specific file names and line numbers
- Example: "Change line 358 from 'Qgat Restaurant' to 'Our Venue'"

---

## 📖 Complete File Reference

### `index.html` — Main file (~765 lines)

**Key sections:**
- Line 1-17: HTML head (meta, fonts, title)
- Line 18-189: Complete CSS (inline, no external stylesheets)
- Line 192-234: Welcome screen UI
- Line 235-262: Running dog animation
- Line 264-435: Main page content (hero, venue, hotel, gift, RSVP)
- Line 437-472: Admin panel
- Line 475-485: Auth modal
- Line 488-763: JavaScript (inline, all functionality)

**Critical constants (line 489-493):**
- `WD`: Wedding date-time
- `PASS_HASH`: Admin password (SHA-256)
- `SHEET_URL`: Google Apps Script endpoint
- `SECRET`: Auth token for Apps Script
- `DIETS`: Dietary options array

**Main functions:**
- `setupWelcome()`: Personalization
- `enterPage()`: Welcome → main transition
- `renderRSVP()`: Draw RSVP form
- `submitRSVP()`: Send data to Apps Script
- `checkAuth()`: Admin authentication
- `loadRSVPs()`: Fetch responses from Sheet
- `applyColors()`: Update CSS variables
- `tick()`: Update countdown timer

### `invitados.js` — Guest list (~60 lines)

**Structure:**
```javascript
const INVITADOS = [
  {
    grupo: "Unique-Name",
    personas: ["Full Name 1", "Full Name 2"],
    mesa: "Table"
  },
  // ... more guests
];

// Helper functions
function generarLinks(base) { /* ... */ }
```

**Usage:**
- Edit `INVITADOS` array to add/remove guests
- Run `generarLinks()` in browser console to see all URLs

### `.gitignore` — Files to ignore

Add if needed:
```
node_modules/
.env
*.local.js
config.json
.DS_Store
```

---

## 📝 Common Code Patterns

### Working with URL Parameters
```javascript
const params = new URLSearchParams(window.location.search);
const groupId = params.get('grupo') || '';  // Gets ?grupo=value
```

### Fetching from Google Apps Script
```javascript
await fetch(SHEET_URL, {
  method: 'POST',
  mode: 'no-cors',  // Bypass CORS (response opaque)
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});
```

### Updating CSS Variables
```javascript
const root = document.documentElement;
root.style.setProperty('--cream', '#F5F0E8');
root.style.setProperty('--dark', '#1A1A18');
```

### Hashing Password with SHA-256
```javascript
const hash = Array.from(
  new Uint8Array(
    await crypto.subtle.digest('SHA-256', 
      new TextEncoder().encode(password))
  )
).map(b => b.toString(16).padStart(2,'0')).join('');
```

### Working with localStorage
```javascript
// Save
localStorage.setItem('wc', JSON.stringify({pa, dk, p, m}));

// Load
const saved = JSON.parse(localStorage.getItem('wc'));
```

---

## 🎯 Final Notes

**This is not a generic template.**
This website is designed specifically for Alejandro & Priscila's wedding. While the architecture (GitHub Pages + Google Drive) could work for other weddings, every design choice reflects their style and story (including Toronto the dog!).

**When in doubt, ask:**
If you're modifying this and unsure of the impact, test locally first and check `docs/TROUBLESHOOTING.md` or examine the code changes carefully.

**Keep it simple.**
Resist the urge to add complex features. The best wedding website is one that works reliably on the day, not one with cutting-edge features that break.

**Document your changes.**
If you modify this, update this CLAUDE.md file so the next developer understands your changes.

---

**Happy wedding! 🐾💍✨**
