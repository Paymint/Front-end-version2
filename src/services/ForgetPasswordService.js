import axios from 'axios';
const url = process.env.VUE_APP_BASE_URL;

export default {

    firstStore(credentials) {
        return axios
            .post(url+`forget-password-web`, credentials)
            .then(response => response.data);
    },
    sendOpt(credentials) {
        return axios
            .post(url+`forget-password-web-otp`, credentials)
            .then(response => response.data);
    },
    thirdStore(credentials) {
        return axios
            .post(url+`reset-password-web`, credentials)
            .then(response => response.data);
    },
    resendOpt(credentials) {
        return axios
            .post(url+`forget-password-web-resend-opt`, credentials)
            .then(response => response.data);
    },


};
