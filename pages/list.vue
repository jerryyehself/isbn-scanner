<template>
	<v-container class="d-flex flex-column h-100 w-100">
		<v-toolbar
			color="transparent"
			class="mb-4"
		>
			<v-toolbar-title
				class="flex-shrink-0 ml-0 font-weight-bold"
				text="掃描紀錄"
			>
				<div class="text-caption text-grey">
					共 {{ isbnStore.results.length }} 筆
				</div>
			</v-toolbar-title>
			<v-btn
				:disabled="isbnStore.results.length === 0"
				variant="tonal"
				class="me-2"
				height="40"
				@click="exportDialog = true"
			>
				<v-icon
					size="20"
					icon="mdi-export"
				/>
				<v-tooltip
					activator="parent"
					location="bottom"
					text="匯出資料"
				/>
			</v-btn>
			<ExportDialog v-model="exportDialog" />
			<v-btn
				color="error"
				variant="tonal"
				@click="clearAll"
				:disabled="isbnStore.results.length === 0"
				class="me-4"
				height="40"
			>
				<v-icon
					size="20"
					icon="mdi-delete-sweep"
				/>
				<v-tooltip
					activator="parent"
					location="bottom"
					text="刪除所有紀錄"
				/>
			</v-btn>

			<v-btn-toggle
				v-model="viewMode"
				mandatory
				border
				divided
				density="comfortable"
			>
				<v-btn
					value="list"
					icon
				>
					<v-icon
						icon="mdi-view-list"
						size="small"
					/>
					<v-tooltip
						activator="parent"
						location="bottom"
					>
						條列檢視
					</v-tooltip>
				</v-btn>
				<v-btn
					value="grid"
					icon
				>
					<v-icon
						icon="mdi-view-grid"
						size="small"
					/>
					<v-tooltip
						activator="parent"
						location="bottom"
						text="網格檢視"
					/>
				</v-btn>
			</v-btn-toggle>
		</v-toolbar>
		<v-sheet
			class="flex-grow-1 d-flex align-center justify-center"
			v-if="isbnStore.results.length === 0"
		>
			目前沒有紀錄
		</v-sheet>
		<v-sheet v-else>
			<div
				v-if="viewMode == 'grid'"
				class="overflow-y-auto px-2 flex-grow-1"
			>
				<v-row
					dense
					align="start"
				>
					<v-col
						cols="12"
						sm="2"
						v-for="item in isbnStore.results"
						:key="item.isbn"
					>
						<v-card
							variant="flat"
							class="rounded overflow-hidden"
							color="surface-variant"
						>
							<v-img
								:src="item.covers?.medium || item.covers?.small"
								aspect-ratio="0.7"
								cover
								class="align-end"
							>
								<div
									class="pa-2 text-white d-flex align-center justify-between"
									style="background: rgba(0, 0, 0, 0.5)"
								>
									<!-- 左側文字區 -->
									<div class="flex-grow-1 min-w-0">
										<div class="text-subtitle-2 text-truncate">
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
											"
									/>
								</div>
							</v-img>
						</v-card>
					</v-col>
				</v-row>
			</div>
			<div
				class="d-flex flex-column gap-4 mb-4"
				v-else
			>
				<v-list
					lines="two"
					border
					class="rounded-lg py-0"
				>
					<template
						v-for="(item, index) in isbnStore.results"
						:key="item.id"
					>
						<v-list-item class="px-0 py-0">
							<scan-preview :book="item">
								<template #timeSpan>
									<span class="text-body-2 text-grey-darken-2 align-end">
										{{ item.scanTimeSpan }}
									</span>
								</template>
							</scan-preview>
						</v-list-item>

						<v-divider
							v-if="index < isbnStore.results.length - 1"
							class="border-opacity-25"
						></v-divider>
					</template>
				</v-list>
			</div>
		</v-sheet>

		<v-dialog
			v-model="zoomDialog"
			max-width="400"
			class="rounded-lg"
		>
			<v-card>
				<v-toolbar
					color="transparent"
					density="compact"
				>
					<v-toolbar-title class="text-subtitle-1">書封</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-btn
						icon="mdi-close"
						@click="zoomDialog = false"
					></v-btn>
				</v-toolbar>
				<v-img
					:src="selectedImg"
					width="100%"
					min-height="300"
					cover
				>
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
	</v-container>
</template>

<script setup>
// 1. 引入剛剛定義的倉庫
import { useIsbnStore } from '~/stores/isbnStore';
import { useExportStore } from '~/stores/exportStore';
import ExportDialog from '@/components/ExportDialog.vue';
import ScanPreview from '@/components/ScanPreview.vue';

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
