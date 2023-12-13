import axios from '@axios'
import { defineStore } from 'pinia'

const baseUrl = process.env.VUE_APP_BASE_URL 
export const useUserProfileStore = defineStore('UserProfileStore', {
  actions: {

    fetchUserProfile() {
      return axios.get(baseUrl +`get-info`).then(response => response.data)
    },
  },
})
