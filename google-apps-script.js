function doPost(e) {
  try {
    // Add CORS headers
    const response = ContentService.createTextOutput();
    response.setMimeType(ContentService.MimeType.JSON);
    
    // Handle CORS preflight request
    if (e.parameter && e.parameter.method === 'OPTIONS') {
      return response.setContent(JSON.stringify({status: 'OK'}));
    }
    
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("No POST data received.");
    }
    
    var sheet = SpreadsheetApp.openById('1cTee8S19dK_Rzj2ZOpPy8iDXh_XohGe5Sym6onEvyrg').getSheetByName('Blad1');
    var data = JSON.parse(e.postData.contents);

    if (!data.name || !data.email || !data.phone) {
      throw new Error("Missing required fields.");
    }

    // Add headers if this is the first row
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 8).setValues([['Navn', 'E-post', 'Telefon', 'Har allergier', 'Allergi kommentarer', 'ELogIT', 'Negotia', 'Dato']]);
    }
    
    // Add the new row
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
    
    return response.setContent(JSON.stringify({
      status: 'success',
      message: 'Data saved successfully'
    }));
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: err.message
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
