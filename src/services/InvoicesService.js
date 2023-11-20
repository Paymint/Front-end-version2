import axios from 'axios';
const url = process.env.VUE_APP_BASE_URL;

export default {
    getOne(id) {
        return axios.get(url +`invoices/show?id=${id}`).then(response => response.data);
    }
};
