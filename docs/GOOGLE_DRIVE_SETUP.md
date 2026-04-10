# Google Sheets + Google Apps Script Setup

Complete guide to set up the backend for storing RSVP responses using free Google services.

---

## Overview

**Architecture:**
```
Guest submits RSVP from website
    ↓
POST request to Google Apps Script (web app)
    ↓
Apps Script processes data + validates SECRET
    ↓
Apps Script appends row to Google Sheet
    ↓
Admin retrieves data via GET request
    ↓
Admin panel displays responses
```

**Cost: $0** (free Google account sufficient)

---

## Part 1: Create Google Sheet for Responses

### Step 1: Create new Sheet

1. Go to **sheets.google.com**
2. Click **+ (Create)**
3. Choose **Blank spreadsheet**
4. Rename to: `Boda Ale & Pri Respuestas` (or preferred name)

### Step 2: Add column headers

In row 1, add these headers (exactly as shown):

```
| A         | B       | C       | D     | E      | F          | G       |
|-----------|---------|---------|-------|--------|------------|---------|
| id        | nombre  | asiste  | dieta | grupo  | timestamp  | mensaje |
```

**Headers must match exactly** (these are what the code expects).

### Step 3: Test with manual entry

Add a test row:
```
| 1234567890 | Test User | Sí | Sin restricciones | test-grupo | 2026-08-01 14:30 | Test message |
```

This helps verify the structure later.

---

## Part 2: Create Google Apps Script

### Step 1: Open Script Editor

1. Still in your Google Sheet
2. Click **Tools** (top menu)
3. Click **Script editor**
4. A new tab opens with Google Apps Script IDE

### Step 2: Delete default code

The editor shows default `myFunction()`. Delete everything.

### Step 3: Copy the complete Apps Script code

Paste this entire script:

