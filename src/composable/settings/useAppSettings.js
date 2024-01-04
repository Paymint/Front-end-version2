import axios from "@axios"

const url = process.env.VUE_APP_BASE_URL

export const useAppSettings = () => {


  /*********** get ***************/
  const getGeneralSettings = () => {
    return axios.get(url +`settings/general`).then(response => response)
  }

  const getApplicationSettings = () => {
    return axios.get( url +`settings/applications`).then(response => response)
  }

  const getHolidaysSettings = () => {
    return axios.get( url +`settings/holidays`).then(response => response)
  }

  const getNotificationSettings = () => {
    return axios.get( url +`settings/notification_emails`).then(response => response)
  }

  const getUserEmails = () => {
    return axios.get( url +`settings/user_emails`).then(response => response)
  }

  /********* update **************/
  const updateGeneralSettings = payload => {
    return axios.post( url +`settings/update-general`, payload).then(response => response)
  }

  const updateApplicationSettings = payload => {
    return axios.post( url +`settings/update-applications`, payload).then(response => response)
  }

  const updateHolidaysSettings = payload => {
    return axios.post( url +`settings/holidays/store`, payload).then(response => response)
  }

  const updateNotificationSettings = payload => {
    return axios.post( url +`settings/notification_emails/store`, payload).then(response => response)
  }



  /***** Delete ********/
  const deleteHoliday = payload => {
    return axios.post( url +`settings/holidays/delete`, payload).then(response => response)
  }

  const deleteNotificationSetting = payload => {
    return axios.post( url +`settings/notification_emails/delete`, payload).then(response => response)
  }

  return {
    getGeneralSettings,
    updateGeneralSettings,
    updateApplicationSettings,
    getApplicationSettings,
    getHolidaysSettings,
    updateHolidaysSettings,
    deleteHoliday,
    updateNotificationSettings,
    deleteNotificationSetting,
    getNotificationSettings,
    getUserEmails,
  }
}
