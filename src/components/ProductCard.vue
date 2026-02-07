<template>
    <q-card @click="$emit('click', product)" flat class="my-product-card shadow-hover">
        <div class="image-container flex flex-center q-pa-sm">
            <q-img :src="product.image" class="product-image" fit="contain" spinner-color="primary" />
            <q-badge v-if="product.discount" color="red-7" class="absolute-top-left q-ma-sm discount-badge">
                -{{ product.discount }}%
            </q-badge>
        </div>
        <q-card-section class="q-pa-sm">
            <div class="product-title text-subtitle2">
                {{ product.name }}
            </div>
            <div class="q-mt-md">
                <div class="text-h6 text-blue-7 text-weight-bolder line-height-1">
                    {{ formatPrice(product.price) }} <small class="text-caption">so'm</small>
                </div>
            </div>
            <q-badge color="blue-1" text-color="blue-8"
                class="q-mt-sm full-width justify-center text-weight-bold installment-badge">
                {{ formatPrice(product.price / 12) }} so'm x 12 oy
            </q-badge>
        </q-card-section>
    </q-card>
</template>

<script setup>
defineProps({
    product: {
        type: Object,
        required: true
    }
});

defineEmits(['click', 'wishlist']);
const formatPrice = (val) => {
    return val ? parseFloat(val).toLocaleString('uz-UZ').replace(/,/g, ' ') : '0';
};
</script>

<style scoped>
.my-product-card {
    border-radius: 20px;
    background-color: white;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    border: 1px solid #f2f2f2;
    cursor: pointer;
    height: 100%;
}

.my-product-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08) !important;
    border-color: #2196F3;
}

.image-container {
    height: 200px;
    border-radius: 16px;
    background: white;
    position: relative;
    overflow: hidden;
}

.product-image {
    width: 85%;
    height: 85%;
}

.product-title {
    font-size: 14px;
    font-weight: 500;
    color: #2c3e50;
    line-height: 1.4;
    height: 2.8em;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.discount-badge {
    padding: 5px 10px;
    font-weight: 700;
    border-radius: 8px;
}

.hover-red:hover {
    color: #ff5252 !important;
    background: rgba(255, 82, 82, 0.1);
}

.installment-badge {
    padding: 6px;
    border-radius: 8px;
    font-size: 11px;
}

.line-height-1 {
    line-height: 1.1;
}
</style>