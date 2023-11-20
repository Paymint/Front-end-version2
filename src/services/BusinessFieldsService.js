import axios from 'axios';
const url = process.env.VUE_APP_BASE_URL;

export default {
    getAll() {
        return axios.get(url +`business_fields`).then(response => response.data);
    },
    getAllFree() {
        return axios.get(url +`business_fieldss`).then(response => response.data);
    },
    store(credentials) {
        return axios
            .post(url+`business_fields/store`, credentials)
            .then(response => response.data);
    },
    getOne(id) {
        return axios.get(url +`business_fields/show?id=${id}`).then(response => response.data);
    },
    update(credentials) {
        return axios
            .post(url+`business_fields/update`, credentials)
            .then(response => response.data);
    },
    delete(credentials) {
        return axios
            .post(url+`business_fields/delete`, credentials)
            .then(response => response.data);
    }
};
