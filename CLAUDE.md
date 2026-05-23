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
- 📄 **GitHub Pages** (hosting, free) — live at `aimbett.github.io/boda/` via CNAME
- 📊 **Google Sheets + Apps Script** (data, free)
- 🎨 **Single HTML file** (no build process needed)
- 📁 **`content.js`** — all editable strings centralized here
- 📋 **`invitados.js`** — guest list with URL generator

**What it does:**
1. Guests receive personalized URLs with their names
2. They RSVP with dietary preferences (multiple selection via checkboxes)
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

1. **Fork/clone this repo to your GitHub account**
2. **Create a Google Sheet** for storing responses
3. **Create a Google Apps Script** that acts as backend API
4. **Copy the Apps Script URL** into `index.html` (line 563)
5. **Generate new admin password** hash (instructions in `docs/SECURITY.md`)
6. **Push to GitHub** and enable Pages in Settings
7. **Test** at `https://yourusername.github.io/boda/`

**Detailed guides in `docs/` folder:**
- `docs/DEPLOYMENT.md` — Full GitHub Pages setup
- `docs/GOOGLE_DRIVE_SETUP.md` — Google Sheets + Apps Script configuration
- `docs/SECURITY.md` — Password generation and secrets rotation
- `docs/INFRASTRUCTURE.md` — Architecture overview
- `docs/TROUBLESHOOTING.md` — Common issues and fixes

---

# PART B: DESIGN SYSTEM & CUSTOMIZATION

## 🎨 Design System

### Color Palette

The site uses a **sky blue and dark navy** palette (customizable via admin panel):

```
:root {
  --cream:  #F0F8FF   /* Sky blue background */
  --dark:   #1A3A52   /* Dark navy, primary text/borders */
  --gold:   #0078D4   /* Accent blue (buttons, focus, highlights) */
  --mid:    #5B7FA6   /* Medium blue, secondary text */
  --border: rgba(26,58,82,0.15)  /* 15% dark for subtle lines */
}
```

**Color usage:**
- `--cream`: Page background, card backgrounds
- `--dark`: Primary text, headings, borders, buttons
- `--gold`: Accent elements (FAB button, hover states, copy feedback)
- `--mid`: Secondary text, labels, subtle information
- `--border`: Dividers, subtle separation lines

**Note:** The `--gold` name is a CSS convention kept from the original design; the current value is a blue accent (`#0078D4`), not gold.

**Color Customization via Admin Panel:**
- Click FAB dot (bottom-right) → Enter password
- "Personalizar colores" section — live preview bar
- Settings persist in `localStorage` as key `wc`
- Defaults restore with "Restablecer" button

### Typography

- **Fredoka One** (Google Fonts, cursive) — Headings, buttons, labels, badges
- **Cormorant Garamond** (Google Fonts, serif italic) — Quotes, welcome message
- **Montserrat** (Google Fonts, sans) — Body text, forms (weights 300/400/500)

Font imports are on `index.html` line 16.

### Responsive Breakpoint

**Mobile (≤480px)** — line 196:
- `hero-names`, `welcome-names`: 52px → 38px
- `evgrid`: 2-column → 1-column
- `stats-grid`: 3-column → 2-column
- `sec` padding: `44px 32px` → `36px 20px`
- `rsvp-card`: row → column layout
- `admin-panel` padding: 32px → 20px
- `.toronto-celebrating`: `right: 20px` → `right: 10px`

---

## 🐾 Toronto Animations

Toronto (the dog mascot) appears in **five** distinct positions:

| Location | Class | Animation | Duration |
|---|---|---|---|
| Welcome screen | `.welcome-toronto` | `torontoBounce` (bounce up/down) | 0.6s infinite |
| Footer runner | `.toronto-runner` | `runAcross` (left → right) + leg/tail/ear | 9s infinite |
| Hero section (right side) | `.toronto-celebrating` | `torontoJump` (jump) | 0.8s infinite |
| Gift section | `.toronto-eating` | `torontoChew` (subtle squish) | 0.8s infinite |
| Below RSVP | `.toronto-sleeping` | `torontoSleep` (slow float) | 2s infinite |

The runner dog uses sub-animations: `dogBounce`, `legFL/FR/RL/RR` (0.28s), `tailWag` (0.2s), `earFlap` (0.4s).

**SVG structure:** Each Toronto instance is a standalone inline SVG (`viewBox="0 0 110 78"`, or `0 0 100 68` for the runner). The sleeping variant has closed-eye paths and `Z` text bubbles as `<text>` elements.

---

## 📝 Content Customization — Easy Method

**All editable text lives in `content.js`** (~185 lines). This is the right place to change almost everything.

