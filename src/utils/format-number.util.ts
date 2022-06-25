export function formatNumber(num?: number) {
  const formatedNumber = new Intl.NumberFormat('en-US').format(num || 0)

  return formatedNumber
}
