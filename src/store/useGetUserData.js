import { defineStore } from 'pinia'

export const userDataStore = defineStore('userDataStore', {
  state: () => ({
    id: null,
    role: null,
    userName: null,
    acctualBalance: null,
    outStandingBalance: null,
  }),
  getters: {
    getID: state => state.id,
    getRole: state => state.role,
    getUserName: state => state.userName,
    getAcctualBalance: state => state.acctualBalance,
    getOutStandingBalance: state => state.outStandingBalance,
  }, 
  actions: {
    getData(){
      const userDataStore = localStorage.getItem('userData')

      this.id = JSON.parse(userDataStore).data.id
      this.role = JSON.parse(userDataStore).data.role.name
      this.userName = JSON.parse(userDataStore).data.userName
      
      // this.acctualBalance = JSON.parse(userDataStore).data.money.actual_balance
      // this.outStandingBalance = JSON.parse(userDataStore).data.money.outstanding_balance
    },
  },
})