**Structure:**
```javascript
const PAGE_CONTENT = {
  welcome: { tag, headline, headlinePersonalized, names, message,
             messagePersonalized, submessage, submessagePersonalized,
             locationSubtitle },
  hero: { arch, names, fullNames, date, countdownLabels },
  event: { title, date: { label, value }, time: { label, value } },
  venue: { title, name, address, mapButtonText, mapLink },
  dressCode: { title, text, emphasis },
  hotel: { title, intro, codeLabel, code, instructions },
  gift: { title, quote, message, emphasis },
  rsvp: { title, locked, form, success, plusOne, dietOptions },
  footer: { opening, signature },
  admin: { panelTitle, colors, links, stats, confirmations },
  auth: { title, subtitle, placeholder, error, loginBtn, cancelBtn },
  states: { loading, error },
};
```

**After editing `content.js`:**
```bash
git add content.js && git commit -m "Update content" && git push origin main
```
GitHub Pages auto-deploys within ~30 seconds.

### Current Key Values

| Field | Current Value |
|---|---|
| `hero.fullNames` | "Los Papás de Toronto José" |
| `hero.arch` | "Se casan!" |
| `event.title` | "A lo que vinimos, ¿Cuándo es La Fiesta?" |
| `venue.address` | "Av. de la Via Augusta, 51, 08174 Sant Cugat del Vallès, Barcelona" |
| `hotel.code` | "BODAQGAT2026" |
| `footer.opening` | "Con amor y besos Toronto," |
| `welcome.locationSubtitle` | "Sábado 10 Octubre · Qgat Hotel · Sant Cugat-Barcelona" |

### Dietary Options

In `content.js` → `rsvp.dietOptions` (currently):
```javascript
dietOptions: [
  'Sin restricciones',
  'Vegetariano',
  'Vegano',
  'Sin gluten',
  'Sin lactosa',
  'Otro',
],
```

Guests select via **checkboxes** (multiple allowed). Selecting "Otro" reveals a text input. Saved to Google Sheet as comma-separated string, e.g. `"Vegetariano, Sin gluten"`.

---

## 📝 Content Customization — Direct HTML Method

For things not in `content.js`, key locations in `index.html`:

| What to change | Line(s) |
|---|---|
| Wedding date/time constant | 561 (`WD`) |
| Admin password hash | 562 (`PASS_HASH`) |
| Google Apps Script URL | 563 (`SHEET_URL`) |
| Secret token | 564 (`SECRET`) |
| Hero couple photo | 281 (`assets/icons/couple_toronto.png`) |
| Date card HTML | 343 |
| Time card HTML | 353 |
| Venue section HTML | 358–368 |
| Hotel booking link href | 412 |
| RSVP section | 465–468 |
| Footer section | 497–505 |

---

## 🖼️ Assets

**`assets/icons/`** contains:
- `couple_toronto.png` — Photo of Ale & Pri with Toronto (200×200px, used in hero `<img>`)
- `toronto-lineart.svg` — Line art dog (200×180px)
- `couple-silhouette.svg` — Couple silhouette (200×200px, not currently embedded in main page)
- `calendar-lineart.svg` — 28×28px calendar icon
- `clock-lineart.svg` — 28×28px clock icon
- `location-lineart.svg` — 60×60px map pin
- `dressCode-lineart.svg` — 80×70px dress code illustration
- `hotel-lineart.svg` — 60×52px hotel building
- `gift-lineart.svg` — 60×56px gift box

The SVG icons embedded directly in `index.html` (calendar, clock, location, dress code, hotel, gift) use stroke `#1A1A18` with no fill — these are separate from the `assets/` folder copies.

---

# PART C: FUNCTIONALITY & SYSTEMS

## 🔗 How Personalization Works

Guests receive URLs like:
```
https://yourusername.github.io/boda/?grupo=Familia-Garcia&personas=Maria%20Garcia,Carlos%20Garcia
```

**In code (lines 567–575):**
```javascript
const params = new URLSearchParams(window.location.search);
const pG = params.get('grupo') || '';
const pP = params.get('personas') || '';
const pList = pP ? pP.split(',').map(s => s.trim()).filter(Boolean) : [];
const isReal = pG.length > 0 && pList.length > 0;
```

- Without parameters → Generic invitation (RSVP locked, shows padlock)
- With parameters → Personalized invitation (RSVP form appears)

### Welcome Screen Personalization

`setupWelcome()` (line 578) runs on page load:
- Replaces `+1` with "acompañante" in greeting display names
- Adjusts `headline`/`message`/`submessage` between singular and plural forms from `content.js`
- Builds greeting: `"¡Hola María y Carlos!\n{headlinePersonalized}"`

