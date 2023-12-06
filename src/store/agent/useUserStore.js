import axios from '@axios'
import { defineStore } from 'pinia'

const baseUrl = process.env.VUE_APP_BASE_URL 
export const useUserStore = defineStore('UserStore', {
  actions: {

    registerUser(credentials) {
      return axios.post(baseUrl + 'register', credentials).then(response => response.data)
    },
    uploadDocs(credentials, config) {
      return axios.post(baseUrl + 'kyc-image-process', credentials, config).then(response => response.data)
    },
  },
})
