export const useNmberWithCommas = () => {
  const numberWithCommas = (x=0, y) => {
    return Number(x).toLocaleString() + ' ' + y
  }

  return {
    numberWithCommas,
  }
}
