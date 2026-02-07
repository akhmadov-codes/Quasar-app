import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    currentProduct: null,
    loading: false,
    error: null,
    totalCount: 0,
    nextPage: null,
    previousPage: null,
  }),

  actions: {
    async fetchProducts(page = 1) {
      this.loading = true
      try {
        const response = await api.get(`/products/?page=${page}`)
        this.products = response.data.results
        this.totalCount = response.data.count
        this.nextPage = response.data.next
        this.previousPage = response.data.previous
      } catch (error) {
        this.error = 'Mahsulotlarni yuklashda xato'
        console.error('Xato:', error)
      } finally {
        this.loading = false
      }
    },
    async fetchProductById(id) {
      this.loading = true
      this.currentProduct = null
      try {
        const response = await api.get(`/products/${id}/`)
        this.currentProduct = response.data
      } catch {
        this.error = 'Mahsulot topilmadi'
      } finally {
        this.loading = false
      }
    },
    async addProduct(formData) {
      this.loading = true
      try {
        const response = await api.post('/products/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        this.products.unshift(response.data)
        return true
      } catch (error) {
        console.error("Qo'shishda xato:", error)
        return false
      } finally {
        this.loading = false
      }
    },
    async updateProduct(id, formData) {
      this.loading = true
      try {
        const response = await api.patch(`/products/${id}/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        const index = this.products.findIndex((p) => p.id === id)
        if (index !== -1) {
          this.products[index] = response.data
        }
        this.currentProduct = response.data
        return true
      } catch (error) {
        console.error('Tahrirlashda xato:', error)
        if (error.response) {
          console.log('Backend javobi:', error.response.data)
        }
        return false
      } finally {
        this.loading = false
      }
    },
    async deleteProduct(id) {
      try {
        await api.delete(`/products/${id}/`)
        this.products = this.products.filter((p) => p.id !== id)
        return true
      } catch (error) {
        console.error("O'chirishda xato:", error)
        return false
      }
    },
  },
})
