import axios from '@axios'
import { defineStore } from 'pinia'

const baseUrl = process.env.VUE_APP_BASE_URL 
export const useUserStore = defineStore('UserStore', {
  actions: {
    getUserByNationalID(credentials) {
      return axios.post(baseUrl + 'get-user', credentials).then(response => response.data)
    },
    registerUser(credentials) {
      return axios.post(baseUrl + 'register', credentials).then(response => response.data)
    },
    uploadDocs(credentials, config) {
      return axios.post(baseUrl + 'kyc-image-process', credentials, config).then(response => response.data)
    },
    verifyUser(credentials) {
      return axios.post(baseUrl +`verify`, credentials).then(response => response.data)
    },
    getBranches() {
      return axios.get(baseUrl +`paymint-branches`).then(response => response.data)
    },
  },
})
