<template>
    <q-dialog v-model="ui.isOpen" persistent :maximized="$q.screen.lt.sm" transition-show="fade" transition-hide="fade">
        <q-card class="zoom-card responsive-modal-card"
            :style="$q.screen.gt.xs ? 'min-width: 700px; max-width: 90vw;' : 'width: 100vw;'">
            <q-card-section class="row items-center q-pb-none">
                <div class="text-h6 text-grey-9 text-uppercase letter-spacing-1 size-adaptive-title">
                    {{ ui.modalTitle }}
                </div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup @click="ui.closeModal" />
            </q-card-section>

            <q-card-section class="q-pa-md-lg q-pa-sm">
                <component :is="ui.view" :data="ui.editData" @success="ui.closeModal" />
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script setup>
import { useUiStore } from 'src/stores/uiStore'
const ui = useUiStore()
</script>

<style scoped>
.responsive-modal-card {
    border-radius: 16px;
}

@media (max-width: 599px) {
    .responsive-modal-card {
        border-radius: 0;
    }

    .size-adaptive-title {
        font-size: 1.1rem;
    }
}

@keyframes zoomIn {
    from {
        opacity: 0;
        transform: scale(0.9);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

.zoom-card {
    animation: zoomIn 0.2s ease-out;
}

.letter-spacing-1 {
    letter-spacing: 1px;
}
</style>