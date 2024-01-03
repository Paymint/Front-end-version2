
// import { ref } from "vue"
export const useAgentDashboardNavigation = () => {

  // you can call any api or get count from localStorage if you save it
  // const badgeCount = ref(5) // badge count

  const navigationItems = [
    {
      title: 'dashboard_navbar_title',
      icon: { icon: 'tabler-smart-home' },
      to: 'agent-dashboard',

      // badgeContent: badgeCount.value,  // to add count 
      // badgeClass: 'bg-primary',  // to change bg color
    },
  ]

  return {
    navigationItems,
  }
}
      