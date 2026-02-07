import { defineStore } from 'pinia'
import { markRaw } from 'vue'

export const useUiStore = defineStore('ui', {
  state: () => ({
    isOpen: false,
    view: null,
    modalTitle: '',
    editData: null,
  }),
  actions: {
    toggleModal(component, title, data = null) {
      this.isOpen = true
      this.view = markRaw(component)
      this.modalTitle = title
      this.editData = data
    },
    closeModal() {
      this.isOpen = false
      this.view = null
      this.editData = null
    },
  },
})
