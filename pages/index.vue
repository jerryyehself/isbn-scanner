<template>
	<v-row
		class="fill-height ma-0 align-center justify-center bg-grey-lighten-3">
		<v-col class="pa-0 h-100 d-flex flex-column overflow-hidden">
			<div
				style="height: 15em"
				class="d-flex align-center justify-center flex-column ga-2">
				<v-btn
					v-if="!isScanning"
					variant="text"
					style="
						width: 100%;
						max-width: 360px;
						height: 96px;
						border: 2px dashed #ccc;
					"
					@click="startScan">
					<div class="d-flex flex-column align-center justify-center">
						<v-icon
							size="64"
							color="primary"
							icon="mdi-barcode-scan" />
						<span class="text-h6 font-medium"
							>點擊開始掃描 ISBN</span
						>
					</div>
				</v-btn>

				<v-card
					v-else
					class="w-100 h-100 d-flex flex-column"
					elevation="4">
					<v-toolbar
						color="white"
						density="compact"
						style="height: 48px; flex-shrink: 0">
						<v-spacer />
						<v-btn
							icon="mdi-close"
							@click="stopScan" />
					</v-toolbar>

					<div
						class="flex-grow-1 overflow-hidden d-flex align-center justify-center bg-black">
						<div
							id="scanner"
							class="w-100 h-100"></div>
					</div>

					<!-- 提示文字不撐高 -->
					<v-card-text class="text-center py-1 flex-shrink-0">
						<v-chip
							prepend-icon="mdi-information"
							variant="text">
							請將書籍背面的 ISBN 條碼對準對焦框
						</v-chip>
					</v-card-text>
				</v-card>
			</div>

			<v-divider />

			<v-sheet
				class="flex-grow-1 d-flex flex-column align-center justify-center bg-surface overflow-hidden">
				<div
					v-if="isbnStore.results[0]"
					class="w-75 h-75 overflow-y-auto d-flex flex-column align-center">
					<scan-preview></scan-preview>
					<v-item-group class="pa-5 d-flex justify-center w-75">
						<v-row
							dense
							class="w-100"
							style="gap: 8px">
							<v-col
								v-for="(action, index) in bookActions"
								:key="index"
								class="d-flex"
								cols>
								<v-item
									v-slot="{
										isSelected,
										selectedClass,
										toggle,
									}">
									<v-card
										:class="[
											'd-flex align-center justify-center',
											selectedClass,
										]"
										height="40"
										dark
										@click="toggle"
										class="w-100">
										{{ action.title }}
									</v-card>
								</v-item>
							</v-col>
						</v-row>
					</v-item-group>
				</div>
				<div v-else>
					<v-icon
						size="64"
						color="grey-lighten-2"
						icon="mdi-book-open-variant" />
					<div class="text-h6 text-medium-emphasis mt-4 text-center">
						請將 ISBN 條碼置於畫面中央
					</div>
					<div class="text-caption text-grey-darken-1 mt-2">
						掃描完成後將自動顯示書籍資訊
					</div>
				</div>
			</v-sheet>
		</v-col>
	</v-row>
</template>

<script setup>
	import { ref, nextTick } from 'vue';
	import { Html5Qrcode } from 'html5-qrcode';
	import isbn from 'isbn3';
	import { useIsbnStore } from '~/stores/isbnStore';
	import ScanPreview from '~/components/ScanPreview.vue';
	import list from './list.vue';

	const bookActions = [
		{ title: '默認加入', icon: 'mdi-information' },
		{ title: '加入', icon: 'mdi-book-plus' },
		{ title: '刪除', icon: 'mdi-export' },
	];

	const isbnStore = useIsbnStore();
	isbnStore.addResultWithFetch('0789312239');
	isbnStore.addResultWithFetch('9787537815789');

	const isScanning = ref(false);
	let html5QrCode = null;

	const startScan = async () => {
		isScanning.value = true;
		await nextTick();

		html5QrCode = new Html5Qrcode('scanner');

		await html5QrCode.start(
			{
				facingMode: 'environment', // 後鏡頭
			},
			{
				fps: 10,
				// 強制要求 1:1 或特定的寬高比有助於計算中心點
				aspectRatio: 1.0,
				qrbox: (vw, vh) => {
					// 這裡的 vw, vh 是掃描容器的寬高
					const width = Math.min(vw * 0.8, 300);
					const height = width * 0.4; // 適合 ISBN 的長方形
					return { width, height };
				},
				disableFlip: true,
			},
			(decodedText) => {
				const parsed = isbn.parse(decodedText);
				if (parsed) {
					isbnStore.addResultWithFetch(parsed.isbn13);
					// stopScan();
					// navigateTo('/list');
				}
			},
		);
	};

	const stopScan = async () => {
		if (html5QrCode) {
			await html5QrCode.stop();
			await html5QrCode.clear();
			html5QrCode = null;
		}
		isScanning.value = false;
	};
</script>
<style scoped>
	/* 1. 強制讓套件產生的 video 填滿容器並保持置中 */
	#scanner :deep(video) {
		width: 100% !important;
		height: 100% !important;
		object-fit: cover;
		/* 讓相機畫面填滿整個區域，不留黑邊 */
	}

	/* 2. 處理套件產生的中間層容器 (通常是個 div) */
	#scanner :deep(div) {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	/* 3. 修正對焦框 (qrbox) 的位置 */
	#scanner :deep(canvas) {
		position: absolute;
		top: 50% !important;
		left: 50% !important;
		transform: translate(-50%, -50%) !important;
	}
</style>
