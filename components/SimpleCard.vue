<template>
	<v-card
		variant="flat"
		class="rounded overflow-hidden"
		color="surface-variant"
	>
		<v-img
			:src="book.covers?.medium || book.covers?.small"
			aspect-ratio="0.7"
			cover
			class="align-end"
		>
			<v-card-actions class="align-center justify-space-around bg-grey-lighten-2">
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
				<slot name="addResult" />
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
		</v-img>
	</v-card>
	<note-dialog
		v-model="noteDialog"
		:book="book"
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
