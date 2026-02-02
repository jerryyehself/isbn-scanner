<template>
	<v-container class="d-flex flex-column h-100 w-100">
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
				height="40"
				@click="exportDialog = true">
				<v-icon size="22">mdi-export</v-icon>
				<v-tooltip
					activator="parent"
					location="bottom">
					匯出資料
				</v-tooltip>
			</v-btn>
			<ExportDialog v-model="exportDialog" />
			<v-btn
				color="error"
				variant="tonal"
				@click="clearAll"
				:disabled="isbnStore.results.length === 0"
				class="me-4"
				height="40">
				<v-icon size="22">mdi-delete-sweep</v-icon>
				<v-tooltip
					activator="parent"
					location="bottom">
					全部刪除
				</v-tooltip>
			</v-btn>
			<!-- <template v-slot:default>
				<v-form
					ref="exportForm"
					@submit.prevent="submitExport">
					<v-card title="請選擇匯出方式">
						<v-divider></v-divider>
						<v-card-text class="px-4">
							<v-radio-group
								v-model="dialog"
								:rules="exportRule">
								<div
									v-for="item in exportList"
									:key="item.value"
									class="mb-2">
									<v-radio
										:label="item.title"
										:value="item.value" />

									<v-expand-transition
										v-if="
											dialog === item.value &&
											item.value !== 'local'
										"
										class="ml-6 mt-2">
										<v-text-field
											density="compact"
											:rules="item.rules"
											v-model="
												exportStore.results[
													item.value === 'email'
														? 'email'
														: 'googleSheetKey'
												]
											"
											:label="`請輸入 ${item.sub}`" />
									</v-expand-transition>
								</div>
							</v-radio-group>
						</v-card-text>
						<v-divider></v-divider>
						<v-card-actions>
							<v-btn
								text="關閉"
								@click="exportDialog = false"></v-btn>

							<v-spacer></v-spacer>

							<v-btn
								color="surface-variant"
								text="確認"
								variant="flat"
								type="submit"></v-btn>
						</v-card-actions>
					</v-card>
				</v-form>
			</template> -->
			<v-btn-toggle
				v-model="viewMode"
				mandatory
				border
				divided
				density="comfortable"
				height="40">
				<v-btn
					value="list"
					icon>
					<v-icon>mdi-view-list</v-icon>
					<v-tooltip
						activator="parent"
						location="bottom">
						條列檢視
					</v-tooltip>
				</v-btn>
				<v-btn
					value="grid"
					icon>
					<v-icon>mdi-view-grid</v-icon>
					<v-tooltip
						activator="parent"
						location="bottom">
						網格檢視
					</v-tooltip>
				</v-btn>
			</v-btn-toggle>
		</v-toolbar>
		<v-sheet
			class="flex-grow-1 d-flex align-center justify-center"
			v-if="isbnStore.results.length === 0">
			目前沒有紀錄
		</v-sheet>
		<v-sheet v-else>
			<div
				v-if="viewMode == 'grid'"
				class="overflow-y-auto px-2 flex-grow-1">
				<v-row
					dense
					align="start">
					<v-col
						cols="12"
						sm="2"
						v-for="item in isbnStore.results"
						:key="item.isbn">
						<v-card
							variant="flat"
							class="rounded overflow-hidden"
							color="surface-variant">
							<v-img
								:src="item.covers?.medium || item.covers?.small"
								aspect-ratio="0.7"
								cover
								class="align-end">
								<div
									class="pa-2 text-white d-flex align-center justify-between"
									style="background: rgba(0, 0, 0, 0.5)">
									<!-- 左側文字區 -->
									<div class="flex-grow-1 min-w-0">
										<div
											class="text-subtitle-2 text-truncate">
											{{ item.title }}
										</div>
										<div class="text-caption opacity-80">
											{{ item.isbn }}
										</div>
									</div>

									<!-- 右側刪除鈕 -->
									<v-btn
										icon="mdi-delete"
										variant="text"
										color="grey-lighten-1"
										@click="
											isbnStore.deleteResult(item.id)
										" />
								</div>
							</v-img>
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
									class="cursor-pointer">
									<v-tooltip
										activator="parent"
										location="top">
										<v-card
											variant="flat"
											class="bg-transparent"
											max-width="150">
											<v-img
												:src="item.covers?.medium"
												width="150"
												aspect-ratio="0.7"
												cover
												class="rounded shadow-lg">
											</v-img>
										</v-card>
									</v-tooltip>
									<v-img
										:src="item.covers?.small"
										alt="cover">
										<template #placeholder>
											<div
												class="d-flex align-center justify-center fill-height">
												<v-progress-circular
													indeterminate
													size="24" />
											</div>
										</template>
									</v-img>
								</v-avatar>
							</template>
							<v-list-item-content>
								{{ item.title }}, {{ item.authors.join(', ') }},
								{{ item.publisher }}, {{ item.publishDate }},{{
									item.pages
								}}
							</v-list-item-content>
							<template v-slot:append>
								<span
									class="text-grey-lighten-1 text-caption mr-2"
									>{{ item.scanTimeSpan }}</span
								>
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
				</v-list>
			</div>
		</v-sheet>

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
	import { useExportStore } from '~/stores/exportStore';
	import ExportDialog from '@/components/ExportDialog.vue';

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

	const exportStore = useExportStore();
	const dialog = ref(null);
	const exportDialog = ref(false);
	const exportRule = [(v) => !!v || '請選擇匯出方式'];
	const isActive = ref(false);
	const pathRules = [
		(v) => !!v || '請輸入金鑰',
		(v) => v?.length >= 3 || '路徑至少 3 個字',
	];

	const emailRules = [
		(v) => !!v || '請輸入 email 地址',
		(v) => /^https?:\/\//.test(v) || 'email格式錯誤',
	];
	const exportForm = ref(null);
	const submitExport = async () => {
		const { valid } = await exportForm.value.validate();
		if (!valid) return;

		exportDialog.value = false; // ✅ 真正關掉 dialog
	};

	const exportList = [
		{
			value: 'local',
			title: '本地端',
			sub: '',
			disabled: false,
		},
		{
			value: 'email',
			title: 'Email',
			sub: 'Email地址',
			disabled: exportStore.results.email === '',
			rules: emailRules,
		},
		{
			value: 'googleSheets',
			title: 'Google Sheets',
			sub: 'Google Sheets金鑰',
			disabled: exportStore.results.googleSheetKey === '',
			rules: pathRules,
		},
	];
</script>
