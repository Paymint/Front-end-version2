export const useIdValidator = () => {

  const isValidNationalID = nationalID => {
    const nationalIDRegex = /^[0-9]{14}$/
    
    return nationalIDRegex.test(nationalID)
  }


  const isValidBirthdate = date => {
    const currentDate = new Date()
    const providedDate = new Date(date)

    const diff = currentDate.getTime() - providedDate.getTime()
    const ageInYears = diff / (1000 * 3600 * 24 * 365.25)

    return ageInYears >= 16
  }
  

  return {
    isValidNationalID,
    isValidBirthdate,
  }
}