```javascript
// ============================================
//   BODA ALE & PRI — Google Apps Script
//   Handles RSVP form submissions and data retrieval
// ============================================

// Configuration
const SECRET = 'torontoboda2026';  // Must match index.html line 492
const SHEET_NAME = 'Sheet1';       // Default sheet name (change if renamed)

// ============================================
//   Handle POST requests (guest RSVP submission)
// ============================================

function doPost(e) {
  try {
    // Parse request body
    const data = JSON.parse(e.postData.contents);
    
    // Validate SECRET
    if (data.secret !== SECRET) {
      Logger.log('Invalid SECRET received');
      return ContentService.createTextOutput('Invalid secret');
    }
    
    // Get the sheet
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Process each guest in the submission
    const guests = data.guests || [];
    
    guests.forEach(guest => {
      // Convert attendance to Spanish for storage
      const asiste = guest.attending === 'yes' ? 'Sí' : 
                     guest.attending === 'no' ? 'No' : 'Pendiente';
      
      // Append row with: id, nombre, asiste, dieta, grupo, timestamp, mensaje
      sheet.appendRow([
        data.id,
        guest.name,
        asiste,
        guest.diet || 'Sin restricciones',
        data.grupo,
        data.timestamp,
        data.message || ''
      ]);
    });
    
    Logger.log('RSVP saved for grupo: ' + data.grupo);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        message: 'RSVP saved successfully' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    Logger.log('Error in doPost: ' + error);
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================
//   Handle GET requests (retrieve responses)
// ============================================

function doGet(e) {
  try {
    // Validate SECRET
    const secret = e.parameter.secret;
    if (secret !== SECRET) {
      Logger.log('Invalid SECRET in GET request');
      return ContentService
        .createTextOutput(JSON.stringify({ 
          error: 'Invalid secret' 
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get all data from sheet (skip header row)
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = sheet.getDataRange().getValues();
    
    // Skip header row (row 0)
    const rows = data.slice(1);
    
    // Convert to JSON format (match what admin panel expects)
    const formattedRows = rows.map(row => ({
      id: row[0],           // Column A
      nombre: row[1],       // Column B
      asiste: row[2],       // Column C (Sí/No/Pendiente)
      dieta: row[3],        // Column D
      grupo: row[4],        // Column E
      timestamp: row[5],    // Column F
      mensaje: row[6]       // Column G
    }));
    
    Logger.log('Returning ' + formattedRows.length + ' RSVP rows');
    
    // Return data as JSON
    return ContentService
      .createTextOutput(JSON.stringify({ 
        rows: formattedRows,
        count: formattedRows.length
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(error) {
    Logger.log('Error in doGet: ' + error);
    return ContentService
      .createTextOutput(JSON.stringify({ 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================
//   Handle DELETE requests (delete response)
// ============================================

function doDelete(e) {
  try {
    // Validate SECRET
    const secret = e.parameter.secret;
    if (secret !== SECRET) {
      return ContentService.createTextOutput('Invalid secret');
    }
    
    // Get submission ID to delete
    const data = JSON.parse(e.postData.contents);
    const idToDelete = data.id;
    
    const sheet = SpreadsheetApp.getActiveSheet();
    const values = sheet.getDataRange().getValues();
    
    // Find and delete rows matching the ID
    for (let i = values.length - 1; i >= 1; i--) {  // Start from end, skip header
      if (values[i][0] == idToDelete) {
        sheet.deleteRow(i + 1);  // +1 because sheet rows start at 1
        Logger.log('Deleted row with ID: ' + idToDelete);
      }
    }
    
    return ContentService.createTextOutput('Deleted successfully');
    
  } catch(error) {
    Logger.log('Error in doDelete: ' + error);
    return ContentService.createTextOutput('Error: ' + error);
  }
}

// ============================================
//   Utility: Test the script locally
// ============================================

function testDoPost() {
  // Mock POST request for testing
  const mockEvent = {
    postData: {
      contents: JSON.stringify({
        id: Date.now(),
        secret: 'torontoboda2026',
        grupo: 'test-grupo',
        timestamp: new Date().toLocaleString('es-ES'),
        guests: [
          { name: 'Test User', attending: 'yes', diet: 'Vegetariano' }
        ],
        message: 'Test message'
      })
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log('Test POST result: ' + result.getContent());
}

function testDoGet() {
  // Mock GET request for testing
  const mockEvent = {
    parameter: {
      secret: 'torontoboda2026',
      action: 'get'
    }
  };
  
  const result = doGet(mockEvent);
  Logger.log('Test GET result: ' + result.getContent());
}
```

### Step 4: Save the project

1. Press **Ctrl+S** (or **Cmd+S**)
2. Name the project: `Boda Ale & Pri Backend`
3. Click **OK**

---

## Part 3: Deploy as Web App

### Step 1: Set up deployment

1. Click **Deploy** (top right dropdown)
2. Click **New deployment** (or **Create deployment**)
3. On the right, click gear icon ⚙️ → Select **Web app**

### Step 2: Configure deployment

Fill in the form:
- **Description**: `Boda RSVP Backend`
- **Execute as**: Your Google account
- **Who has access**: **Anyone** (this allows GitHub Pages to call it)

Click **Deploy**

### Step 3: Copy the deployment URL

A popup shows:
```
https://script.google.com/macros/s/[SCRIPT_ID]/usercontent
```

**Copy this URL** — you'll need it in `index.html` line 491.

It might say `exec` or `usercontent` — both work, but `usercontent` is more stable.

---

## Part 4: Verify Setup

### Test the Google Apps Script

1. Go back to the Apps Script editor tab
2. Open **Execution log** (bottom of screen)
3. Run test functions:
   - Click dropdown next to **Run** button
   - Select `testDoPost()`
   - Click **Run**
   - Check logs for success message

4. Open your Google Sheet
   - A new row should appear with test data
   - If yes, ✅ POST is working

### Test retrieval

1. In Apps Script editor:
   - Select `testDoGet()` from dropdown
   - Click **Run**
   - Check logs for data retrieval

2. Check **Execution log** shows the data

---

## Part 5: Configure in index.html

### Update the SHEET_URL

In `index.html`, line 491:

```javascript
const SHEET_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/usercontent';
```

