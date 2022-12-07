
export type SpatialItem = {
  id: string
  name: string
  coordinates: {
    lng: number,
    lat: number
  }
}

export type User = SpatialItem & {
  color: string
  isMe?: boolean
  restaurant: string
  departureTime: Date
  remainingTime: number
}

