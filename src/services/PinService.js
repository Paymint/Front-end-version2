import axios from 'axios';
const url = process.env.VUE_APP_BASE_URL;

export default {
    setPin(credentials) {
        return axios.post(url+`set-pin`, credentials).then(response => response.data);
    },
    changePin(credentials) {
        return axios.post(url+`change-pin`, credentials).then(response => response.data);
    },
    resetPin() {
        return axios.post(url+`reset-pin`).then(response => response.data);
    },
    verifyPinOtp(credentials) {
        return axios.post(url+`verify-pin-otp`, credentials).then(response => response.data);
    }
};
