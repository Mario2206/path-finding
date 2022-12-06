export const formatDateToDayScope = (date: Date) => {
  return date.toLocaleTimeString(navigator.language,{ hour: '2-digit', minute:'2-digit' })
}
