import axios from 'axios';
const url = process.env.VUE_APP_BASE_URL;

export default {
    getAllUsers(comId) {
        return axios.get(url +`admin/list-company-users?company_id=${comId}`).then(response => response.data);
    },
    getAllUsersForChooseAdmin(newUrl) {
        return axios.get(url + newUrl).then(response => response.data);
    },
    store(credentials) {
        return axios
            .post(url+`users/store`, credentials)
            .then(response => response.data);
    },
    getOne(id) {
        return axios.get(url +`users/show?id=${id}`).then(response => response.data);
    },
    update(credentials) {
        return axios
            .post(url+`users/update`, credentials)
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
    },
    getAllAdmin(comId) {
        return axios.get(url +`admin/list-company-admins?company_id=${comId}`).then(response => response.data);
    },
    storeAdmin(credentials) {
        return axios
            .post(url+`admin/store-company-admins`, credentials)
            .then(response => response.data);
    },
    editAdmin(credentials) {
        return axios
            .post(url+`admin/edit-company-admins`, credentials)
            .then(response => response.data);
    },
    deleteAdmin(credentials) {
        return axios
            .post(url+`admin/delete-company-admins`, credentials)
            .then(response => response.data);
    },
};
