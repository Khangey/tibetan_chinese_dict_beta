# གསེར་ལྡན་ནང་བསྟན་ཚིག་མཛོད། 色鼎佛教词典 / Serden Dharma Dictionary 部署指南

本項目為靜態網頁應用，使用 Firebase Realtime Database 作為後端。以下是部署方式說明。

---

## 方式一：Firebase Hosting（推薦）

項目已配置 Firebase，且使用 `treasuredict.firebaseio.com` 作為資料庫，最適合用 Firebase Hosting 部署。

### 前置條件

1. **Node.js**（用於安裝 Firebase CLI）
2. **Firebase 帳戶**，以及對應專案的存取權限
3. 專案資料庫已存在於 `treasuredict.firebaseio.com`

### 部署步驟

1. **安裝 Firebase CLI**

   ```bash
   npm install -g firebase-tools
   ```

2. **登入 Firebase**

   ```bash
   firebase login
   ```

3. **確認專案 ID**

   若你的 Firebase 專案 ID 不是 `treasuredict`，請編輯 `.firebaserc`，將 `"treasuredict"` 改為你的專案 ID。

4. **本地預覽**

   ```bash
   firebase serve
   ```

   在瀏覽器開啟 http://localhost:5000 檢查網站是否正常。

5. **部署至 Firebase Hosting**

   ```bash
   firebase deploy --only hosting
   ```

6. **取得網址**

   部署完成後會得到類似網址：
   - `https://treasuredict.web.app`
   - `https://treasuredict.firebaseapp.com`

---

## 方式二：GitHub Pages

若不想使用 Firebase Hosting，可使用 GitHub Pages 託管靜態檔案。

### 部署步驟

1. 將專案推送到 GitHub 倉庫
2. 進入 GitHub 倉庫 → **Settings** → **Pages**
3. **Source** 選擇 `Deploy from a branch`
4. **Branch** 選 `main`（或 `master`），資料夾選 `/ (root)`
5. 儲存後，網站會發布在 `https://<username>.github.io/<repo-name>/`

**注意**：GitHub Pages 的預設入口是 `index.html`，需要將 `main.html` 重新命名為 `index.html`，或在專案根目錄建立 `index.html`，內容為：

```html
<meta http-equiv="refresh" content="0; url=main.html">
```

---

## 方式三：Netlify / Vercel

1. 在 [Netlify](https://netlify.com) 或 [Vercel](https://vercel.com) 註冊
2. 連結 GitHub 倉庫（或上傳專案）
3. 建置設定：
   - **Build command**：留空（純靜態）
   - **Publish directory**：`.` 或專案根目錄
4. 如需首頁重定向到 `main.html`，在 `netlify.toml` 或 `vercel.json` 中設定對應 rewrite 規則

---

## 重要提醒

1. **Firebase 資料庫規則**：確認 `connectdatabase.js` 中的 Firebase URL (`https://treasuredict.firebaseio.com/`) 正確，且 Firebase 專案的 Realtime Database 規則允許讀取與寫入（依你的安全性需求調整）。
2. **Firebase SDK 版本**：目前使用 Firebase 2.x，若未來需升級，可考慮遷移到 Firebase 9+ 模組化 SDK。
3. **HTTPS**：上述託管服務預設使用 HTTPS，與 Firebase 通訊相容。

---

## 疑難排解

| 問題 | 可能原因 | 建議處理 |
|------|----------|----------|
| 首頁 404 | 託管平台預設找 `index.html` | 使用 Firebase Hosting，或新增首頁 redirect 到 `main.html` |
| 資料無法載入 | 資料庫規則或 CORS 限制 | 檢查 Firebase Console 的 Realtime Database 規則 |
| 部署失敗 | 未登入或專案 ID 錯誤 | 執行 `firebase login`，並檢查 `.firebaserc` 中的專案 ID |
