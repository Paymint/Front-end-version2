import { defineStore } from 'pinia'

export const useStore = defineStore('paginationStore', {
  state: () => ({
    pagination: {
      descending: true,
      page: 1,
      rowsPerPage: 4,
      sortBy: 'asc',
      totalItems: 0,
      rowsPerPageItems: [1, 2, 4, 8, 16],
    },
    items: [],
  }),
  getters: {
    loading: state => {
      // Your loading getter logic here (if needed)
    },
    pagination: state => state.pagination,
    items: state => state.items,
  },
  actions: {
    queryItems() {
      return new Promise((resolve, reject) => {
        const { sortBy, descending, page, rowsPerPage } = this.pagination

        setTimeout(() => {
          let items = _desserts.slice() // Replace with your data source
          const totalItems = items.length

          if (sortBy) {
            items = items.sort((a, b) => {
              const sortA = a[sortBy]
              const sortB = b[sortBy]

              if (descending) {
                if (sortA < sortB) return 1
                if (sortA > sortB) return -1
                
                return 0
              } else {
                if (sortA < sortB) return -1
                if (sortA > sortB) return 1
                
                return 0
              }
            })
          }

          if (rowsPerPage > 0) {
            items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage)
          }

          this._setItems({ items, totalItems })

          resolve()
        }, 1000)
      })
    },
  },
  mutations: {
    setPagination(payload) {
      this.pagination = payload
    },
    _setItems({ items, totalItems }) {
      this.items = items
      this.pagination.totalItems = totalItems
    },
  },
})
