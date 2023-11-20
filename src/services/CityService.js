import axios from 'axios';
const url = process.env.VUE_APP_BASE_URL;

export default {
    getAll() {
        return axios.get(url +`country/cities?country_id=-1`).then(response => response.data);
    },
    getCities() {
        return axios.get(url +`cities?country_id=-1`).then(response => response.data);
    },
    store(credentials) {
        return axios
            .post(url+`country/cities/store`, credentials)
            .then(response => response.data);
    },
    getOne(id) {
        return axios.get(url +`country/cities/show?id=${id}`).then(response => response.data);
    },
    update(credentials) {
        return axios
            .post(url+`country/cities/update`, credentials)
            .then(response => response.data);
    },
    delete(credentials) {
        return axios
            .post(url+`country/cities/delete`, credentials)
            .then(response => response.data);
    }
};
