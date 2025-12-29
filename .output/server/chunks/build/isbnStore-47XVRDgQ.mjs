import { defineStore } from 'pinia';

const useIsbnStore = defineStore("isbn", {
  state: () => ({
    // 用來存放置換結果的陣列
    results: [],
    nextId: 1
  }),
  actions: {
    addResult(isbn) {
      const isDuplicate = this.results.some((item) => item.isbn === isbn);
      if (isDuplicate) {
        console.log("\u6B64 ISBN \u5DF2\u5B58\u5728\u6E05\u55AE\u4E2D\uFF0C\u4E0D\u91CD\u8907\u52A0\u5165");
        return;
      }
      this.results.unshift({
        id: this.nextId++,
        isbn,
        time: (/* @__PURE__ */ new Date()).toLocaleTimeString()
      });
    },
    deleteResult(id) {
      this.results = this.results.filter((item) => item.id !== id);
      this.results.forEach((item, index) => {
        item.id = this.results.length - index;
      });
      this.nextId = this.results.length + 1;
      console.log("\u91CD\u6392\u5F8C\u7684\u7D50\u679C:", this.results);
    }
  }
  // 如果想要網頁重新整理後資料還在，可以搭配 pinia-plugin-persistedstate
});

export { useIsbnStore as u };
//# sourceMappingURL=isbnStore-47XVRDgQ.mjs.map
