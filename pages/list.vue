<template>
	<v-container class="h-100">
		<v-toolbar
			color="transparent"
			class="mb-4">
			<v-toolbar-title class="flex-shrink-0">
				<div class="text-h5 font-weight-bold">掃描紀錄</div>
				<div class="text-caption text-grey">
					共 {{ isbnStore.results.length }} 筆
				</div>
			</v-toolbar-title>

			<v-spacer></v-spacer>

			<v-btn
				:disabled="isbnStore.results.length === 0"
				variant="tonal"
				class="me-2"
				height="40">
				<v-icon>mdi-export</v-icon>
				<v-tooltip
					activator="parent"
					location="bottom"
					>匯出資料</v-tooltip
				>
			</v-btn>

			<v-btn
				color="error"
				variant="tonal"
				@click="clearAll"
				:disabled="isbnStore.results.length === 0"
				class="me-4"
				height="40">
				<v-icon>mdi-delete-sweep</v-icon>
				<v-tooltip
					activator="parent"
					location="bottom"
					>全部刪除</v-tooltip
				>
			</v-btn>

			<v-btn-toggle
				v-model="viewMode"
				mandatory
				border
				divided
				variant="outlined"
				density="comfortable"
				height="40">
				<v-btn
					value="list"
					icon="mdi-view-list">
					<v-icon>mdi-view-list</v-icon>
					<v-tooltip
						activator="parent"
						location="bottom"
						>條列檢視</v-tooltip
					>
				</v-btn>
				<v-btn
					value="grid"
					icon="mdi-view-grid">
					<v-icon>mdi-view-grid</v-icon>
					<v-tooltip
						activator="parent"
						location="bottom"
						>網格檢視</v-tooltip
					>
				</v-btn>
			</v-btn-toggle>
		</v-toolbar>
		<div
			v-if="viewMode == 'grid'"
			class="mb-4 overflow-hidden">
			<v-row dense>
				<v-col
					cols="3"
					v-for="result in isbnStore.results"
					:key="result.isbn">
					<v-card
						variant="flat"
						class="mb-4 overflow-hidden"
						color="surface-variant"
						:title="result.title"
						:subtitle="result.isbn">
						<v-img
							:src="result.covers?.medium || result.covers?.small"
							aspect-ratio="0.7"
							cover />
					</v-card>
				</v-col>
			</v-row>
		</div>
		<div
			class="d-flex flex-column gap-4 mb-4"
			v-else>
			<v-list
				lines="two"
				border
				class="rounded-lg">
				<v-list-item
					v-if="isbnStore.results.length === 0"
					class="text-center py-8">
					<v-list-item-title class="text-grey"
						>目前沒有紀錄</v-list-item-title
					>
				</v-list-item>

				<template v-else>
					<template
						v-for="(item, index) in isbnStore.results"
						:key="item.id">
						<v-list-item
							:title="item.isbn"
							:prepend-avatar="item.coverSmall">
							<template #subtitle>
								<ClientOnly>
									{{ item.time }}
								</ClientOnly>
							</template>
							<template v-slot:prepend>
								<v-avatar
									rounded="lg"
									size="50"
									class="cursor-pointer"
									@click.stop="
										showZoom(
											item.covers?.large ||
												item.covers?.medium ||
												item.covers?.small
										)
									">
									<v-img
										:src="item.covers?.small"
										alt="cover"></v-img>
								</v-avatar>
							</template>
							<v-list-item-content>
								{{ item.title }}, {{ item.authors.join(', ') }},
								{{ item.publisher }}, {{ item.publishDate }},{{
									item.pages
								}}
							</v-list-item-content>
							<template v-slot:append>
								<v-btn
									icon="mdi-delete"
									variant="text"
									color="grey-lighten-1"
									@click="
										isbnStore.deleteResult(item.id)
									"></v-btn>
							</template>
						</v-list-item>

						<v-divider
							v-if="index < isbnStore.results.length - 1"
							class="border-opacity-25"></v-divider>
					</template>
				</template>
			</v-list>
		</div>
		<v-dialog
			v-model="zoomDialog"
			max-width="400"
			class="rounded-lg">
			<v-card>
				<v-toolbar
					color="transparent"
					density="compact">
					<v-toolbar-title class="text-subtitle-1"
						>書封</v-toolbar-title
					>
					<v-spacer></v-spacer>
					<v-btn
						icon="mdi-close"
						@click="zoomDialog = false"></v-btn>
				</v-toolbar>
				<v-img
					:src="selectedImg"
					width="100%"
					min-height="300"
					cover>
					<template v-slot:placeholder>
						<div class="fill-height bg-grey-lighten-4">
							<v-progress-linear
								color="grey-lighten-1"
								indeterminate />
						</div>
					</template>
				</v-img>
			</v-card>
		</v-dialog>
	</v-container>
</template>

<script setup>
	// 1. 引入剛剛定義的倉庫
	import { useIsbnStore } from '~/stores/isbnStore';

	// 2. 實例化它，這樣 template 才能讀到 isbnStore
	const isbnStore = useIsbnStore();
	const zoomDialog = ref(false);
	const selectedImg = ref('');
	const viewMode = ref('list');

	// 這裡不需要寫任何 function，除非你想做「刪除」或「清空」功能
	const clearAll = () => {
		if (confirm('確定要清空所有紀錄嗎？')) {
			isbnStore.results = [];
			isbnStore.nextId = 1;
		}
	};

	const showZoom = (imgUrl) => {
		selectedImg.value = imgUrl;
		zoomDialog.value = true;
	};
</script>
