import axios from 'axios';
const url = process.env.VUE_APP_BASE_URL;

export default {
    getAll() {
        return axios.get(url +`countries`).then(response => response.data);
    },
    store(credentials) {
        return axios
            .post(url+`countries/store`, credentials)
            .then(response => response.data);
    },
    getOne(id) {
        return axios.get(url +`countries/show?id=${id}`).then(response => response.data);
    },
    update(credentials) {
        return axios
            .post(url+`countries/update`, credentials)
            .then(response => response.data);
    },
    delete(credentials) {
        return axios
            .post(url+`countries/delete`, credentials)
            .then(response => response.data);
    }
};
