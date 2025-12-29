<template>
	<v-container
		class="d-flex flex-column align-center justify-center"
		style="min-height: 70vh">
		<v-btn
			v-if="!isScanning"
			class="d-flex align-center justify-center flex-column ga-2"
			style="width: 20em; height: 20em; border: 2px dashed #ccc"
			variant="text"
			@click="startScan">
			<div
				class="d-flex flex-column align-center justify-center w-100 h-100 ga-4">
				<v-icon
					size="128"
					color="primary"
					icon="mdi-barcode-scan" />
				<span class="text-h6 font-medium">點擊開始掃描 ISBN</span>
			</div>
		</v-btn>

		<v-card
			v-else
			class="w-100"
			max-width="500"
			elevation="4">
			<v-toolbar
				color="primary"
				density="compact">
				<v-toolbar-title>正在讀取條碼...</v-toolbar-title>
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
	</v-container>
</template>

<script setup>
	import { ref, nextTick } from 'vue';
	// import { Html5QrcodeScanner } from 'html5-qrcode';
	import { Html5Qrcode } from 'html5-qrcode';
	import isbn from 'isbn3';
	import { useIsbnStore } from '~/stores/isbnStore';

	const isbnStore = useIsbnStore();
	const isScanning = ref(false);
	let scannerInstance = null; // 用來存放掃描器實例
	let html5QrCode = null;

	// // 啟動掃描
	// const startScan = async () => {
	// 	isScanning.value = true;

	// 	// 重要：等待 Vue 完成 DOM 渲染，確保 #scanner 已經在 template 中出現
	// 	await nextTick();

	// 	scannerInstance = new Html5QrcodeScanner('scanner', {
	// 		fps: 10,
	// 		qrbox: { width: 280, height: 180 }, // 針對長條形 ISBN 調整
	// 		facingMode: { exact: 'environment' },
	// 		resolution: 1024, //解析度
	// 		scale: 5.0, //啟用等比縮放
	// 		area: 0.3, //擴展QR code的區域
	// 		findLight: true, //尋找光點
	// 		colorInvert: true, //色彩反轉
	// 		angle: -90, //設置掃描視角
	// 		minimumBlur: 0.01, //最小模糊程度
	// 		cameraIdOrConfig: {
	// 			facingMode: 'environment',
	// 			zoom: 3.0,
	// 		}, //設定鏡頭的縮放比例
	// 	});

	// 	scannerInstance.render((barcode) => {
	// 		// 驗證 ISBN
	// 		const parsed = isbn.parse(barcode);
	// 		if (parsed) {
	// 			// 1. 存入 Store (會自動處理重複與流水號)
	// 			isbnStore.addResult(parsed.isbn13);

	// 			// 2. 停止掃描並釋放相機
	// 			stopScan();

	// 			// 3. 成功後自動跳轉到清單頁面
	// 			navigateTo('/list');
	// 		}
	// 	});
	// };

	// // 停止並清除掃描器
	// const stopScan = () => {
	// 	if (scannerInstance) {
	// 		scannerInstance.clear(); // 清除 html5-qrcode 產生的 DOM
	// 		scannerInstance = null;
	// 	}
	// 	isScanning.value = false;
	// };
	const startScan = async () => {
		isScanning.value = true;
		await nextTick();

		html5QrCode = new Html5Qrcode('scanner');

		await html5QrCode.start(
			{
				facingMode: { exact: 'environment' }, // 後鏡頭
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
