import axios from 'axios';
const url = process.env.VUE_APP_BASE_URL;

export default {
    checkCompanyHaveBankInfo(credentials) {
        return axios.post(url+`company/company-have-bank-info`, credentials).then(response => response.data);
    },
    getMethodTypes(id) {
        return axios.get(url +`payments/select_payment_type?company_id=${id}`).then(response => response.data);
    },
    checkWithdrawType(typeId,paymentDate,companyId) {
        return axios.get(url +`withdraws/check-withdraw-type?type_id=${typeId}&withdraw_date=${paymentDate}&company_id=${companyId}`).then(response => response.data);
    },
    storeWithdraw(credentials) {
        return axios.post(url+`withdraws/store`, credentials).then(response => response.data);
    },
    getDetails(id) {
        return axios.get(url +`withdraws/show?withdraw_id=${id}`).then(response => response.data);
    },

    verifyWithdraw(credentials) {
        return axios.post(url+`withdraws/company-admin-verify`, credentials).then(response => response.data);
    },
    // verifyWithdraw(withdrawId,companyId,adminId,verifyAnyway) {
    //     return axios.get(url +`withdraws/company-admin-verify?withdraw_id=${withdrawId}&company_id=${companyId}&admin_id=${adminId}&verifyAnyway=${verifyAnyway}`).then(response => response.data);
    // },
    acceptWithdraw(id,com) {
        return axios.get(url +`withdraws/paymint-admin-accept?withdraw_id=${id}&company_id=${com}`).then(response => response.data);
    },
    rejectWithdraw(newUrl) {
        // return axios.get(url +`payments/paymint-admin-cancel?withdraw_id=${id}&company_id=${com}`).then(response => response.data);
        return axios.post(url +newUrl).then(response => response.data);
    },
    saveBankResponsePayment(credentials) {
        return axios
            .post(url+`withdraws/upload_bank_response_single_save`, credentials)
            .then(response => response.data);
    },
    acceptWithdrawBankResponse(credentials) {
        return axios.post(url+`withdraws/accept-bank-response`, credentials).then(response => response.data);
    },
    rejectWithdrawBankResponse(credentials) {
        return axios.post(url+`withdraws/reject-bank-response`, credentials).then(response => response.data);
    },
    updateWithdraw(credentials) {
        return axios.post(url+`withdraws/update`, credentials).then(response => response.data);
    },
    delete(credentials) {
        return axios.post(url+`withdraws/delete`, credentials).then(response => response.data);
    },
    getCompanyBankData(id) {
        return axios.get(url +`company/${id}/bank-data`).then(response => response.data);
    },
    checkTransferFees(credentials){
        return axios.post(url +`company/transfer/check`, credentials).then(response => response.data);
    }


};
