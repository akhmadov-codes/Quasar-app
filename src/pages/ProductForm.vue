<template>
    <q-form @submit="onSubmit" class="q-gutter-y-md">
        <q-input v-model="form.name" label="Mahsulot nomi *" outlined dense :rules="[val => !!val || 'Majburiy']" />
        <div class="row q-col-gutter-sm">
            <div class="col-6">
                <q-input v-model="form.price" label="Narxi *" type="number" outlined dense />
            </div>
            <div class="col-6">
                <q-input v-model="form.discount" label="Chegirma (%)" type="number" outlined dense suffix="%" />
            </div>
        </div>
        <q-select v-model="form.category" :options="categoryOptions" label="Kategoriyani tanlang *" outlined dense
            emit-value map-options :rules="[val => !!val || 'Kategoriyani tanlang']" />
        <q-file v-model="form.image" label="Rasm tanlang" outlined dense accept="image/*" @clear="form.image = null">
            <template v-slot:prepend><q-icon name="cloud_upload" /></template>
        </q-file>
        <q-input v-model="form.description" label="Tavsif" type="textarea" outlined dense rows="10" />
        <div class="row justify-end q-gutter-x-sm">
            <q-btn label="Bekor qilish" flat color="grey-7" @click="$emit('success')" />
            <q-btn :label="data ? 'Yangilash' : 'Saqlash'" color="primary" unelevated type="submit"
                :loading="productStore.loading" />
        </div>
    </q-form>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue'
import { useProductStore } from 'src/stores/productStore'
import { useQuasar } from 'quasar'

const props = defineProps(['data'])
const emit = defineEmits(['success'])
const productStore = useProductStore()
const $q = useQuasar()

const oldImageUrl = ref(null)

const categoryOptions = [
    { label: 'Noutbuk', value: 2 }
]

const form = reactive({
    name: '',
    price: '',
    discount: 0,
    category: null,
    image: null,
    description: ''
})

onMounted(() => {
    if (props.data) {
        form.name = props.data.name
        form.price = props.data.price
        form.discount = props.data.discount
        form.description = props.data.description
        form.category = props.data.category?.id || props.data.category
        oldImageUrl.value = props.data.image
    }
})

const onSubmit = async () => {
    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('price', form.price)
    formData.append('discount', form.discount || 0)
    formData.append('category', form.category)
    formData.append('description', form.description || '')
    if (form.image instanceof File) {
        formData.append('image', form.image)
    }
    const success = props.data
        ? await productStore.updateProduct(props.data.id, formData)
        : await productStore.addProduct(formData)
    if (success) {
        $q.notify({ color: 'positive', position: 'top', timeout: 2000, message: 'Muvaffaqiyatli saqlandi!', icon: 'check' })
        emit('success')
    } else {
        $q.notify({ color: 'negative', position: 'top', timeout: 2000, message: 'Xatolik yuz berdi' })
    }
}
</script>