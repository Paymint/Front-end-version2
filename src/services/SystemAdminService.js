import axios from 'axios';
const url = process.env.VUE_APP_BASE_URL;

export default {
    getAll() {
        return axios.get(url +`admin/get-admins`).then(response => response.data);
    },
    store(credentials) {
        return axios
            .post(url+`admin/store-admins`, credentials)
            .then(response => response.data);
    },
    getOne(id) {
        return axios.get(url +`admin/show-admins?id=${id}`).then(response => response.data);
    },
    getProfile(id) {
        return axios.get(url +`admin/my-profile?id=${id}`).then(response => response.data);
    },
    update(credentials) {
        return axios
            .post(url+`admin/update-admins`, credentials)
            .then(response => response.data);
    },
    updateMyProfile(credentials) {
        return axios
            .post(url+`admin/update-my-profile`, credentials)
            .then(response => response.data);
    },
    delete(credentials) {
        return axios
            .post(url+`admin/delete-admins`, credentials)
            .then(response => response.data);
    },
};
