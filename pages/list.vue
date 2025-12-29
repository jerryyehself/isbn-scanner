<template>
	<v-container class="h-100 d-flex flex-column">
		<v-toolbar
			color="transparent"
			class="mb-4">
			<v-toolbar-title class="text-h5 font-weight-bold">
				掃描紀錄
				<span class="text-caption text-grey ml-2"
					>共 {{ isbnStore.results.length }} 筆</span
				>
			</v-toolbar-title>

			<v-spacer></v-spacer>
			<div class="d-flex ga-2">
				<v-btn
					color="success"
					variant="tonal"
					prepend-icon="mdi-export"
					@click=""
					:disabled="isbnStore.results.length === 0">
					匯出
				</v-btn>
				<v-btn
					color="error"
					variant="tonal"
					prepend-icon="mdi-delete-sweep"
					@click="clearAll"
					:disabled="isbnStore.results.length === 0">
					清空
				</v-btn>
			</div>
		</v-toolbar>

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
						:subtitle="item.time">
						<template v-slot:prepend>
							<v-avatar
								color="primary"
								variant="tonal"
								size="small">
								<span class="text-caption">{{ item.id }}</span>
							</v-avatar>
						</template>

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
	</v-container>
</template>

<script setup>
	// 1. 引入剛剛定義的倉庫
	import { useIsbnStore } from '~/stores/isbnStore';

	// 2. 實例化它，這樣 template 才能讀到 isbnStore
	const isbnStore = useIsbnStore();

	// 這裡不需要寫任何 function，除非你想做「刪除」或「清空」功能
	const clearAll = () => {
		if (confirm('確定要清空所有紀錄嗎？')) {
			isbnStore.results = [];
			isbnStore.nextId = 1;
		}
	};
</script>
