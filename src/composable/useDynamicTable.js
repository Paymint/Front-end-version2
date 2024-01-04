import axios from '@axios'
import { ref } from 'vue'
import { builderQuery } from './useQueryBuilder'

export const useDynamicTable = (headers, url, resParams) => {
  const currentPage = ref(1)
  const tableData = ref([])
  const totalRows = ref(0)
  const loading = ref(false)
  const fromRecord = ref(1)
  const toRecord = ref(10)
  

  /** Methods **/
  const fetchData = async () => {
    if (url && url !== null) {
      const baseUrl = process.env.VUE_APP_BASE_URL + url 
      const response = await axios.get(`${baseUrl}?page=${currentPage.value}&${resParams}`)
      if (response.status === 200) {
        tableData.value = response.data.data
        totalRows.value = response.data.pagination.total
        fromRecord.value = response.data.pagination.from
        toRecord.value = response.data.pagination.to
      }
    }
  }

  const fetchSearch = async () => {
    currentPage.value = 1
    fetchData()
  }

  const updatePage = page => {
    currentPage.value = page
    fetchData()
  }

  const downloadFile = async (downloadUrl, urlParams, title) => {
    loading.value = true

    const downloadUrlParams = builderQuery(urlParams).value
    const urlfile = `${downloadUrl}?page=${currentPage.value}&${downloadUrlParams}&is_downloaded=1`

    await axios({
      url: urlfile, // your url
      method: 'GET',
      responseType: 'blob', // important
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')

      link.href = url
      link.setAttribute('download', `${title}.xlsx`) // or any other extension
      document.body.appendChild(link)
      link.click()
      loading.value = false
    })
  }

  /* Mounted */
  onMounted(fetchData)

  return {
    headers,
    tableData,
    currentPage,
    totalRows,
    updatePage,
    fetchSearch,
    downloadFile,
    loading,
    fromRecord,
    toRecord,
  }
}
