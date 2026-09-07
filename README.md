# The 2026 Workplace

Business English 互動聽力教材，包含 MP3、五組練習、學生提交、教師紀錄與 Excel 匯出。

公開網站：https://the-2026-workplace.ijchen.workers.dev

## 建置與部署

使用 Node.js 22.13 以上與 pnpm。

```sh
pnpm install --frozen-lockfile
pnpm exec wrangler d1 migrations apply the-2026-workplace --remote
pnpm build
pnpm exec wrangler deploy
```

Cloudflare 設定：wrangler.jsonc；D1 綁定：DB；資料表結構：drizzle/。
QR Code 依目前網址自動產生。新站未匯入舊學生紀錄。學生資料儲存於 D1，不放入 GitHub。
教師控制碼沿用原網站設定。Google Drive 上傳需另行設定 GOOGLE_DRIVE_UPLOAD_URL 與 GOOGLE_DRIVE_UPLOAD_SECRET；直接下載 Excel 不需要此設定。

原始碼取自使用者擁有的 Sites 專案；原 OneDrive 備份不完整，因此保留完整 Sites 原始碼與教材於此儲存庫。既有模板測試不適用目前教材；本次已驗證建置、學生提交、紀錄讀取與 Excel 匯出。