Replace `YOUR_SCRIPT_ID` with your actual script ID from the deployment URL.

**Example:**
```
Original URL: https://script.google.com/macros/s/AKfycbwx1234abc/usercontent
Script ID: AKfycbwx1234abc

Updated line 491:
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbwx1234abc/usercontent';
```

### Verify SECRET matches

Make sure `index.html` line 492 matches your Apps Script:

```javascript
const SECRET = 'torontoboda2026';  // Must match line 5 in Apps Script
```

If you changed it in Apps Script, update it here too.

---

## Part 6: End-to-End Test

### Test from GitHub Pages (or local)

1. **Local testing** (if on localhost:8000):
   - Go to your personalized invitation URL
   - Click "Sí, voy!" for someone
   - Submit the form

2. **Check Google Sheet**
   - Should see a new row with the RSVP
   - Name, attendance, diet, group, timestamp

3. **Test admin panel**
   - Admin panel → Actualizar
   - Should load and display the response

### Troubleshooting

**"Error al conectar con el Sheet" in admin panel:**
- Verify `SHEET_URL` is correct
- Verify `SECRET` is correct
- Check Google Sheet has the correct column headers
- Check browser console (F12) for CORS errors

**RSVP submission silent failure:**
- Using `no-cors` mode (normal behavior)
- Check Google Sheet for entry (may have succeeded)
- Verify Apps Script is deployed

**RSVP not appearing in Sheet:**
- Check Apps Script logs for errors: **View** → **Execution log**
- Verify SECRET matches
- Test with `testDoPost()` function
- Check Sheet has correct column headers

---

## Maintenance

### Viewing responses

1. Open your Google Sheet
2. All responses appear as rows
3. Can sort by date, attendance, diet, etc.
4. Export as CSV: **File** → **Download** → **CSV**

### Backup data

1. **Weekly backup:**
   - Open Sheet
   - **File** → **Download** → **Excel (.xlsx)**
   - Save locally

2. **Automatic backup:**
   - Google Drive auto-backs up (every change saved)

### Update Apps Script

If you need to modify the code:
1. Go to Apps Script editor
2. Make changes
3. Deploy as new version:
   - **Deploy** → **Manage deployments**
   - Click pencil icon next to current deployment
   - Make changes
   - Click **Update**

---

## CORS Configuration (If Needed)

The current script uses `no-cors` mode on the client side, which works around CORS issues. However, if you want to add CORS headers for better error handling:

### Adding CORS headers to Apps Script

Modify the response in `doPost()`:

```javascript
function doPost(e) {
  // ... existing code ...
  
  var output = ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
  
  // Note: Apps Script has limited CORS support
  // The no-cors approach in index.html is the recommended workaround
  
  return output;
}
```

The current implementation avoids CORS issues by using `mode: 'no-cors'` on the client, which is the standard pattern for public APIs.

---

## Security Notes

✅ **What we're doing:**
- Validating SECRET token (basic auth)
- Logging requests (for debugging)
- Only accepting POST/GET from configured sheet

⚠️ **What we're NOT doing:**
- Advanced authentication (not needed for public wedding)
- Rate limiting (not needed)
- Data encryption (Google handles HTTPS)

Anyone can theoretically submit RSVPs, but:
1. They need your `SHEET_URL` (it's in the source code, but not heavily publicized)
2. They need the `SECRET` (hardcoded in source)
3. The data is still validated on the server

This is acceptable for a public wedding invitation.

---

## Cost

**Google Sheet:** Free (unlimited rows/columns)
**Google Apps Script:** Free (10 minutes execution time per day - more than enough)
**Total cost:** $0

---

## Next Steps

1. ✅ Google Sheet created
2. ✅ Google Apps Script deployed
3. → Update `index.html` with `SHEET_URL`
4. → Deploy to GitHub Pages (see `DEPLOYMENT.md`)
5. → Generate invitation links (see `README.md`)
6. → Send to guests!

---

**Questions?** See `docs/TROUBLESHOOTING.md` or `CLAUDE.md` for technical details.
