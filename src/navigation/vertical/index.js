import billPayment from './module/billPayment'
import companies from './module/companies'
import dashboard from './module/dashboard'
import financial from './module/financial'
import notification from './module/notification'
import reports from './module/reports'
import requests from './module/requests'
import salaryAdvance from './module/salaryAdvance'
import settings from './module/settings'
import users from './module/users'

// agent dashboard
import agentUsers from './module/agent/users'
import { useAgentDashboardNavigation } from './module/agent/dashboard' 

const { navigationItems } = useAgentDashboardNavigation()

const role = JSON.parse(localStorage.getItem('userData')).role.name

let exportedData

if(role !== "Agent") {
  exportedData = [
    ...dashboard,
    ...notification,
    ...requests, 
    ...companies, 
    ...users, 
    ...financial, 
    ...reports, 
    ...salaryAdvance, 
    ...settings,
    ...billPayment,
  ]
}

if (role === "Agent") {
  exportedData = [
    ...navigationItems,
    ...agentUsers,
  ]
}

export default exportedData
