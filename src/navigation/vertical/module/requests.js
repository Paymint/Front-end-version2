export default [
  {
    title: 'requests_navbar_title',
    icon: { icon: 'tabler-stack' },
    badgeContent: '3',
    badgeClass: 'bg-primary',
    children: [
      {
        title: 'requests_navbar_title',
        to: 'admin-requests',
      },
      {
        title: 'pending_companies_navbar_title',
        to: 'admin-requests-pending-companies',
        badgeContent: '3',
        badgeClass: 'bg-primary',
      },
      {
        title: 'pending_users_navbar_title',
        to: 'admin-requests-pending-users',
        badgeContent: '3',
        badgeClass: 'bg-primary',
      },
      {
        title: 'transfer_report_navbar_title',
        to: 'admin-requests-transfer-requests',
      },
    ],
  },
]
  