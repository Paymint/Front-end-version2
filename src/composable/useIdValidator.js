export const useIdValidator = () => {

  const isValidNationalID = nationalID => {
    const nationalIDRegex = /^\d{14}$/
    
    return nationalIDRegex.test(nationalID)
  }

  const isValidPassportID = passportID => {
    // Regular expression to match the Egyptian passport ID format
    const passportRegex = /^[A-Z]{2}\d{7}$/
    
    return passportRegex.test(passportID)
  }
   
 
  const isMatchingExpireDate = (passportID, expirationDate) => {
    // Extract passport ID's last two digits representing the expiration year
    const passportExpirationYear = parseInt(passportID.substr(2, 2), 10)
    
    // Get the expiration date's year
    const expireYear = expirationDate.getFullYear() % 100
    
    return passportExpirationYear === expireYear
  }
  

  return {
    isValidNationalID,
    isValidPassportID,
    isMatchingExpireDate,
  }
}
