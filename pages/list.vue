<template>
	<v-container class="h-100 d-flex flex-column pa-4 overflow-hidden">
		<v-toolbar
			color="transparent"
			class="flex-shrink-0 mb-4"
		>
			<v-toolbar-title>
				<v-list-item-title class="text-h5 font-weight-bold">掃描紀錄</v-list-item-title>
				<v-list-item-subtitle class="text-caption text-grey">
					共 {{ isbnStore.results.length }} 筆
				</v-list-item-subtitle>
			</v-toolbar-title>
		</v-toolbar>
		<div
			class="flex-grow-1 overflow-y-auto mb-4"
			style="min-height: 0"
		>
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
						<v-list-item :title="item.isbn">
							<template #subtitle>
								<ClientOnly>
									{{ item.time }}
								</ClientOnly>
							</template>
							<template v-slot:prepend>
								<v-avatar
									color="primary"
									variant="tonal"
									size="small"
								>
									<span class="text-caption">{{
										item.id
									}}</span>
								</v-avatar>
							</template>

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

						<v-divider
							v-if="index < isbnStore.results.length - 1"
							class="border-opacity-25"
						></v-divider>
					</template>
				</template>
			</v-list>
		</div>
		<div class="d-flex ga-5 justify-center flex-shrink-0">
			<v-btn
				variant="tonal"
				prepend-icon="mdi-export"
				@click=""
				text="匯出"
				:disabled="isbnStore.results.length === 0 || exportStore.results.fields.length === 0 || exportStore.results.fileType === ''"
			/>
			<v-dialog
				width="auto"
				scrollable
			>
				<template v-slot:activator="{ props: activatorProps }">
					<v-btn
						prepend-icon="mdi-export"
						text="匯出"
						v-bind="activatorProps"
					></v-btn>
				</template>

				<template v-slot:default="{ isActive }">
					<v-card>
						<v-card-text class="px-4">
							<v-radio-group
								v-model="dialog"
								messages="請選擇一種匯出方式"
							>
								<v-radio
									v-for="item in exportList"
									:key="item.value"
									:label="item.title"
									:value="item.value"
								/>
								<v-expand-transition
									v-if="dialog !== 'local' && dialog !== null"
									class="ml-6 mt-2"
								>
									<v-text-field
										density="compact"
										label="請輸入"
									/>
								</v-expand-transition>

							</v-radio-group>
						</v-card-text>

						<v-divider></v-divider>

						<v-card-actions>
							<v-btn
								text="關閉"
								@click="isActive.value = false"
							></v-btn>

							<v-spacer></v-spacer>

							<v-btn
								color="surface-variant"
								text="確認"
								variant="flat"
								@click="isActive.value = false"
								:disabled="!dialog"
							></v-btn>
						</v-card-actions>
					</v-card>
				</template>
			</v-dialog>
			<v-btn
				color="error"
				variant="tonal"
				prepend-icon="mdi-delete-sweep"
				@click="clearAll"
				:disabled="isbnStore.results.length === 0"
				text="清空"
			/>

		</div>
	</v-container>
</template>

<script setup>
import { useIsbnStore } from '@/stores/isbnStore';
import { useExportStore } from '@/stores/exportStore';

const exportStore = useExportStore();
const isbnStore = useIsbnStore();
const dialog = ref(null);
isbnStore.addResult('9789571375673'); // for test
isbnStore.addResult('9789571375674'); // for test
isbnStore.addResult('9789571375675'); // for test
isbnStore.addResult('9789571375676'); // for test
isbnStore.addResult('9789571375677'); // for test
isbnStore.addResult('9789571375678'); // for test
isbnStore.addResult('9789571375679'); // for test
isbnStore.addResult('9789571375699'); // for test
isbnStore.addResult('9789571375689'); // for test
isbnStore.addResult('9789571375669'); // for test
const exportList = [{
	value: 'local',
	title: '本地端',
	disabled: false,
}, {
	value: 'email',
	title: 'Email',
	disabled: exportStore.results.email === '',
}, {
	value: 'googleSheets',
	title: 'Google Sheets',
	disabled: exportStore.results.googleSheetKey === '',
}]

const clearAll = () => {
	if (confirm('確定要清空所有紀錄嗎？')) {
		isbnStore.results = [];
		isbnStore.nextId = 1;
	}
};
</script>
