function doPost(e) {
  try {
    // Get the active spreadsheet and sheet
    var ss = SpreadsheetApp.openById('163iKmKo-OWJ_fLTO3NzbUsuXr0Ksx3xzQDShX8_WeCk');
    var sheet = ss.getSheetByName('Ark 1');
    
    // Fallback to active sheet if 'Ark 1' doesn't exist
    if (!sheet) {
      sheet = ss.getActiveSheet();
    }

    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);

    // Add headers if this is the first row
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 8).setValues([['Navn', 'E-post', 'Telefon', 'Matallergier', 'Allergi-kommentar', 'ELogIT', 'Negotia', 'Dato']]);
    }

    // Add the new row with all fields
    sheet.appendRow([
      data.name,
      data.email,
      data.phone,
      data.hasAllergies ? 'Ja' : 'Nei',
      data.allergyComment || '',
      data.isELogIT ? 'Ja' : 'Nei',
      data.isNegotia ? 'Ja' : 'Nei',
      new Date()
    ]);

    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Data saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'OK',
    message: 'Script is running'
  })).setMimeType(ContentService.MimeType.JSON);
}