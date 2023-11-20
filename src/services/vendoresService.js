import axios from 'axios';
const url = process.env.VUE_APP_BASE_URL;

export default {
    getAll() {
        return axios.get(url +`admin/vendors`).then(response => response.data);
    },
    // store(credentials) {
    //     return axios
    //         .post(url+`roles/store`, credentials)
    //         .then(response => response.data);
    // },
    // getOne(id) {
    //     return axios.get(url +`roles/show?id=${id}`).then(response => response.data);
    // },
    // update(credentials) {
    //     return axios
    //         .post(url+`roles/update`, credentials)
    //         .then(response => response.data);
    // },
    // delete(credentials) {
    //     return axios
    //         .post(url+`roles/delete`, credentials)
    //         .then(response => response.data);
    // }
};
