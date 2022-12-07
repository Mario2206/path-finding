export const formatDateToDayScope = (date: Date) => {
  return date.toLocaleTimeString(navigator.language,{ hour: '2-digit', minute:'2-digit' })
}

export const formatDuration = (duration: number) => {
  const _duration = duration / (1000 * 60)
  const hours = Math.floor(_duration / 60);
  const minutes = _duration % 60;
  return hours + ":" + minutes.toFixed(0);
}
