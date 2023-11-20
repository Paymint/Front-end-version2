export const useStatusVariant = () => {
  const resolveStatusVariant = stat => {
    const statLowerCase = stat.toLowerCase()
    if (statLowerCase === 'in active')
      return 'warning'
    if (statLowerCase === 'active')
      return 'success'
    if (statLowerCase === 'success')
      return 'success'
    if (statLowerCase === 'dorment')
      return 'secondary'
    if (statLowerCase === 'never used')
      return 'error'
        
    return 'primary'
  }

  const resolveTransactionStatusVariant = stat => {
    if (stat === 2)
      return 'warning'
    if (stat === 1)
      return 'primary'
    if (stat === 3)
      return 'secondary'
    if (stat === 4)
      return 'error'
        
    return 'primary'
  }

  return {
    resolveStatusVariant,
    resolveTransactionStatusVariant
  }
}
