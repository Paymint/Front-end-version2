import axios from 'axios';
const url = process.env.VUE_APP_BASE_URL;

export default {
    getAll() {
        return axios.get(url +`banks`).then(response => response.data);
    },
    getAllFree() {
        return axios.get(url +`bankss`).then(response => response.data);
    },
    store(credentials) {
        return axios
            .post(url+`banks/store`, credentials)
            .then(response => response.data);
    },
    getOne(id) {
        return axios.get(url +`banks/show?id=${id}`).then(response => response.data);
    },
    update(credentials) {
        return axios
            .post(url+`banks/update`, credentials)
            .then(response => response.data);
    },
    delete(credentials) {
        return axios
            .post(url+`banks/delete`, credentials)
            .then(response => response.data);
    }
};
