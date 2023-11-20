import axios from 'axios';
const url = process.env.VUE_APP_BASE_URL;

export default {
    getAll(parameters) {
        return axios.get(url +`admin/all-users`+parameters);
    },
    store(credentials) {
        return axios
            .post(url+`users/store`, credentials)
            .then(response => response.data);
    },
    getOne(id) {
        return axios.get(url +`users/show?id=${id}`).then(response => response.data);
    },
    updateAccountStatus(credentials) {
        return axios
            .post(url+`user-status`, credentials)
            .then(response => response.data);
    },
    delete(credentials) {
        return axios
            .post(url+`users/delete`, credentials)
            .then(response => response.data);
    },
    removeFromCom(credentials) {
        return axios
            .post(url+`admin/remove-user-from-company`, credentials)
            .then(response => response.data);
    },
    uploadNationalIdImages(credentials) {
        return axios
            .post(url+`admin/upload-user-national_id_images`, credentials)
            .then(response => response.data);
    }
};
