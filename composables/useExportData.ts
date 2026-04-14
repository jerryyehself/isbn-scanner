import { useIsbnStore } from '../stores/isbnStore';

export const useDataFormatter = () => {
	const formatDataForExport = async () => {
		const isbnStore = useIsbnStore() || [];

		const rows = isbnStore.results.map((item) => ({
			id: item.id,
			title: item.title,
			author: Array.isArray(item.authors)
				? item.authors.map((a) => a.name).join(', ')
				: item.authors || '',
			isbn: item.isbn,
			publishYear: item.publishDate || '',
			publisher: item.publishers?.map((p) => p.name).join(', ') || '',
			pages: item.pages || '',
			marked: item.marked ? 'V' : '',
			notes: item.notes || '',
		}));

		return rows;
	};

	const getExportHeaders = () => {
		return [
			{ label: 'ID', key: 'id', width: 8 },
			{ label: '書名', key: 'title', width: 35 },
			{ label: '作者', key: 'author', width: 25 },
			{ label: 'ISBN', key: 'isbn', width: 20 },
			{ label: '出版年', key: 'publishYear', width: 12 },
			{ label: '出版社', key: 'publisher', width: 25 },
			{ label: '頁數', key: 'pages', width: 10 },
			{ label: '標記', key: 'marked', width: 8 },
			{ label: '備註', key: 'notes', width: 30 },
		];
	};
	return {
		formatDataForExport,
		getExportHeaders,
	};
};
