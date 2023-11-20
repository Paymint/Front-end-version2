import axios from 'axios';
const url = process.env.VUE_APP_BASE_URL;

export default {
    getAll() {
        return axios.get(url +`payment_methods`).then(response => response.data);
    },
    store(credentials) {
        return axios
            .post(url+`payment_methods/store`, credentials)
            .then(response => response.data);
    },
    getOne(id) {
        return axios.get(url +`payment_methods/show?id=${id}`).then(response => response.data);
    },
    update(credentials) {
        return axios
            .post(url+`payment_methods/update`, credentials)
            .then(response => response.data);
    },
    delete(credentials) {
        return axios
            .post(url+`payment_methods/delete`, credentials)
            .then(response => response.data);
    },
    storeSinglePaymentMethod(credentials) {
        return axios.post(url + `payments/store_one_time_payment_single`, credentials).then(response => response.data)
    },
    updateSinglePaymentMethod(credentials) {
        return axios.post(url + `payments/update_one_time_payment_single`, credentials).then(response => response.data)
    },
    storeBulkPaymentMethod(credentials) {
        return axios.post(url + `payments/store_bulk_one_time_payment_excel_Transfers`, credentials).then(response => response.data)
    },
    updateBulkPaymentMethod(credentials) {
        return axios.post(url + `payments/update_bulk_one_time_payment_excel_Transfers`, credentials).then(response => response.data)
    },
    CalcFees(credentials) {
        return axios.post(url + `payments/get_one_time_payment_single_fees`, credentials).then(response => response.data)
    }
};
