import axios from '@axios'
import baseServices from './BaseService'

const url = process.env.VUE_APP_BASE_URL

export default {
  getAll(page, perPage, filter) {
    return baseServices.getRequest(url +`company/companies?page=${page}&size=${perPage}&search_key=${filter}`)

    // return axios.get(url +`company/companies?page=${page}&size=${perPage}&search_key=${filter}`).then(response => response.data);
  },
  getChooseClient(page, perPage, filter) {
    return baseServices.getRequest(url +`company/choose-client?page=${page}&size=${perPage}&search_key=${filter}`)

    // return axios.get(url +`company/companies?page=${page}&size=${perPage}&search_key=${filter}`).then(response => response.data);
  },
  getChosenClient(comId) {
    return baseServices.getRequest(url +`company/chosen-client/${comId}`)
  },

  getAllForSalesman(id, page, perPage, filter) {
    return axios.get(url +`company/sale/${id}/companies?page=${page}&size=${perPage}&search_key=${filter}`)
      .then(response => response.data)
  },
  getAllSmallApi() {
    return axios.get(url +`company/companies-small-api`).then(response => response.data)
  },
  getDetails(id) {
    return axios.get(url +`company/${id}`).then(response => response.data)
  },
  getDetailsPending(id) {
    return axios.get(url +`company/${id}/pending`).then(response => response.data)
  },
  getCompanyDocs(id) {
    return axios.get(url +`company/${id}/documents`).then(response => response.data)
  },
  createCom(credentials) {
    return axios.post(url+`company/create`, credentials).then(response => response.data)
  },
  updatePendingCom(credentials) {
    return axios.post(url+`company/pending/update`, credentials).then(response => response.data)
  },

  updateDocsData(credentials) {
    return axios.post(url+`company/documentssss/update`, credentials).then(response => response.data)
  },
  verifyPendingCom(credentials) {
    return axios.post(url+`company/verify`, credentials).then(response => response.data)
  },
  updateAccountSettingsCom(credentials) {
    return axios.post(url+`company/update-account-settings-data`, credentials).then(response => response.data)
  },
  updatePayoutPackagesSettingsDataCom(credentials) {
    return axios.post(url+`company/update-payout-packages-settings-data`, credentials).then(response => response.data)
  },
  updateVerifyPendingCom(credentials) {
    return axios.post(url+`company/verification-data`, credentials).then(response => response.data)
  },

  transferAmount(credentials){
    return axios.post(url+`company/internal-transfer`, credentials).then(response => response.data)
  },

  updatePendingComStep(credentials) {
    return axios.post(url+`company/pending/update_step`, credentials).then(response => response.data)
  },
  getWebHooks(id) {
    return axios.get(url +`company/${id}/web-hooks`).then(response => response.data)
  },
  updateWebHooks(credentials) {
    return axios.post(url+`company/web-hooks/update`, credentials).then(response => response.data)
  },

  getAllTransactionStatus() {
    return axios.get(url +`company/companies-transaction-status`).then(response => response.data)
  },
  
  getAllCompanies(transaction_status, apiStatus) {
    return axios.get(url +`company/companies?size=1000&transaction_status=${transaction_status}&status=${apiStatus}`).then(response => response.data)
  },
  getAllTransferStatistics() {
    return axios.get(url +`admin/transfer-requests-statistics`).then(response => response.data)
  },
  updateTransferStatus(credentials) {
    return axios.post(url+`admin/transfer-requests/update-status`, credentials).then(response => response.data)
  },
  getAllGroups(com_id) {
    return axios.get(url +`company/${com_id}/groups`).then(response => response.data)
  },
  assignSales(credentials) {
    return axios.post(url+`company/assign-sales`, credentials).then(response => response.data)
  },
  assignSalesToPendingCompany(credentials) {
    return axios.post(url+`company/assign-sales-to-pending-company`, credentials).then(response => response.data)
  },
  deleteSingle(credentials) {
    return axios
      .post(url+`company/company-delete`, credentials)
      .then(response => response.data)
  },
  bulkChangFeesDeduction(credentials) {
    return axios
      .post(url+`users/bulk_chang_fees_Deduction`, credentials)
      .then(response => response.data)
  },
  bulkChangGroup(credentials) {
    return axios
      .post(url+`users/bulk_chang_group`, credentials)
      .then(response => response.data)
  },
  bulkUpdateBranches(credentials) {
    return axios
      .post(url+`users/bulk_chang_branch`, credentials)
      .then(response => response.data)
  },
  bulkChangCompany(credentials) {
    return axios
      .post(url+`users/bulk_chang_company`, credentials)
      .then(response => response.data)
  },
  bulkChangePaymentMethods(credentials) {
    return axios
      .post(url+`users/bulk_chang_payment_methods`, credentials)
      .then(response => response.data)
  },
  bulkChangePayeeStatus(credentials) {
    return axios
      .post(url+`users/bulk_chang_status_company`, credentials)
      .then(response => response.data)
  },
  bulkChangePayeeStatusInSystem(credentials) {
    return axios
      .post(url+`users/bulk_chang_status_system`, credentials)
      .then(response => response.data)
  },
  bulkChangVerified(credentials) {
    return axios
      .post(url+`users/bulk_chang_verified`, credentials)
      .then(response => response.data)
  },

  /******* st payment group salary methods ********/
  storePaymentGroupLimit(credentials) {
    return axios.post(url+`company/store-payment-group-with-limit`, credentials).then(response => response.data)
  },
  deleteSaPaymentGroup(credentials) {
    return axios.post(url+`company/delete-payment-group-with-limit`, credentials).then(response => response.data)
  },

  /******* st payment group salary methods ********/
  checkCompanyReference(credentials){
    return axios.post(url+`company/transfer/check-company`, credentials).then(response => response.data)
  },

  getAllAgents() {
    return axios.get(url +`admin/get-sales-members`).then(response => response.data)
  },
    
}
