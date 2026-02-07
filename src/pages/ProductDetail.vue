<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from 'src/stores/productStore';
import { storeToRefs } from 'pinia';
import { useUiStore } from 'src/stores/uiStore';
import { useQuasar } from 'quasar'
import ProductForm from './ProductForm.vue';

const $q = useQuasar()
const uimodal = useUiStore()
const router = useRouter();
const route = useRoute();
const store = useProductStore();
const { currentProduct } = storeToRefs(store);

const openUpdate = () => {
    uimodal.toggleModal(ProductForm, 'Mahsulot tahrirlash', currentProduct.value)
}

const confirmDelete = () => {
    $q.dialog({
        title: 'Tasdiqlash',
        message: 'Mahsulotni o‘chirib tashlamoqchimisiz?',
        cancel: true,
        persistent: true
    }).onOk(async () => {
        const success = await store.deleteProduct(currentProduct.value.id);
        if (success) {
            $q.notify({ color: 'positive', position: 'top', timeout: 2000, message: 'Muvaffaqiyatli o\'chirildi' });
            router.push('/')
        }
    });
};

onMounted(() => {
    console.log(currentProduct.value);
    store.fetchProductById(route.params.id);
});
</script>

<template>
    <q-page padding class="bg-grey-2">
        <div v-if="currentProduct" :key="currentProduct.id" class="max-width-1200 mx-auto q-py-md">

            <div class="row items-center justify-between q-mb-xl">
                <q-btn flat no-caps icon="keyboard_backspace" label="Mahsulotlarga qaytish" color="grey-8"
                    class="rounded-pill hover-primary" @click="$router.back()" />

                <div class="q-gutter-sm">
                    <q-btn icon="edit" label="Tahrirlash" color="blue-7" unelevated class="rounded-12 px-md"
                        @click="openUpdate" />
                    <q-btn icon="delete_outline" label="O'chirish" color="red-5" flat class="rounded-12"
                        @click="confirmDelete" />
                </div>
            </div>

            <div class="row q-col-gutter-xl">
                <div class="col-12 col-md-6">
                    <q-card flat class="product-gallery-card">
                        <div class="zoom-container">
                            <q-img :src="currentProduct.image" fit="contain" class="main-product-image" />
                        </div>
                    </q-card>
                </div>

                <div class="col-12 col-md-6">
                    <div class="product-info-column">
                        <div class="text-overline text-primary text-weight-bold tracking-widest">YANGI MODEL</div>
                        <h1 class="text-h4 text-weight-bolder q-mt-xs q-mb-md color-dark">{{ currentProduct.name }}</h1>

                        <div class="row items-center q-gutter-md q-mb-lg">
                            <div class="text-h4 text-weight-bolder text-blue-9">
                                {{ parseFloat(currentProduct.price).toLocaleString() }} <span
                                    class="text-caption text-weight-medium">SO'M</span>
                            </div>
                            <q-badge color="green-1" text-color="green-9" label="Sotuvda mavjud"
                                class="q-pa-xs px-sm text-weight-bold" />
                        </div>

                        <q-separator q-my-lg color="grey-3" />

                        <div class="description-section q-mb-xl">
                            <div class="text-subtitle1 text-weight-bold q-mb-sm flex items-center">
                                <q-icon name="description" color="primary" class="q-mr-sm" />
                                Mahsulot haqida
                            </div>
                            <p class="text-body1 text-grey-8 line-height-1-8 text-height-fixed">
                                {{ currentProduct.description }}
                            </p>
                        </div>

                        <div class="specifications-section">
                            <div class="specs-grid">
                                <div v-for="(value, key) in currentProduct.specifications" :key="key" class="spec-item">
                                    <span class="spec-key">{{ key }}</span>
                                    <q-separator dotted class="col q-mx-sm spec-dots" />
                                    <span class="spec-value">{{ value }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </q-page>
</template>

<style scoped>
.max-width-1200 {
    max-width: 1200px;
    margin: auto;
}

.product-gallery-card {
    background: white;
    border-radius: 24px;
    overflow: hidden;
    transition: transform 0.3s ease;
    border: 1px solid #edf2f7;
    align-items: center;
    justify-content: center;
    min-height: 500px;
}

.main-product-image {
    max-height: 500px;
    transition: transform 0.5s ease;
}

.zoom-container:hover .main-product-image {
    transform: scale(1.01);
}

.product-info-column {
    padding-left: 20px;
}

.tracking-widest {
    letter-spacing: 0.0em;
}

.line-height-1-8 {
    line-height: 1.8;
}

.specs-grid {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.spec-item {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
}

.spec-key {
    color: #718096;
    font-weight: 500;
    white-space: nowrap;
}

.spec-value {
    color: #1a202c;
    font-weight: 700;
    text-align: right;
}

.spec-dots {
    border-bottom: 2px dotted #e2e8f0;
    height: 1px;
    margin-bottom: 4px;
}

.rounded-12 {
    border-radius: 12px;
}

.rounded-pill {
    border-radius: 50px;
}

.color-dark {
    color: #2d3748;
}

@media (max-width: 1024px) {
    .product-info-column {
        padding-left: 0;
        margin-top: 20px;
    }
}
</style>