import { defineStore } from 'pinia'
import axios from '@axios'

const baseUrl = process.env.VUE_APP_BASE_URL 
export const useAuthStore = defineStore('authStore', {
  state: () => ({}),
  getters: {}, 
  actions: {
    changePasswordProfile(credentials) {
      return axios.post(baseUrl + 'change-password', credentials).then(response => response)
    },
  },
})
