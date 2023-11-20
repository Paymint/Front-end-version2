import axios from '@axios'
const url = process.env.VUE_APP_BASE_URL ;

export default {
    sendCompanyRequestOtp(credentials) {
        return axios
            .post(url+`company-request-otp`, credentials)
            .then(response => response.data);
    },
    checkCompanyRequestOtp(credentials) {
        return axios
            .post(url+`company-verify-otp`, credentials)
            .then(response => response.data);
    },
    storeCompanyRequest(credentials) {
        return axios
            .post(url+`company-request`, credentials)
            .then(response => response.data);
    },
    approveCompanyRequest(credentials) {
        return axios
            .post(url+`company/company-request-status`, credentials)
            .then(response => response.data);
    },
    getSales() {
        return axios.get(url +`admin/get-sales-members`).then(response => response.data)
    },
    assignSaleRequest(credentials) {
        return axios
            .post(url+`company/assign-request`, credentials)
            .then(response => response.data);
    },
    bulkAssignSaleRequest(credentials) {
        return axios
            .post(url+`company/company-requests/bulk-assign-requests`, credentials)
            .then(response => response.data);
    },
    deleteSingleRequest(credentials) {
        return axios
            .post(url+`company/company-request-delete`, credentials)
            .then(response => response.data);
    },
};
