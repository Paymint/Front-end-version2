// src/services/AuthService.js

import axios from 'axios';
const url = process.env.VUE_APP_BASE_URL + `agent-login`;
// const url = process.env.VUE_APP_BASE_URL + `login`;

export default {
    login(credentials) {
        return axios
            .post(url, credentials)
            .then(response => response.data);
    },
    changePassword(credentials) {
        return axios
            .post(process.env.VUE_APP_BASE_URL + 'change-password', credentials)
            .then(response => response.data);
    },
    changePasswordProfile(credentials) {
        return axios
            .post(process.env.VUE_APP_BASE_URL + 'change-password', credentials)
            .then(response => response);
    },
    changePasswordFromAdminSide(credentials) {
        return axios.post(process.env.VUE_APP_BASE_URL + 'set-password', credentials).then(response => response);
    },
    confirmPassword(credentials) {
        return axios.post(process.env.VUE_APP_BASE_URL + 'confirm-password', credentials).then(response => response);
    },
    enableMfa(credentials) {
        return axios.post(process.env.VUE_APP_BASE_URL + 'two-factor-authentication', credentials).then(response => response);
    },
    generateQrCode(credentials){
        return axios.get(process.env.VUE_APP_BASE_URL + `two-factor-qr-code?user_reference_number=${credentials}`).then(response => response);
    },
    generateRecoveryCode(credentials){
        return axios.get(process.env.VUE_APP_BASE_URL + `two-factor-recovery-codes?user_reference_number=${credentials}`).then(response => response);
    },
    confirmCode(credentials) {
        return axios.post(process.env.VUE_APP_BASE_URL + 'confirmed-two-factor-authentication', credentials).then(response => response);
    },
    confirmRecoveryCode(credentials) {
        return axios.post(process.env.VUE_APP_BASE_URL + 'two-factor-challenge', credentials).then(response => response);
    },
};
