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
					style="height: 50%; width: 25%; border: 2px dashed #ccc"
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
					class=""
					style="height: 100%; width: 100%"
					elevation="4">
					<v-toolbar
						color="white"
						density="compact">
						<v-spacer></v-spacer>
						<v-btn
							icon="mdi-close"
							@click="stopScan"></v-btn>
					</v-toolbar>

					<div
						id="scanner"
						class="w-100"></div>

					<v-card-text class="text-center">
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
				class="flex-grow-1 d-flex flex-column align-center justify-center bg-white pa-6">
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
			</v-sheet>
		</v-col>
	</v-row>
</template>

<script setup>
	import { ref, nextTick } from 'vue';
	import { Html5Qrcode } from 'html5-qrcode';
	import isbn from 'isbn3';
	import { useIsbnStore } from '~/stores/isbnStore';

	const isbnStore = useIsbnStore();
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
				qrbox: { width: 280, height: 180 }, // ISBN 長條
				aspectRatio: 16 / 9,
				disableFlip: true,
			},
			(decodedText) => {
				const parsed = isbn.parse(decodedText);
				if (parsed) {
					isbnStore.addResult(parsed.isbn13);
					stopScan();
					navigateTo('/list');
				}
			}
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
