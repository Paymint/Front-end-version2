import axios from 'axios';
const url = process.env.VUE_APP_BASE_URL;

export default {
    // getAllPayeesByGroups(comId) {
    //     return axios.get(url +`get_payment_groups_payees?company_id=${comId}&groups[]=96&payment_type=1&payment_date=2022-03-14-company_id=${id}`).then(response => response.data);
    // },
    getAllPayeesByGroups(credentials) {
        return axios
            .post(url+`payments/get_payment_groups_payees`, credentials)
            .then(response => response.data);
    },
    getAllGroups(id) {
        return axios.get(url +`company_payment_groups?company_id=${id}`).then(response => response.data);
    },
    getDetails(id) {
        return axios.get(url +`payments/details?id=${id}`).then(response => response.data);
    },
    getPayees(id) {
        return axios.get(url +`payments/get-payment-payees-info?payment_id=${id}&page_size=10`).then(response => response.data);
    },
    getTransfer(params,id,comID) {
        return axios.get(url +`payments/get-payment-transfer-info?${params}&payment_id=${id}&company_id=${comID}`).then(response => response.data);
    },
    getMethodTypes(id) {
        return axios.get(url +`payments/select_payment_type?company_id=${id}`).then(response => response.data);
    },
    checkPaymentType(typeId,paymentDate,companyId) {
        return axios.get(url +`payments/check_payment_type?type_id=${typeId}&payment_date=${paymentDate}&company_id=${companyId}`).then(response => response.data);
    },
    // getOne(id) {
    //     return axios.get(url +`permissions/show?id=${id}`).then(response => response.data);
    // },
    verifyPayment(credentials) {
        return axios.post(url+`payments/verify_company`, credentials).then(response => response.data);
    },
    storePayment(credentials) {
        return axios
            .post(url+`payments/store`, credentials)
            .then(response => response.data);
    },
    updatePayment(credentials) {
        return axios
            .post(url+`payments/update`, credentials)
            .then(response => response.data);
    },
    rejectPayment(credentials) {
        return axios
            .post(url+`payments/cancel_paymint`, credentials)
            .then(response => response.data);
    },
    rejectPayee(credentials) {
        return axios
            .post(url+`payments/cancel_payee`, credentials)
            .then(response => response.data);
    },
    rejectTransfer(credentials) {
        return axios
            .post(url+`payments/cancel-transfer`, credentials)
            .then(response => response.data);
    },
    acceptPayment(id,com) {
        return axios.get(url +`payments/accept_paymint?id=${id}&company_id=${com}`).then(response => response.data);
    },
    saveBankResponsePayment(credentials) {
        return axios
            .post(url+`payments/upload_bank_response_single_save`, credentials)
            .then(response => response.data);
    },
    saveBankResponsePaymentRejectPayees(credentials) {
        return axios
            .post(url+`payments/upload_bank_response_reject_payees`, credentials)
            .then(response => response.data);
    },
    saveBankResponsePaymentRejectTransfers(credentials) {
        return axios
            .post(url+`payments/upload_bank_response_reject_transfers`, credentials)
            .then(response => response.data);
    },

    delete(credentials) {
        return axios
            .post(url+`payments/delete`, credentials)
            .then(response => response.data);
    },

    bulkPayeeRejection(credentials) {
        return axios.post(url+`payments/apply_bank_response_reject_payees`, credentials).then(response => response.data);
    },
    bulkTransferRejection(credentials) {
        return axios.post(url+`payments/apply_bank_response_reject_transfers`, credentials).then(response => response.data);
    },
    bulkExternalTransferRejection(credentials) {
        return axios.post(url+`payments/bulk_response_external_transfers`, credentials).then(response => response.data);
    },
};
