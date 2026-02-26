# ISBN Scanner for Library 📚

一個為圖書館員設計的 ISBN 條碼掃描工具，可快速掃描、查詢書籍資訊並支援多種格式匯出。

### 🏠 [首頁](https://jerryyehself.github.io/isbn-scanner/)

### ✨ [線上演示](https://jerryyehself.github.io/isbn-scanner/)

---

## 📋 核心功能

- **ISBN 條碼掃描**：使用裝置攝像頭即時掃描 ISBN 條碼
- **書籍資訊查詢**：自動查詢書籍的標題、作者、出版社等詳細資訊
- **多視圖檢視**：支援列表檢視和網格檢視兩種展示方式
- **資料匯出**：支援 CSV、Excel、TXT、JSON 等多種格式匯出
- **Google Sheets 整合**：支援直接匯出至 Google Sheets
- **Email 分享**：支援郵件方式分享掃描結果
- **深色/淺色主題**：響應式設計，支援主題切換
- **離線優先**：掃描紀錄本地存儲，支援資料持久化

---

## 🛠 技術架構

### 前端框架
- **Nuxt 3** (v3.20.2) - 全棧 Vue 框架
- **Vue 3** (v3.5.26) - 漸進式 JavaScript 框架
- **Vuetify 3** (v3.11.8) - Material Design UI 元件庫
- **Pinia** (v2.2.0) - 狀態管理

### 條碼掃描與資料處理
- **html5-qrcode** (v2.3.8) - QR/條碼掃描庫
- **isbn3** (v2.0.1) - ISBN 驗證與解析
- **@vueuse/core** (v14.2.1) - Vue 組合式 API 工具庫

### 設計與圖標
- **@mdi/js** & **@mdi/font** (v7.4.47) - Material Design 圖標集

### 樣式
- **Sass** (v1.70.0) - CSS 預處理器
- **Vuetify Styles** - Material Design 樣式

### 開發工具
- **Vite** - 極速構建工具
- **TypeScript** - 類型安全開發

### 部署
- **Nitro** (v2.13.0) - Nuxt 後端伺服器
- **GitHub Pages** - 靜態網站託管

---

## 📁 專案結構

```
isbn-scanner/
├── pages/                    # 頁面路由
│   ├── index.vue            # 掃描頁面
│   └── list.vue             # 掃描紀錄列表
├── components/              # Vue 元件
│   ├── ExportDialog.vue     # 匯出對話框
│   ├── NoteDialog.vue       # 備註對話框
│   └── ScanPreview.vue      # 掃描預覽
├── layouts/                 # 版面配置
│   └── default.vue          # 默認版面
├── stores/                  # Pinia 狀態倉庫
│   ├── isbnStore.ts         # ISBN 掃描資料倉庫
│   ├── exportStore.ts       # 匯出配置倉庫
│   └── userSettingStore.ts  # 用戶設定倉庫
├── plugins/                 # Nuxt 插件
│   ├── pinia.ts             # Pinia 配置
│   └── vuetify.ts           # Vuetify 配置
├── public/                  # 靜態資源
└── nuxt.config.ts           # Nuxt 配置檔案
```

---

## 🚀 快速開始

### 環境需求
- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 或 **yarn**

### 安裝步驟

1. **複製倉庫**
```bash
git clone https://github.com/jerryyehself/isbn-scanner.git
cd isbn-scanner
```

2. **安裝依賴**
```bash
npm install
```

3. **開發環境運行**
```bash
npm run dev
```
應用將在 `https://localhost:3000` 啟動（需要 HTTPS 用於攝像頭權限）

4. **構建生產版本**
```bash
npm run build
```

5. **預覽構建結果**
```bash
npm run start
```

---

## 📱 主要頁面說明

### 掃描頁面 (`/`)
- 使用設備攝像頭掃描 ISBN 條碼
- 自動查詢書籍資訊並展示
- 支援自動加入或手動選擇添加
- 即時顯示已掃描書籍數量

**主要元件**：[`pages/index.vue`](pages/index.vue)

### 掃描紀錄列表 (`/list`)
- 展示所有已掃描的書籍紀錄
- 支援列表和網格兩種檢視模式
- 支援單本刪除和批量清空
- 支援放大查看書籍封面

**主要元件**：[`pages/list.vue`](pages/list.vue)

---

## 🎯 核心狀態管理

