import axios from 'axios';
const url = process.env.VUE_APP_BASE_URL;

export default {
    getAll() {
        return axios.get(url +`admin/get-sales`).then(response => response.data);
    },
    store(credentials) {
        return axios
            .post(url+`admin/store-sales`, credentials)
            .then(response => response.data);
    },
    getOne(id) {
        return axios.get(url +`admin/show-sales?id=${id}`).then(response => response.data);
    },
    update(credentials) {
        return axios
            .post(url+`admin/update-sales`, credentials)
            .then(response => response.data);
    },
    delete(credentials) {
        return axios
            .post(url+`admin/delete-sales`, credentials)
            .then(response => response.data);
    },
};
