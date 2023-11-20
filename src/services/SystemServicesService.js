import axios from 'axios';
const url = process.env.VUE_APP_BASE_URL;

export default {
    // getAll() {
    //     return axios.get(url +`system-services`).then(response => response.data);
    // },
    getAll(com_id) {
        return axios.get(url +`system-services-manager?com_id=${com_id}`).then(response => response.data);
    },

    // store(credentials) {
    //     return axios
    //         .post(url+`system-services-manager/store`, credentials)
    //         .then(response => response.data);
    // },
    // update(credentials) {
    //     return axios
    //         .post(url+`system-services-manager/update`, credentials)
    //         .then(response => response.data);
    // },
    // delete(credentials) {
    //     return axios
    //         .post(url+`system-services-manager/delete`, credentials)
    //         .then(response => response.data);
    // }
};
