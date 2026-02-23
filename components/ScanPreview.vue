<template>
	<v-card
		border
		rounded-lg
		class="mb-4 d-flex h-100"
		elevation="1"
	>
		<v-img
			:src="book.cover?.medium || book.cover?.small"
			width="100"
			min-width="100"
			max-width="180"
			cover
			class="bg-grey-lighten-3"
		>
			<template #placeholder>
				<div class="d-flex align-center justify-center fill-height">
					<v-progress-circular
						indeterminate
						size="24"
					/>
				</div>
			</template>
		</v-img>
		<v-card-text class="flex-grow-1 pa-3 d-flex flex-column justify-center overflow-hidden justify-space-around">
			<div>
				<div class="text-h6 font-weight-bold text-truncate">
					{{ book.title || '書名加載中...' }}
				</div>
				<v-divider />
			</div>

			<div class="text-body-2 text-grey-darken-2">
				<div class="d-flex align-center mb-1">
					<v-icon
						size="16"
						class="me-2 text-grey"
						icon="mdi-account"
					/>
					<span class="text-truncate">
						{{book.authors?.map(a => a.name).join(', ') || '作者資訊加載中...'}}
					</span>
				</div>

				<div class="d-flex align-center mb-1">
					<v-icon
						size="16"
						class="me-2 text-grey"
						icon="mdi-office-building"
					/>
					<span class="text-truncate">
						{{book.publishers?.map(a => a.name).join(', ') || '出版社資訊加載中...'}}
					</span>
				</div>

				<div class="d-flex align-center mb-1">
					<v-icon
						size="16"
						class="me-2 text-grey"
						icon="mdi-barcode-scan"
					/>
					<span class="font-weight-medium">
						{{ book.isbn || 'ISBN資訊加載中...' }}
					</span>
				</div>
			</div>

			<div class="mt-2 d-flex ga-2">
				<v-chip
					size="x-small"
					variant="outlined"
					color="primary"
					text="繁體中文"
				/>
				<v-chip
					size="x-small"
					variant="outlined"
					text="精裝本"
				/>
			</div>

		</v-card-text>
		<v-card-actions class="flex-column align-center justify-space-around bg-grey-lighten-2">
			<v-btn
				variant="plain"
				density="comfortable"
				icon
				@click="book.marked = !book.marked"
			>
				<v-icon :icon="book.marked
					? 'mdi-star'
					: 'mdi-star-outline'
					" />
				<v-tooltip
					activator="parent"
					location="bottom"
					text="收藏"
				/>
			</v-btn>
			<v-btn
				variant="plain"
				density="comfortable"
				icon
				@click="noteDialog = true"
			>
				<v-icon :icon="book.notes.length
					? 'mdi-text-box'
					: 'mdi-text-box-edit-outline'
					" />
				<v-tooltip
					activator="parent"
					location="bottom"
					text="註記"
				/>
			</v-btn>
			<v-btn
				variant="plain"
				density="comfortable"
				icon
				@click="isbnStore.addResultToCollection()"
			>
				<v-icon icon="mdi-plus-outline" />
				<v-tooltip
					activator="parent"
					location="bottom"
					text="加入清單"
				/>
			</v-btn>
			<v-btn
				variant="plain"
				density="comfortable"
				icon
				@click="isbnStore.deleteCurrentItem(book.isbn)"
			>
				<v-icon icon="mdi-trash-can-outline" />
				<v-tooltip
					activator="parent"
					location="bottom"
					text="刪除"
				/>
			</v-btn>
		</v-card-actions>
	</v-card>
	<note-dialog
		v-model="noteDialog"
		:book="isbnStore.current"
	/>
</template>

<script setup>
import { useIsbnStore } from '~/stores/isbnStore';
import NoteDialog from '~/components/NoteDialog.vue';

const noteDialog = ref(false);

const isbnStore = useIsbnStore();
// const book = computed(() => isbnStore.current); // 假設只顯示第一本
defineProps({
	book: {
		type: Object,
		required: true,
	},
});

// Emits if you want actions
const emit = defineEmits(['delete', 'zoom']);
</script>
