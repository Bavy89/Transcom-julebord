function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("No POST data received.");
    }
    var sheet = SpreadsheetApp.openById('1cTee8S19dK_Rzj2ZOpPy8iDXh_XohGe5Sym6onEvyrg').getSheetByName('Sheet1');
    var data = JSON.parse(e.postData.contents);

    if (!data.name || !data.email || !data.phone) {
      throw new Error("Missing required fields.");
    }

    sheet.appendRow([data.name, data.email, data.phone, new Date()]);
    return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
  } catch (err) {
    return ContentService.createTextOutput("Error: " + err.message).setMimeType(ContentService.MimeType.TEXT);
  }
}
