import axios from 'axios';
const url = process.env.VUE_APP_BASE_URL;

export default {
    getAll(com_id) {
        return axios.get(url +`company_branchs?company_id=${com_id}`).then(response => response.data);
    },
    getAllNew(com_id) {
        return axios.get(url +`company_branchs?company_ids=${com_id}`).then(response => response.data);
    },
    store(credentials) {
        return axios
            .post(url+`company_branchs/store`, credentials).then(response => response.data);
    },
    getOne(id) {
        return axios.get(url +`company_branchs/show?id=${id}`).then(response => response.data);
    },
    update(credentials) {
        return axios
            .post(url+`company_branchs/update`, credentials)
            .then(response => response.data);
    },
    delete(credentials) {
        return axios
            .post(url+`company_branchs/delete`, credentials)
            .then(response => response.data);
    }
};
