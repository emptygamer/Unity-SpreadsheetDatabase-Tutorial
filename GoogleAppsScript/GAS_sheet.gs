function myFunction() {
  // Open the spreadsheet file.
  var app = SpreadsheetApp.openById("Your Spreadsheet ID here!");
  // Select the sheet of the file.
  var sheet = app.getSheets()[0];
  // Change the values of cells of the sheet.
  sheet.getRange(2, 3).setValue("阿空");
  // Append the data as one row.
  var data = ["阿空","100","99","30"];
  sheet.appendRow(data);
}

// API entry point for the POST method.
function doPost(e){

  var app = SpreadsheetApp.openById("Your Spreadsheet ID here!");
  var sheet = app.getSheets()[0];
  // Get the parameter of the request.
  var parameter = e.parameter;
  
  // If the request want to read data.
  if(parameter.method == "read"){
    // return the text response of the value of the cell(1A).
    return ContentService.createTextOutput(sheet.getRange(1, 1).getValue());
  }

  // If the request want to write data.
  if(parameter.method == "write"){
    // Get the data of the parameter of the request.
    var data = [parameter.name,parameter.hp,parameter.level,parameter.atk];
    sheet.appendRow(data);

    // Create return object and convert to JSON string, and return the text response of it.
    var data = new Object();
    data.result = "OK";
    var output = ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
    return output;
  }

}