function doPost(e) {
  try {
    // Get the active spreadsheet and sheet
    var ss = SpreadsheetApp.openById('1cTee8S19dK_Rzj2ZOpPy8iDXh_XohGe5Sym6onEvyrg');
    var sheet = ss.getActiveSheet();
    
    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);
    
    // Validate required fields
    if (!data.name || !data.email || !data.phone) {
      throw new Error("Missing required fields: name, email, or phone");
    }
    
    // Add headers if this is the first row
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 8).setValues([['Navn', 'E-post', 'Telefon', 'Har allergier', 'Allergi kommentarer', 'Fagforening ELogIT', 'Fagforening Negotia', 'Dato']]);
    }
    
    // Add the new row with fagforening (union membership) and allergy information
    sheet.appendRow([
      data.name, 
      data.email, 
      data.phone, 
      data.hasAllergies ? 'Ja' : 'Nei',
      data.allergyComments || '',
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

// Add doGet function for CORS
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'OK',
    message: 'Google Apps Script is running'
  })).setMimeType(ContentService.MimeType.JSON);
}
