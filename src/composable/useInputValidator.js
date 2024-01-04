export const useInputValidator = () => {

  const isArabicChar = text => {
    const arabicRegex = /[\u0600-\u06FF]/
    
    return arabicRegex.test(text)
  }

  const isEnglishChar = txt => {
    const englishRegex = /[a-zA-Z]/
    
    return englishRegex.test(txt)
  }
  

  return {
    isArabicChar,
    isEnglishChar,
  }
}
