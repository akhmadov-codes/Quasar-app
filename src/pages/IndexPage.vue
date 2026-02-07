<template>
  <q-page padding class="bg-grey-1">
    <div v-if="totalPages > 1" class="row justify-start q-mt-xl q-pb-xl">
      <q-pagination v-model="currentPage" :max="totalPages" :max-pages="6" direction-links flat square unelevated
        size="10px" padding="12px 18px" color="grey-9" active-color="primary" active-text-color="white" gutter="8px"
        @update:model-value="changePage" class="custom-pagination" />
    </div>
    <div class="row q-col-gutter-md">
      <div v-for="product in products" :key="product.id" class="col-xs-6 col-sm-4 col-md-3 col-lg-2">
        <ProductCard :product="product" @click="goToDetail" @wishlist="handleWishlist" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from 'src/stores/productStore';
import { storeToRefs } from 'pinia';
import { generateSlug } from '../utils/helpers';
import ProductCard from '../components/ProductCard.vue';

const store = useProductStore();
const route = useRoute();
const router = useRouter();
const { products, totalCount } = storeToRefs(store);
const currentPage = ref(parseInt(route.query.page) || 1);
const pageSize = 6;
const totalPages = computed(() => Math.ceil(totalCount.value / pageSize));
const goToDetail = (product) => {
  router.push({
    name: 'product-detail',
    params: { id: product.id, slug: generateSlug(product.name) }
  });
};
const handleWishlist = (product) => {
  console.log('Sevimlilarga qoʻshildi:', product.name);
};
const changePage = (page) => {
  router.push({ query: { ...route.query, page: page } });
  store.fetchProducts(page);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => store.fetchProducts(currentPage.value));
</script>

<style scoped>
:deep(.custom-pagination .q-btn) {
  border-radius: 10px !important;
  font-weight: 700;
  border: 1px solid #e0e0e0;
  transition: all 0.2s ease;
}

:deep(.custom-pagination .q-btn--actionable.q-btn--outline) {
  border-color: var(--q-primary);
}

:deep(.custom-pagination .q-btn:hover) {
  background: #f5f5f5 !important;
  border-color: #bdbdbd;
}
</style>