import axios from 'axios';
const url = process.env.VUE_APP_BASE_URL;

export default {
    getSidebarStatus() {
        return axios.get(url +`sidebar-statistics`).then(response => response.data);
    },
    getTopBarStatus(com_id) {
        return axios.get(url +`topbar-statistics?com_id=${com_id}`).then(response => response.data);
    },
    getPermissionsData() {
        return axios.get(url +`user-permission`).then(response => response.data);
    }
};
