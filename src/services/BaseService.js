import axios from 'axios';
// import errorHandler from '../core/ErrorHandler';

export default {
    getRequest(baseUrl) {
        return axios.get(baseUrl).then(response => response.data)
            .catch(err => this.handleResponse(err));
    },
    postRequest(baseUrl, body) {
        return axios.post(baseUrl, body).then(response => response.data)
            .catch(err => {
                console.log('777777777777777777');
                console.log(err.response.status);
                if (err.response.status === 401) {
                    localStorage.removeItem('user');
                    // this.$router.push('/login');
                    window.location.href = process.env.VUE_APP_BASE_URL+'/login';
                }
                if (err.response.status === 403) {
                    this.$router.push('/admin/403');
                }
            });
    },
    handleResponse(err) {
        console.log('777777777777777777');
        console.log(err.response.status);
        if (err.response.status === 401) {
            localStorage.removeItem('user');
            // this.$router.push('/login');
            window.location.href = process.env.VUE_APP_BASE_URL+'/login';
        }
        if (err.response.status === 403) {
            this.$router.push('/admin/403');
        }
        return err;

    }
};
