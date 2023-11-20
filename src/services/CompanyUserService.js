import axios from 'axios';
const url = process.env.VUE_APP_BASE_URL;

export default {
    getDetails(id) {
        return axios.get(url +`company/payee/${id}/details`).then(response => response.data);
    },
    getPayoutTransactions(id) {
        return axios.get(url +`company/payee/${id}/payout_transactions`).then(response => response.data);
    },
    verifyAccount(id) {
        return axios.get(url +`company/payee/${id}/verify`).then(response => response.data);
    },
    updatePayeeCompany(credentials) {
        return axios
            .post(url+`company/payee/change-company`, credentials)
            .then(response => response.data);
    },
    store(credentials) {
        return axios
            .post(url+`company/payee/store`, credentials)
            .then(response => response.data);
    },
    storeIdData(credentials) {
        return axios
            .post(url+`company/payee/store_id_data`, credentials)
            .then(response => response.data);
    },
    checkUserData(credentials) {
        return axios
            .post(url+`company/payee/check-first-data`, credentials)
            .then(response => response.data);
    },
    AskChangeUserCompanyDataReport(credentials) {
        return axios
            .post(url+`company/payee/change-company-data`, credentials)
            .then(response => response.data);
    },
    storeCompanyData(credentials) {
        return axios
            .post(url+`company/payee/store_company_data`, credentials)
            .then(response => response.data);
    },
    storePaymentData(credentials) {
        return axios
            .post(url+`company/payee/store_payment_data`, credentials)
            .then(response => response.data);
    },

};
