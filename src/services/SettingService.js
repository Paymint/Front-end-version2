import axios from 'axios';
const url = process.env.VUE_APP_BASE_URL;

export default {
    getAll() {
        return axios.get(url +`settings`).then(response => response.data);
    },

    getGeneralData() {
        return axios.get(url +`settings/general`).then(response => response.data);
    },
    updateData(credentials) {
        return axios
            .post(url+`settings/update-general`, credentials)
            .then(response => response.data);
    },
    getApplications() {
        return axios.get(url +`settings/applications`).then(response => response.data);
    },
    updateApplicationData(credentials) {
        return axios
            .post(url+`settings/update-applications`, credentials)
            .then(response => response.data);
    },

    getHolidays() {
        return axios.get(url +`settings/holidays`).then(response => response.data);
    },
    storeHoliday(credentials) {
        return axios
            .post(url+`settings/holidays/store`, credentials)
            .then(response => response.data);
    },
    deleteHoliday(credentials) {
        return axios
            .post(url+`settings/holidays/delete`, credentials)
            .then(response => response.data);
    },

    getUserEmails() {
        return axios.get(url +`settings/user_emails`).then(response => response.data);
    },
    getNotificationMailData() {
        return axios.get(url +`settings/notification_emails`).then(response => response.data);
    },
    storeNotificationMailData(credentials) {
        return axios
            .post(url+`settings/notification_emails/store`, credentials)
            .then(response => response.data);
    },
    deleteNotificationMaildata(credentials) {
        return axios
            .post(url+`settings/holidays/delete`, credentials)
            .then(response => response.data);
    },

    getMonthlyGoals(id=null) {
        return axios.get(url +`goals?user_id=${id}`).then(response => response.data);
    },
    storeMonthlyGoals(credentials) {
        return axios
            .post(url+`goals/store`, credentials)
            .then(response => response.data);
    },
    deleteMonthlyGoals(credentials) {
        return axios
            .post(url+`goals/delete`, credentials)
            .then(response => response.data);
    },

    getSalesDashboardStatistics() {
        return axios.get(url +`sales-dashboard-statistics`).then(response => response.data);
    },
    /******** st Company Dashboard Statistics ******/
    getCompanyDashboardPaymentsStatistics(comId) {
        return axios.get(url +`company-payments-dashboard-statistics?company_id=${comId}`).then(response => response.data);
    },
    getCompanyDashboardUsersStatistics(comId) {
        return axios.get(url +`company-users-dashboard-statistics?company_id=${comId}`).then(response => response.data);
    },
    getCompanyDashboardTransactionsActivityStatistics(comId) {
        return axios.get(url +`company-transactions-activity-dashboard-statistics?company_id=${comId}`).then(response => response.data);
    },
    getCompanyDashboardLatestTransactions(comId) {
        return axios.get(url +`company-transactions-dashboard-statistics?company_id=${comId}`).then(response => response.data);
    },
    getNewLatestTransactions(comId) {
        return axios.get(url +`transactions/external?company_id=${comId}`).then(response => response.data);
    },
    /******** nd Company Dashboard Statistics ******/
    /******** st Paymint Dashboard Statistics ******/
    getFirstTopBarStatistcs() {
        return axios.get(url +`statistics/paymint-dashboard/super-admin/first-topBar-statistics`)
            .then(response => response.data);
    },
    getSecondTopBarStatistcs() {
        return axios.get(url +`statistics/paymint-dashboard/super-admin/second-topBar-statistics`)
            .then(response => response.data);
    },
    getRevenueStatistcs() {
        return axios.get(url +`statistics/paymint-dashboard/super-admin/revenue-statistics`)
            .then(response => response.data);
    },
    getFooterBlocksStatistics() {
        return axios.get(url +`statistics/paymint-dashboard/super-admin/footer-blocks-statistics`)
            .then(response => response.data);
    }
    /******** nd Paymint Dashboard Statistics ******/

};
