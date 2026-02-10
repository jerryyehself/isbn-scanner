<template>
	<v-dialog
		v-model="model"
		width="500">
		<v-form ref="exportForm">
			<v-card>
				<v-toolbar
					density="compact"
					color="transparent">
					<v-toolbar-title>{{ book.title }}</v-toolbar-title>

					<v-btn
						icon="mdi-close"
						variant="text"
						size="small"
						@click="model = false" />
				</v-toolbar>

				<v-card-text>
					<v-textarea
						clearable
						label="註記"
						v-model="book.notes" />
					<!-- <v-btn
						icon="mdi-plus"
						size="small"
						density="comfortable"
						variant="plain"
					/> -->
				</v-card-text>
			</v-card>
		</v-form>
	</v-dialog>
	<v-snackbar
		:timeout="2000"
		color="success"
		variant="outlined" />
</template>
<script setup>
	const model = defineModel({ type: Boolean });
	const book = defineModel('book', { type: Object });
</script>
