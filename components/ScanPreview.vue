<template>
	<v-card
		border
		rounded-lg
		class="w-100 mb-4 d-flex"
		elevation="1">
		<v-img
			:src="book.covers?.medium || book.covers?.small"
			width="100"
			min-width="100"
			max-width="120"
			cover
			class="bg-grey-lighten-3">
			<template #placeholder>
				<div class="d-flex align-center justify-center fill-height">
					<v-progress-circular
						indeterminate
						size="24" />
				</div>
			</template>
		</v-img>

		<div
			class="flex-grow-1 pa-3 d-flex flex-column justify-center overflow-hidden">
			<div class="d-flex justify-space-between align-start mb-1">
				<div
					class="text-h6 font-weight-bold text-truncate"
					style="max-width: 80%">
					{{ book.title || '書名加載中...' }}
				</div>
				<v-btn
					icon="mdi-dots-vertical"
					variant="text"
					size="small"
					density="comfortable"></v-btn>
			</div>

			<v-divider class="mb-2"></v-divider>

			<div class="text-body-2 text-grey-darken-2">
				<div class="d-flex align-center mb-1">
					<v-icon
						size="16"
						class="me-2 text-grey"
						>mdi-account</v-icon
					>
					<span class="text-truncate">唐納．諾曼</span>
				</div>

				<div class="d-flex align-center mb-1">
					<v-icon
						size="16"
						class="me-2 text-grey"
						>mdi-office-building</v-icon
					>
					<span class="text-truncate">遠流出版公司</span>
				</div>

				<div class="d-flex align-center mb-1">
					<v-icon
						size="16"
						class="me-2 text-grey"
						>mdi-barcode-scan</v-icon
					>
					<span class="font-weight-medium">9789573274766</span>
				</div>
			</div>

			<div class="mt-2 d-flex ga-2">
				<v-chip
					size="x-small"
					variant="outlined"
					color="primary"
					>繁體中文</v-chip
				>
				<v-chip
					size="x-small"
					variant="outlined"
					>精裝本</v-chip
				>
			</div>
		</div>
	</v-card>
</template>

<script setup>
	import { useIsbnStore } from '~/stores/isbnStore';

	const isbnStore = useIsbnStore();
	const book = isbnStore.results[0]; // 假設只顯示第一本
	// Emits if you want actions
	const emit = defineEmits(['delete', 'zoom']);
</script>
