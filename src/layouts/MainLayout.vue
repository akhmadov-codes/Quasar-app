<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-1" style="height: 105vh;">
    <GlobalModal />
    <q-header bordered class="bg-white text-grey-9">
      <q-toolbar>
        <q-btn flat dense round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title class="text-weight-bold">
        </q-toolbar-title>
        <q-space />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above :width="280" class="sidebar-dark text-white">
      <div class="column full-height">
        <div class="q-pa-lg text-center">
          <div class="logo-container q-mx-auto">
            <q-icon name="shopping_bag" size="80px" color="blue-7" />
          </div>
          <div class="text-h6 q-mt-md text-weight-bold">Furor Progress Product</div>
          <div class="text-caption text-grey-5">Boshqaruv paneli</div>
          <q-btn @click="openCreate()" unelevated rounded color="blue-7" icon="add" label="Yangi Mahsulot"
            class="full-width q-mt-lg py-md text-weight-bold" />
        </div>
        <q-list class="q-px-sm">
          <q-item @click="openHome()" clickable v-ripple class="menu-item">
            <q-item-section avatar>
              <q-icon name="grid_view" />
            </q-item-section>
            <q-item-section class="text-weight-medium">Bosh sahifa</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/" active-class="active-menu" exact class="menu-item">
            <q-item-section avatar>
              <q-icon name="inventory_2" />
            </q-item-section>
            <q-item-section>Mahsulotlar</q-item-section>
            <q-item-section side>
            </q-item-section>
          </q-item>
        </q-list>

        <q-space />
      </div>
    </q-drawer>

    <q-page-container>
      <router-view class="router" v-slot="{ Component }">
        <transition name="fade-page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useUiStore } from 'src/stores/uiStore'
import GlobalModal from 'components/GlobalModal.vue'
import ProductForm from 'pages/ProductForm.vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const ui = useUiStore()
const leftDrawerOpen = ref(false)
const openCreate = () => {
  ui.toggleModal(ProductForm, 'Yangi mahsulot yaratish')
}
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
function openHome() {
  $q.notify({ color: 'positive', position: 'top', timeout: 2000, message: 'Sahifa mavjud emas !' });
}
</script>

<style>
.fade-page-enter-active,
.fade-page-leave-active {
  transition: all 0.3s ease;
}

.fade-page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.router {
  padding: 40px;
}

.sidebar-dark {
  background-color: #0b1424 !important;

  .logo-container {
    width: 80px;
    height: 80px;
    background: rgba(255, 255, 255, 0.123);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .menu-item {
    border-radius: 12px;
    margin-bottom: 4px;
    color: #94a3b8;
    transition: all 0.3s ease;

  }

  .active-menu {
    background-color: #1e88e5 !important;
    color: white !important;
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  }

  .border-top-dark {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .font-13 {
    font-size: 13px;
  }

  .py-md {
    padding-top: 12px;
    padding-bottom: 12px;
  }
}
</style>