### Plus-One Handling

If a guest's name is exactly `'+1'` or ends with `'+1'`:
- `hasPlusOne` flag is set (line 575)
- A hidden companion block (`#plus-one-block`) appears when that guest selects "Sí"
- Companion can enter their own name and dietary restrictions
- Data merges back into the `guests` array on submit

---

## ✅ RSVP System

### Data Flow

```
Guest clicks "¿Vienes?"
    ↓
Guest selects Sí/No for each person
    ↓
Dietary checkboxes appear for "Sí" attendees (multiple selection)
    ↓
Optional: companion details if +1 accepted
    ↓
Guest adds optional message
    ↓
"¡Confirmar asistencia!" → POST to SHEET_URL (no-cors)
    ↓
Apps Script appends to Google Sheet
    ↓
Success message replaces form
```

### What Gets Sent (line 901)

```javascript
{
  id: Date.now(),
  secret: SECRET,
  grupo: activeGroup,
  timestamp: new Date().toLocaleString('es-ES'),
  guests: [
    { name: "María García", attending: "yes", diet: "Vegetariano, Sin gluten" },
    { name: "Carlos García", attending: "no", diet: "Sin restricciones" }
  ],
  message: "¡Nos vemos!"
}
```

Diet is comma-separated when multiple restrictions are selected. "Otro" is replaced by the custom text input value before sending.

### Google Sheets Columns

```
id | nombre | asiste | dieta | grupo | timestamp | mensaje
```

---

## 🔐 Admin Panel

**Access:** Click FAB (10×10px dot, bottom-right, `z-index: 1500`) → enter password.

Password hashed with SHA-256 via `crypto.subtle.digest`. Hash stored at line 562 (`PASS_HASH`).

**Sections:**
1. **Personalizar colores** — 4 color pickers with live preview bar, Apply/Reset
2. **Links por grupo** — All groups from `invitados.js` with copy-to-clipboard URLs
3. **Stats grid** — Confirmed / Declined / Total counts
4. **Confirmaciones** — RSVP cards with delete button; loaded via GET to `SHEET_URL?action=get&secret=...`

---

# PART D: FILE REFERENCE

## File Structure

```
boda/
├── index.html          # Main file (~1075 lines) — all UI + all JS
├── content.js          # All editable strings (~185 lines)
├── invitados.js        # Guest list + link generator (~110 lines)
├── CNAME               # Custom domain config
├── CLAUDE.md           # This file
├── README.md
├── assets/
│   └── icons/
│       ├── couple_toronto.png       # Hero photo (used via <img>)
│       ├── couple-silhouette.svg    # Not currently in main page
│       ├── toronto-lineart.svg
│       ├── calendar-lineart.svg
│       ├── clock-lineart.svg
│       ├── location-lineart.svg
│       ├── dressCode-lineart.svg
│       ├── hotel-lineart.svg
│       ├── gift-lineart.svg
│       └── README.md
└── docs/
    ├── DEPLOYMENT.md
    ├── GOOGLE_DRIVE_SETUP.md
    ├── INFRASTRUCTURE.md
    ├── SECURITY.md
    └── TROUBLESHOOTING.md
```

## `index.html` Section Map (~1075 lines)

| Lines | Content |
|---|---|
| 1–16 | HTML head (meta, OG tags, Google Fonts) |
| 17–205 | All CSS (inline, no external stylesheet) |
| 19 | `:root` CSS variables (colors) |
| 22–38 | Welcome screen styles |
| 40–43 | FAB fixed button |
| 45–62 | Toronto runner animations |
| 64–77 | Toronto celebrating/eating/sleeping keyframes |
| 79–183 | Main page, cards, RSVP, admin, modal styles |
| 196–204 | Mobile media query (≤480px) |
| 207–247 | Welcome screen UI + bouncing Toronto SVG |
| 249–275 | Running dog footer animation SVG |
| 277–544 | Main page (`#main-page`, hidden until `enterPage()`) |
| 280–325 | Hero section (photo + countdown + celebrating Toronto) |
| 327–355 | Event section (date + time cards) |
| 358–368 | Venue section |
| 371–391 | Dress code section |
| 393–413 | Hotel section |
| 416–463 | Gift section (gift icon + eating Toronto) |
| 465–468 | RSVP section container |
| 470–495 | Sleeping Toronto |
| 497–505 | Footer |
| 508–543 | Admin panel |
| 546–556 | Auth modal |
| 558–559 | `<script>` tags loading `invitados.js` and `content.js` |
| 560–1072 | All JavaScript (inline `<script>`) |
| 561–565 | Constants: `WD`, `PASS_HASH`, `SHEET_URL`, `SECRET`, `DIETS` |
| 567–575 | URL param parsing, `isReal`, `activeGuests`, state vars |
| 578–590 | `setupWelcome()` |
| 592–691 | `populateContent()` — maps `PAGE_CONTENT` keys to DOM IDs |
| 693–701 | `enterPage()` — welcome → main transition (700ms fade) |
| 703–827 | `dietSelect()`, `dietSelectPlusOne()`, `renderRSVP()` |
| 829–855 | `setG()` — toggle yes/no, show/hide diet panel and +1 block |
| 857–915 | `submitRSVP()` — build payload, POST no-cors |
| 918–950 | Admin auth: FAB click, `checkAuth()`, `closeModal()`, `openAdmin()` |
| 952–998 | `loadRSVPs()`, `renderRSVPCards()` |
| 1001–1008 | `deleteRSVP()` |
| 1010–1033 | `renderLinks()`, `copyLink()` |
| 1035–1059 | Color system: `applyColors()`, `resetColors()`, `loadColors()` |
| 1061–1069 | `tick()` — countdown timer |
| 1071 | Bootstrap: `populateContent(); setupWelcome(); loadColors(); updatePreview();` |

