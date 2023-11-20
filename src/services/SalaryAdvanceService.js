import axios from 'axios';
const url = process.env.VUE_APP_BASE_URL;

export default {
    getSettings() {
        return axios.get(url +`salary-advance-settings`).then(response => response.data);
    },
    userSaInfo(id) {
        return axios.get(url +`user-sa-info?user=${id}`).then(response => response.data);
    },
    cancelSaRequest(id) {
        return axios.get(url +`sa/cancel-sa-request?id=${id}`).then(response => response.data);
    },
    deleteOneSaRequest(id) {
        return axios.get(url +`sa/delete-sa-request?id=${id}`).then(response => response.data);
    },
    getUsersHaveLoans() {
        return axios.get(url +`sa/users-have-loans`).then(response => response.data);
    },
    getSaSingleInfo(id) {
        return axios.get(url +`user-single-sa?id=${id}`).then(response => response.data);
    },
    settleSaInstallment(credentials) {
        return axios.post(url+`loan/settle-sa-installment`, credentials).then(response => response.data);
    },
    refundSa(credentials) {
        return axios.post(url+`sa/refund-sa`, credentials).then(response => response.data);
    },
    getPatches() {
        return axios.get(url +`sa/prepare-sa-sheet`).then(response => response.data);
    },
    getSaSinglePatch(id) {
        return axios.get(url +`sa/single-sa-sheet?id=${id}`).then(response => response.data);
    },
    getSaSinglePatchSalaryAdvances(id) {
        return axios.get(url +`s/sa/sheet-salary-advances?id=${id}`).then(response => response.data);
    },
    getUserSa(data) {
        return axios.get(url +`sa/user-sa?${data}`).then(response => response.data);
    },
    getSaRange() {
        return axios.get(url +`sa/general-settings`).then(response => response.data);
    },
};
