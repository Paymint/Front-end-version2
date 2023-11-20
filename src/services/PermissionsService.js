import axios from 'axios';
const url = process.env.VUE_APP_BASE_URL;

export default {
    getAll() {
        return axios.get(url +`permissions`).then(response => response.data);
    },
    store(credentials) {
        return axios
            .post(url+`permissions/store`, credentials)
            .then(response => response.data);
    },
    getOne(id) {
        return axios.get(url +`permissions/show?id=${id}`).then(response => response.data);
    },
    update(credentials) {
        return axios
            .post(url+`permissions/update`, credentials)
            .then(response => response.data);
    },
    delete(credentials) {
        return axios
            .post(url+`permissions/delete`, credentials)
            .then(response => response.data);
    }
};
