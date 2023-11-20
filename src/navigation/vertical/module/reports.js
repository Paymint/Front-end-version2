export default [
  {
    title: 'reports_navbar_title',
    icon: { icon: 'tabler-report-analytics' },
    children: [
      {
        title: 'accounting_report_navbar_title',
        to: 'admin-reports-accounting-report',
      },
      {
        title: 'bill_payment_report_navbar_title',
        to: 'admin-reports-bill-payment-transactions-report',
      },
      {
        title: 'companies_payment_report_navbar_title',
        to: 'admin-reports-companies-payments',
      },
      {
        title: 'daily_transaction_report_navbar_title',
        to: 'admin-reports-daily-transaction-trackers',
      },
      {
        title: 'installment_report_navbar_title',
        to: 'admin-reports-installments-report',
      },
      {
        title: 'onboarded_companies_report_navbar_title',
        to: 'admin-reports-onboarded-companies',
      },
      {
        title: 'payee_transaction_report_navbar_title',
        to: 'admin-reports-payee-transactions',
      },
      {
        title: 'payees_report_navbar_title',
        to: 'admin-reports-payees',
      },
      {
        title: 'transfer_report_navbar_title',
        to: 'admin-reports-transfers-report',
      },
    ],
  },
]
  