import axios from '@axios'
import { defineStore } from 'pinia'

const baseUrl = process.env.VUE_APP_BASE_URL 
export const useUserProfileStore = defineStore('UserProfileStore', {
  actions: {

    fetchUserProfile(id) {
      return new Promise((resolve, reject) => {
        axios.get(baseUrl + `admin/my-profile?id=${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
  },
})
