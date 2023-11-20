export default [
  {
    title: 'Settings_navbar_title',
    icon: { icon: 'tabler-settings' },
    children: [
      {
        title: 'packages_navbar_title',
        children: [
          {
            title: 'package_rule_navbar_title',
            to: 'admin-settings-package-rules',
          },
          {
            title: 'packages_navbar_title',
            to: 'admin-settings-packages',
          },
        ],
      },
      {
        title: 'admin_management_navbar_title',
        children: [
          {
            title: 'permissions_navbar_title',
            to: 'admin-settings-permissions',
          },
          {
            title: 'rules_navbar_title',
            to: 'admin-settings-roles',
          },
          {
            title: 'admins_navbar_title',
            to: 'admin-settings-admins',
          },
        ],
      },
      {
        title: 'sales_management_navbar_title',
        to: 'admin-settings-sales-management',
      },
      {
        title: 'banks_navbar_title',
        to: 'admin-settings-banks',
      },
      {
        title: 'business_field_navbar_title',
        to: 'admin-settings-business-fields',
      },
      {
        title: 'places_navbar_title',
        children: [
          {
            title: 'countries_navbar_title',
            to: 'admin-settings-countries',
          },
          {
            title: 'cities_navbar_title',
            to: 'admin-settings-cities',
          },
        ],
      },
      {
        title: 'payment_methods_navbar_title',
        to: 'admin-settings-payment-methods',
      },
      {
        title: 'Settings_navbar_title',
        to: 'admin-settings-app-settings',
      },
    ],
  },
]
  