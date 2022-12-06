import Leaflet from "leaflet";

export type AddMarkerParams = {
  title: string
  markerType: "user" | "restaurant" | "meeting"
  icon?: Leaflet.DivIcon
  draggable?: boolean
}
