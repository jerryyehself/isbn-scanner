// server/api/book.get.ts
export default defineEventHandler(async (event) => {
	// 從前端傳來的 query 中取得 isbn (例如 /api/book?isbn=9780545010221)
	const { isbn } = getQuery(event);

	if (!isbn) {
		throw createError({ statusCode: 400, statusMessage: 'Missing ISBN' });
	}

	// 在伺服器端呼叫外部 API (沒有 CORS 問題)
	const targetUrl = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`;

	try {
		const data = await $fetch(targetUrl);
		return data;
	} catch (error) {
		return createError({
			statusCode: 500,
			statusMessage: 'External API Error',
		});
	}
});
