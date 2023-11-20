export default [
  {
    title: 'salary_advance_navbar_title',
    icon: { icon: 'tabler-coins' },
    children: [
      {
        title: 'Settings_navbar_title',
        to: 'admin-salary-advance-settings',
      },
      {
        title: 'salary_advance_navbar_title',
        to: 'admin-salary-advance-current',
      },
      {
        title: 'pending_salary_advance_navbar_title',
        to: 'admin-salary-advance-pending',
        badgeContent: '3',
        badgeClass: 'bg-primary',
      },
      {
        title: 'batches_navbar_title',
        to: 'admin-salary-advance-batches',
      },
    ],
  },
]
  