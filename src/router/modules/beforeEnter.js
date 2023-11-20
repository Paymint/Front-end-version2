const notifications = {
  path: '/apps/notification',
  name: 'apps-notification',
  beforeEnter: (to, from, next) => {
    console.log('ffffffff')
    next()
  },
  component: () => import('@/views/pages/notification/index.vue'),
}


export default notifications
