<template>
    <v-item-group
        v-if="tab == 'source'"
        v-model="selected"
        class="d-flex ga-5 flex-column pa-4 w-100"
    >
        <v-item
            v-for="source in sources"
            :key="source.value"
            :value="source.value"
        >
            <template #default="{ isSelected, toggle }">
                <v-card
                    :ripple="!isSelected"
                    :variant="isSelected ? 'outlined' : 'elevated'"
                    :elevation="isSelected ? 0 : 2"
                    @click="!isSelected ? toggle() : null"
                    :class="[
                        'pa-4 w-100 transition-all',
                        isSelected ? 'locked-card' : 'cursor-pointer',
                    ]"
                >
                    <v-card-title class="pa-0 font-weight-bold">
                        {{ source.title }}
                    </v-card-title>

                    <v-expand-transition>
                        <div
                            v-if="isSelected"
                            class="mt-4 d-flex flex-column ga-4"
                            @click.stop
                        >
                            <v-combobox
                                v-model="fileTypeSelected"
                                :items="source.params.fileType"
                                label="檔案類型"
                                variant="outlined"
                                density="compact"
                            />
                            <v-combobox
                                v-model="attributesSelected"
                                :items="source.params.attributes"
                                label="匯出欄位"
                                variant="outlined"
                                density="compact"
                                chips
                                multiple
                            />
                        </div>
                    </v-expand-transition>
                </v-card>
            </template>
        </v-item>
    </v-item-group>
</template>
<script setup>
import { ref, nextTick, shallowRef } from 'vue';

const tab = ref('source');
const selected = ref(null);
const fileTypeSelected = ref([]);
const attributesSelected = ref([]);
const sources = [
    {
        title: '臺灣書目整合查詢系統',
        value: 'ncl',
        to: '/',
        params: {
            fileType: ['csv', 'xlsx'],
            attributes: [
                'title',
                'subtitle',
                'author',
                'publisher',
                'pubYear',
                'isbn',
            ],
        },
    },
    {
        title: '全國圖書書目資訊網',
        value: 'nbinet',
        to: '/list',
        params: {
            fileType: ['csv', 'xlsx'],
            attributes: [
                'title',
                'subtitle',
                'author',
                'publisher',
                'pubYear',
                'isbn',
            ],
        },
    },
];
</script>