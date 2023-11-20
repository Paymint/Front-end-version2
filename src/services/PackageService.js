import axios from 'axios';
const url = process.env.VUE_APP_BASE_URL+'packages';

export default {
    getAll() {
        return axios.get(url).then(response => response.data);
    },
    store(credentials) {
        return axios
            .post(url+`/store`, credentials)
            .then(response => response.data);
    },
    getOne(id) {
        return axios.get(url +`/show?id=${id}`).then(response => response.data);
    },
    update(credentials) {
        return axios
            .post(url+`/update`, credentials)
            .then(response => response.data);
    },
    delete(credentials) {
        return axios
            .post(url+`/delete`, credentials)
            .then(response => response.data);
    }
};
