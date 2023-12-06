import { defineStore } from 'pinia'
import axios from '@axios'

const baseUrl = process.env.VUE_APP_BASE_URL 
export const useAuthStore = defineStore('authStore', {
  state: () => ({}),
  getters: {}, 
  actions: {
    registerUser(credentials) {
      return axios.post(baseUrl + 'register', credentials).then(response => response.data)
    },
    changePasswordProfile(credentials) {
      return axios.post(baseUrl + 'change-password', credentials).then(response => response)
    },
    enableMfa(credentials) {
      return axios.post(baseUrl + 'two-factor-authentication', credentials).then(response => response)
    },
    generateQrCode(credentials){
      return axios.get(baseUrl + `two-factor-qr-code?user_reference_number=${credentials}`).then(response => response)
    },
    generateRecoveryCode(credentials){
      return axios.get(baseUrl + `two-factor-recovery-codes?user_reference_number=${credentials}`).then(response => response)
    },
    confirmCode(credentials) {
      return axios.post(baseUrl + 'confirmed-two-factor-authentication', credentials).then(response => response)
    },
    confirm2FA(credentials) {
      return axios.post(baseUrl + 'two-factor-challenge', credentials).then(response => response)
    },
    receiveOTP(credentials) {
      return axios.post(baseUrl + `forget-password`, credentials).then(response => response.data)
    },
    sendOTP(credentials) {
      return axios.post(baseUrl +`verify-otp-for-password`, credentials).then(response => response.data)
    },
    confirmNewResetPassword(credentials) {
      return axios.post(baseUrl+`reset-password`, credentials).then(response => response.data)
    },
    reSendOTP(credentials) {
      return axios.post(baseUrl+`resend-otp`, credentials).then(response => response.data)
    },

  },
})