## `invitados.js` Structure

```javascript
const INVITADOS = [
  {
    grupo: "Unique-Name",          // URL-safe identifier, must be unique
    personas: ["Full Name 1", "Full Name 2"],  // Names in greeting & RSVP
    // mesa: "Table"               // OPTIONAL — seating group, not required
  },
  // Plus-one example:
  { grupo: "Joel-Joel", personas: ["Joel", "+1"] },
  // ...
];
```

**Rules:**
- `grupo` must be unique; use hyphens, no spaces
- `personas` array drives the welcome greeting and RSVP form
- `+1` (exact string) or names ending in `+1` trigger the companion flow
- `mesa` field is optional and not displayed to guests

**Generate all invitation URLs (open browser console on the site):**
```javascript
generarLinks()
```

---

# PART E: INFRASTRUCTURE & DEPLOYMENT

## Architecture

```
GitHub Pages (static) ──► Guest Browser ──► POST (no-cors) ──► Google Apps Script ──► Google Sheet
                               │                                        │
                           Admin Panel ◄────────── GET (json) ─────────┘
```

**Constants (index.html lines 561–564):**
- `WD` — Wedding date/time (`new Date('2026-10-10T18:00:00')`)
- `PASS_HASH` — SHA-256 hex of admin password
- `SHEET_URL` — Google Apps Script web app endpoint
- `SECRET` — Shared secret for Apps Script validation

## Local Development

```bash
# Start local server
python3 -m http.server 8000

# Test personalized URL
open "http://localhost:8000/?grupo=test&personas=Maria%20Garcia,Carlos%20Garcia"
```

## Git Workflow

```bash
git add content.js invitados.js   # or index.html
git commit -m "Describe the change"
git push origin main
# GitHub Pages auto-deploys in ~30 seconds
```

---

# PART F: CONVENTIONS FOR AI ASSISTANTS

1. **Edit `content.js` for text changes** — do not hardcode strings in `index.html`
2. **Edit `invitados.js` for guest list changes** — never put guest data elsewhere
3. **No build step** — plain HTML/CSS/JS; do not introduce npm, bundlers, or frameworks
4. **No comments in code** — keep the no-comment convention already in place
5. **Preserve inline SVG Toronto** — do not replace with external images; the SVG is intentional
6. **`assets/couple_toronto.png`** is referenced via `<img>` at line 281 — do not inline it as SVG
7. **No new sections without explicit request** — keep page structure stable
8. **Color CSS variables** are set in `:root` at line 19; admin panel overrides them via `style.setProperty`
9. **`no-cors` mode** on RSVP POST is intentional — response is opaque but data reaches Apps Script
10. **SHA-256 password** — never log or expose the plaintext password; change via `docs/SECURITY.md`
11. **`mesa` field** in `invitados.js` is optional — do not add it to entries that don't have it

---

## 🔧 Troubleshooting Quick Reference

| Problem | Check |
|---|---|
| RSVP not saving | `SHEET_URL` (line 563), Apps Script deployed, `SECRET` matches |
| Admin not loading responses | CORS in Apps Script `doGet()`, `SECRET` matches |
| Styling broken on mobile | 480px breakpoint (line 196), viewport meta (line 5) |
| Countdown wrong | `WD` value (line 561), browser timezone |
| Colors not saving | Not incognito, `localStorage` enabled |
| Personalization not showing | URL has `?grupo=X&personas=Y`, both non-empty |

---

**Happy wedding! 🐾💍**
