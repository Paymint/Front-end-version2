import axios from 'axios';
const url = process.env.VUE_APP_BASE_URL;

export default {
    getLatestNotifications(user_id) {
        return axios.get(url +`notifications/get-latest-user-notification?user_id=${user_id}`).then(response => response.data);
    },
    markAsRead(credentials) {
        return axios.post(url+`notifications/mark-as-read`, credentials).then(response => response.data);
    },
    markAllAsRead() {
        return axios.post(url+`notifications/bulk-mark-as-read`).then(response => response.data);
    },
    getUserNotificationPreferences(user_id) {
        return axios.get(url +`get-user-notification-preferences?user_id=${user_id}`).then(response => response.data);
    },
    updateUserNotificationPreferences(credentials) {
        return axios.post(url+`update-user-notification-preferences`, credentials).then(response => response.data);
    },
};
