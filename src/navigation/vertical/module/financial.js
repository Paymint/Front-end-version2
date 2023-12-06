export default [
  {
    title: 'financials_navbar_title',
    icon: { icon: 'tabler-currency-pound' },
    actions: 'manage',
    subject: 'company_edit',
    children: [
      {
        title: 'charge_request_navbar_title',
        to: 'admin-financial-charge-request',
      },
      {
        title: 'transactions_navbar_title',
        to: 'admin-financial-transactions',
      },
      {
        title: 'payments_navbar_title',
        to: 'admin-financial-payments',
      },
      {
        title: 'pending_payments_navbar_title',
        to: 'admin-financial-pending-payments',
      },
      {
        title: 'upload_bank_response_navbar_title',
        to: 'admin-financial-upload-bank-response',
      },
      {
        title: 'invoices_navbar_title',
        to: 'admin-financial-invoices',
      },
    ],
  },
]
