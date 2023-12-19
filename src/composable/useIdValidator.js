export const useIdValidator = () => {

  const isValidNationalID = nationalID => {
    const nationalIDRegex = /^[0-9]{14}$/
    
    return nationalIDRegex.test(nationalID)
  }

  const isValidPassportID = passportID => {
    // Regular expression to match the Egyptian passport ID format
    const passportRegex = /^[A-Z0-9]{6,}$/
    
    return passportRegex.test(passportID)
  }

  const isValidBirthdate = passportID => {
    // Assuming the birthdate is encoded in the passport ID's middle digits
    const birthdateDigits = passportID.substr(2, 6)
    
    // Extract birth year, month, and day from the encoded digits
    const birthYear = parseInt(birthdateDigits.substr(0, 2), 10) + 1900 // Adjust for the year range
    const birthMonth = parseInt(birthdateDigits.substr(2, 2), 10)
    const birthDay = parseInt(birthdateDigits.substr(4, 2), 10)

    // Check if the extracted birthdate is valid
    const isValidDate = !isNaN(birthYear) && !isNaN(birthMonth) && !isNaN(birthDay)
    const isValidYear = birthYear >= 1900 && birthYear <= new Date().getFullYear()
    const isValidMonth = birthMonth >= 1 && birthMonth <= 12
    const isValidDay = birthDay >= 1 && birthDay <= 31

    return isValidDate && isValidYear && isValidMonth && isValidDay
  }
  

  return {
    isValidNationalID,
    isValidPassportID,
    isValidBirthdate,
  }
}
