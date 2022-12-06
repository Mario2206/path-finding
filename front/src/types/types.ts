import Leaflet from "leaflet";

export type ListItem = {
  id: string
  name: string
  coordinates: {
    lng: number,
    lat: number
  }
  marker?: Leaflet.Marker
}

export type User = ListItem & {
  color: string
  isMe?: boolean
  restaurant: string
}
