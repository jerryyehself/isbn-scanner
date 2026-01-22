<template>
	<v-container class="h-100 d-flex flex-column">
		<v-card
			v-for="result in isbnStore.results"
			:key="result.isbn"
			variant="flat"
			class="mb-4 overflow-hidden"
			color="surface-variant"
			max-width="200"
			:title="result.title"
			:subtitle="result.isbn"
		>
			<v-img
				:src="result.covers?.medium || result.covers?.small"
				aspect-ratio="0.7"
				cover
			/>
		</v-card>
		<!-- <v-toolbar
			color="transparent"
			class="mb-4"
		>
			<v-toolbar-title>
				<v-list-item-title class="text-h5 font-weight-bold">掃描紀錄</v-list-item-title>
				<v-list-item-subtitle class="text-caption text-grey">
					共 {{ isbnStore.results.length }} 筆
				</v-list-item-subtitle>
			</v-toolbar-title>
		</v-toolbar>
		<div class="h-100 mb-4">
			<v-list
				lines="two"
				border
				class="rounded-lg"
			>
				<v-list-item
					v-if="isbnStore.results.length === 0"
					class="text-center py-8"
				>
					<v-list-item-title class="text-grey">目前沒有紀錄</v-list-item-title>
				</v-list-item>

				<template v-else>
					<template
						v-for="(item, index) in isbnStore.results"
						:key="item.id"
					>
						<v-list-item
							:title="item.isbn"
							:prepend-avatar="item.coverSmall"
						>
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
									@click.stop="showZoom(item.covers?.large || item.covers?.medium || item.covers?.small)"
								>
									<v-img
										:src="item.covers?.small"
										alt="cover"
									></v-img>
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
										"
								></v-btn>
							</template>
</v-list-item>

<v-divider v-if="index < isbnStore.results.length - 1" class="border-opacity-25"></v-divider>
</template>
</template>
</v-list>
</div>
<v-dialog v-model="zoomDialog" max-width="400" class="rounded-lg">
	<v-card>
		<v-toolbar color="transparent" density="compact">
			<v-toolbar-title class="text-subtitle-1">書封</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn icon="mdi-close" @click="zoomDialog = false"></v-btn>
		</v-toolbar>
		<v-img :src="selectedImg" width="100%" min-height="300" cover>
			<template v-slot:placeholder>
						<div class="fill-height bg-grey-lighten-4">
							<v-progress-linear
								color="grey-lighten-1"
								indeterminate
							/>
						</div>
					</template>
		</v-img>
	</v-card>
</v-dialog>
<div class="d-flex ga-5 justify-center">
	<v-btn color="success" variant="tonal" prepend-icon="mdi-export" @click=""
		:disabled="isbnStore.results.length === 0">
		匯出
	</v-btn>
	<v-btn color="error" variant="tonal" prepend-icon="mdi-delete-sweep" @click="clearAll"
		:disabled="isbnStore.results.length === 0">
		清空
	</v-btn>
</div> -->
	</v-container>
</template>

<script setup>
// 1. 引入剛剛定義的倉庫
import { useIsbnStore } from '~/stores/isbnStore';

// 2. 實例化它，這樣 template 才能讀到 isbnStore
const isbnStore = useIsbnStore();
const zoomDialog = ref(false);
const selectedImg = ref('');

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
