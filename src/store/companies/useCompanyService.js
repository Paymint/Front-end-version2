import { defineStore } from 'pinia'
import axios from '@axios'

const baseUrl = process.env.VUE_APP_BASE_URL 
export const useCompanyService = defineStore('companyStore', {
  state: () => ({}),
  getters: {}, 
  actions: {
    getAllCompanies(transaction_status, apiStatus) {
      return axios.get(baseUrl +`company/companies?size=1000&transaction_status=${transaction_status}&status=${apiStatus}`).then(response => response.data)
    },
    getAllTransactionStatus() {
      return axios.get(baseUrl +`company/companies-transaction-status`).then(response => response.data)
    },
    getAllAgents() {
      return axios.get(baseUrl +`admin/get-sales-members`).then(response => response.data)
    },
  },
})
