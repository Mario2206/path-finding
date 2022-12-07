export const randomCoordinates = (minMaxLat: number[], minMaxLng: number[]) => {
  const lat = Math.random() * (minMaxLat[1] - minMaxLat[0]) + minMaxLat[0];
  const lng =  Math.random() * (minMaxLng[1] - minMaxLng[0]) + minMaxLng[0];
  return { lat, lng }
}
