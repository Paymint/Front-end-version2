import axios from 'axios';
const url = process.env.VUE_APP_BASE_URL;

export default {
    getMainCategories() {
        return axios.get(url +`online-payments/categories`).then(response => response.data);
    },
    getSubCategories(id) {
        return axios.get(url +`online-payments/categories?id=${id}`).then(response => response.data);
    },
    getCategoriesForWeb(id) {
        return axios.get(url +`online-payments/categories-web?id=${id}`).then(response => response.data);
    },
    getCategoriesForCreate() {
        return axios.get(url +`online-payments/categories-for-add`).then(response => response.data);
    },
    getCategoriesForUpdate(id) {
        return axios.get(url +`online-payments/categories-for-edit?id=${id}`).then(response => response.data);
    },
    getOneCategory(id) {
        return axios.get(url +`online-payments/web-categories?id=${id}`).then(response => response.data);
    },
    deleteCategories(credentials) {
        return axios.post(url+`online-payments/delete-categories`, credentials).then(response => response.data);
    },
    deleteService(credentials) {
        return axios.post(url+`online-payments/delete-service`, credentials).then(response => response.data);
    },
    calculateFees(credentials) {
        return axios.post(url+`payment/calculate-order`, credentials).then(response => response.data);
    },

    createPaymentOrder(credentials) {
        return axios.post(url+`payment/create`, credentials).then(response => response.data);
    },
    createOpayOrderView(credentials) {
        return axios.post(url+`payment/create-opay-order`, credentials).then(response => response.data);
        // return axios.post(url+`paymentGateway/get-payment-gateway-url`, credentials).then(response => response.data);
    },
    createOrderWithPaymintWallet(credentials) {
        return axios.post(url+`payment/pay-by-wallet`, credentials).then(response => response.data);
    },
    getBillDetails(credentials) {
        return axios.get(url +`online-payments/bill-enquiry${credentials}`).then(response => response.data);
    },
    getTransactionDetails(reference) {
        return axios.get(url +`user/single-transaction?id=${reference}`).then(response => response.data);
    },
    storeService(credentials) {
        return axios.post(url+`online-payments/service`, credentials).then(response => response.data);
    },
    updateService(credentials) {
        return axios.post(url+`online-payments/edit-service`, credentials).then(response => response.data);
    },
    paymentGateway(credentials) {
        return axios.post(url+`paymentGateway/get-payment-gateway-url`, credentials).then(response => response.data);
    },



};
