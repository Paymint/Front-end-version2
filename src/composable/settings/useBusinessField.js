import axios from "@axios"

const url = process.env.VUE_APP_BASE_URL

export const useBusinessField = () => {

  /********* update **************/
  const addBusinessField = payload => {
    return axios.post( url +`business_fields/store`, payload).then(response => response)
  }

  /********* update **************/
  const updateBusinessField = payload => {
    return axios.post( url +`business_fields/update`, payload).then(response => response)
  }


  /***** Delete ********/
  const deleteBusinessField = payload => {
    return axios.post( url +`business_fields/delete`, payload).then(response => response)
  }

  return {
    addBusinessField,
    updateBusinessField,
    deleteBusinessField,
  }
}
