import axios from 'axios';
const url = process.env.VUE_APP_BASE_URL + 'transactions';
const base = process.env.VUE_APP_BASE_URL ;

export default {
    getAll(page,perPage,filter) {
        // var api = 'transactions'+'?page=' + ctx.currentPage + '&size=' + ctx.perPage+ '&q=' + ctx.filter

        return axios.get(url +`?page=${page}&size=${perPage}&q=${filter}`).then(response => response.data);
    },
    store(credentials) {
        return axios
            .post(base+`company/wallet-settle`, credentials)
            .then(response => response.data);
    },
    
};
