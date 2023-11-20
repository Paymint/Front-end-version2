import axios from 'axios';
const url = process.env.VUE_APP_BASE_URL;

export default {
    getAll(type=null) {
        if (type)
            return axios.get(url +`package_rules?type=`+type).then(response => response.data.data);
        else
            return axios.get(url +`package_rules`).then(response => response.data.data);

    },
    store(credentials) {
        return axios
            .post(url+`package_rules/store`, credentials)
            .then(response => response.data);
    },
    getOne(id) {
        return axios.get(url +`package_rules/show?id=${id}`).then(response => response.data);
    },
    update(credentials) {
        return axios
            .post(url+`package_rules/update`, credentials)
            .then(response => response.data);
    },
    delete(credentials) {
        return axios
            .post(url+`package_rules/delete`, credentials)
            .then(response => response.data);
    }
};
