export type User = {
  id: string
  name: string
  coordinates: {
    lng: number,
    lat: number
  }
  color: string
  restaurant: string
  room: string
}

export type Restaurant = {
  id: string
  name: string
  coordinates: {
    lng: number,
    lat: number
  }
}

export type Room = {
  name: string
  meetingTime: number
  restaurants: Restaurant[]
}
