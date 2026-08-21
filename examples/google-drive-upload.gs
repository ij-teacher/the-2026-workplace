// 一次性 Google Apps Script 串接程式。
// 將 UPLOAD_SECRET 改為自訂長密碼，部署為網路應用程式：
// 執行身分選「本人」，存取權選「所有人」。
const UPLOAD_SECRET = '請改成至少32字元的隨機密碼';
const FOLDER_NAME = 'The 2026 Workplace 學生資料';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.secret !== UPLOAD_SECRET) return json({ ok: false, error: 'Unauthorized' });
    const folders = DriveApp.getFoldersByName(FOLDER_NAME);
    const folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(FOLDER_NAME);
    const bytes = Utilities.base64Decode(data.content);
    const file = folder.createFile(Utilities.newBlob(bytes, data.mimeType, data.fileName));
    return json({ ok: true, fileName: file.getName(), url: file.getUrl() });
  } catch (error) {
    return json({ ok: false, error: String(error) });
  }
}

function json(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
