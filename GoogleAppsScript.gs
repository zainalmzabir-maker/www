/**
 * Apps Script Backend API untuk Portal Web SMK Kamarul Ariffin
 */
function doGet(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 1. Ambil Data Pengumuman
  const sheetPengumuman = ss.getSheetByName("Pengumuman") || ss.getSheets()[0];
  const dataPengumuman = getSheetDataAsJson(sheetPengumuman);

  // 2. Ambil Data Guru
  const sheetGuru = ss.getSheetByName("Guru");
  const dataGuru = sheetGuru ? getSheetDataAsJson(sheetGuru) : [];

  // 3. Ambil Data Takwim
  const sheetTakwim = ss.getSheetByName("Takwim");
  const dataTakwim = sheetTakwim ? getSheetDataAsJson(sheetTakwim) : [];

  const responsePayload = {
    status: "success",
    timestamp: new Date().toISOString(),
    pengumuman: dataPengumuman,
    guru: dataGuru,
    takwim: dataTakwim
  };

  return ContentService.createTextOutput(JSON.stringify(responsePayload))
    .setMimeType(ContentService.MimeType.JSON);
}

// Fungsi pembantu menukar baris sheet kepada objek JSON
function getSheetDataAsJson(sheet) {
  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) return [];

  const headers = values[0].map(h => String(h).trim().toLowerCase());
  const rows = [];

  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = row[j];
    }
    rows.push(obj);
  }
  return rows;
}
