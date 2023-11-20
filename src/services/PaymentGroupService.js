import axios from 'axios';
const url = process.env.VUE_APP_BASE_URL;

export default {
    getAll(com_id) {
        return axios.get(url +`company_payment_groups?company_id=${com_id}`).then(response => response.data);
    },
    store(credentials) {
        return axios
            .post(url+`company_payment_groups/store`, credentials).then(response => response.data);
    },
    getOne(id) {
        return axios.get(url +`company_payment_groups/show?id=${id}`).then(response => response.data);
    },
    update(credentials) {
        return axios
            .post(url+`company_payment_groups/update`, credentials)
            .then(response => response.data);
    },
    delete(credentials) {
        return axios
            .post(url+`company_payment_groups/delete`, credentials)
            .then(response => response.data);
    }
};
