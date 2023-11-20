import axios from 'axios';
const base = process.env.VUE_APP_BASE_URL;
const url = process.env.VUE_APP_BASE_URL + 'charge_requests';

export default {
    getAll(page,perPage,filter) {
        // var api = 'charge_requests'+'?page=' + ctx.currentPage + '&size=' + ctx.perPage+ '&q=' + ctx.filter

        return axios.get(url +`?page=${page}&size=${perPage}&q=${filter}`).then(response => response.data);
    },
    store(credentials) {
        return axios
            .post(url+`/store`, credentials)
            .then(response => response.data);
    },
    getOne(id) {
        return axios.get(url +`/show?id=${id}`).then(response => response.data);
    },
    updateStatus(credentials) {
        return axios
            .post(url+`/update_status`, credentials)
            .then(response => response.data);
    },update(credentials) {
        return axios
            .post(url+`/update`, credentials)
            .then(response => response.data);
    },
    delete(credentials) {
        return axios
            .post(url+`/delete`, credentials)
            .then(response => response.data);
    },
    calcFees(amount,type) {
        return axios.get(base +`topup/calculate-fees?amount=${amount}&type=${type}`).then(response => response.data)
    },
    fawryPay(amount,type,comId,reason) {
        return axios.get(base +`topup/create-payment-view?amount=${amount}&type=${type}&company_id=${comId}&reason=${reason}`).then(response => response.data)
    },
    MatchRequest(credentials) {
        return axios
        .post(base+`topup/match-request`, credentials)
        .then(response => response.data);
    }
};
