import { defineStore } from "pinia";

<<<<<<< HEAD
export const useIsbnStore = defineStore('isbn', {
	state: () => ({
		// 用來存放置換結果的陣列
		results: [],
		nextId: 1,
	}),
	actions: {
		addResult(isbn) {
			const isDuplicate = this.results.some((item) => item.isbn === isbn);
			if (isDuplicate) {
				console.log('此 ISBN 已存在清單中，不重複加入');
				return; // 直接結束，不執行後續新增動作
			}
			this.results.unshift({
				id: this.nextId++,
				isbn: isbn,
				time: new Date().toLocaleTimeString(),
			});
		},
		deleteResult(id) {
			this.results = this.results.filter((item) => item.id !== id);
=======
export const useIsbnStore = defineStore("isbn", {
    state: () => ({
        // 用來存放置換結果的陣列
        results: [],
        nextId: 1,
    }),
    actions: {
        addResult(isbn) {
            const isDuplicate = this.results.some((item) => item.isbn === isbn);

            if (isDuplicate) {
                console.log("此 ISBN 已存在清單中，不重複加入");
                return; // 直接結束，不執行後續新增動作
            }
            this.results.unshift({
                id: this.nextId++,
                isbn: isbn,
                time: new Date().toLocaleTimeString(),
            });
        },
        deleteResult(id) {
            this.results = this.results.filter((item) => item.id !== id);
>>>>>>> bugfix/master

            this.results.forEach((item, index) => {
                item.id = this.results.length - index;
            });

            this.nextId = this.results.length + 1;

            console.log("重排後的結果:", this.results);
        },
    },
    // 如果想要網頁重新整理後資料還在，可以搭配 pinia-plugin-persistedstate
});