### [isbnStore](stores/isbnStore.ts)
管理 ISBN 掃描和書籍資訊相關狀態：
- `results` - 掃描結果陣列
- `currentList` - 當前選中的書籍列表
- `fetchBookInfo()` - 查詢書籍詳細資訊
- `addResultToCollection()` - 添加至收藏

### [exportStore](stores/exportStore.ts)
管理匯出配置：
- `form.fields` - 可匯出欄位列表
- `fileTypes` - 支援的匯出格式（CSV、Excel、TXT、JSON）
- `googleSheetKey` - Google Sheets API 金鑰
- `email` - 收件人郵箱

### [userSettingStore](stores/userSettingStore.ts)
管理用戶偏好設定：
- `addDefault` - 是否自動添加掃描結果
- 主題和語言設定

---

## 💾 資料存儲

應用使用 **Pinia** 搭配瀏覽器本地存儲（可配合 `pinia-plugin-persistedstate` 實現資料持久化）：

```typescript
// 使用 isbnStore
const isbnStore = useIsbnStore();
isbnStore.results  // 存取掃描結果
```

---

## 🔌 外部集成

### 書籍資訊查詢 API
透過 [`html5-qrcode`](https://github.com/mebjas/html5-qrcode) 掃描 ISBN，並調用書籍資訊 API：

```javascript
// 掃描並查詢
isbnStore.fetchBookInfo('9787537815789');
```

### Google Sheets 匯出
配置 Google Sheets API 金鑰後，支援直接匯出至電子表格

### Email 分享
支援透過郵件分享掃描結果

---

## 🎨 UI 元件

### 自訂元件

**[ExportDialog.vue](components/ExportDialog.vue)**
- 匯出對話框
- 支援格式與目標選擇

**[NoteDialog.vue](components/NoteDialog.vue)**
- 書籍備註對話框
- 紀錄額外資訊

**[ScanPreview.vue](components/ScanPreview.vue)**
- 掃描預覽元件

### Vuetify 元件
應用廣泛使用 Vuetify 的 Material Design 元件：
- `v-app-bar` - 應用頂部欄
- `v-navigation-drawer` - 側邊導航
- `v-dialog` - 對話框
- `v-btn` - 按鈕
- `v-list` - 列表
- `v-card` - 卡片

---

## 🔧 配置說明

### [nuxt.config.ts](nuxt.config.ts)

```typescript
export default defineNuxtConfig({
  css: ["vuetify/styles"],           // Vuetify 樣式
  app: {
    baseURL: "/isbn-scanner/",       // GitHub Pages 基礎路徑
  },
  nitro: {
    preset: "static",                 // 靜態部署
  },
});
```

---

## 📡 部署

### GitHub Pages 部署

專案已配置 GitHub Actions 自動部署流程 [`.github/workflows/nuxtjs.yml`](.github/workflows/nuxtjs.yml)

**部署步驟**：
1. 推送至 `master` 或 `feature/**` 分支
2. GitHub Actions 自動構建並部署至 GitHub Pages
3. 訪問 `https://jerryyehself.github.io/isbn-scanner/`

**手動部署**：
```bash
npm run build
npm install -g gh-pages
gh-pages -d .output/public
```

---

## 📝 開發指南

### 新增頁面
在 `pages/` 目錄新增 `.vue` 檔案，Nuxt 將自動生成路由

### 新增元件
在 `components/` 目錄新增元件，支援全域自動導入

### 狀態管理
在 `stores/` 目錄定義 Pinia Store：

```typescript
export const useMyStore = defineStore('my-store', {
  state: () => ({}),
  actions: {},
});
```

### 樣式開發
應用支援 Scoped Sass：

```vue
<style scoped lang="scss">
.my-class {
  color: #333;
}
</style>
```

---

## 📄 許可證

本專案採用 MIT 許可證 - 詳見 [LICENSE](LICENSE) 檔案

---

## 👤 作者

**JerryYeh**

* 網站: https://jerryyehself.github.io/my-profile/
* GitHub: [@jerryyehself](https://github.com/jerryyehself)

---

## 💝 支持

如果此專案對你有幫助，請給一個 ⭐️！

---

## 📞 聯繫與支持

- 問題報告: [GitHub Issues](https://github.com/jerryyehself/isbn-scanner/issues)
- 功能建議: [GitHub Discussions](https://github.com/jerryyehself/isbn-scanner/discussions)

---

_使用 ❤️ 為圖書館員打造_