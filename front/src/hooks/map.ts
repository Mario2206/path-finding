import {useEffect, useRef} from "react";
import Leaflet, {control, LatLngLiteral} from "leaflet";
import {PARIS_POSITION} from "../constants/data";
import {MapPoint} from "../tools/distance.calculator.types";


export type AddMarkerParams = {
  title: string
  icon?: Leaflet.DivIcon
  draggable?: boolean
}


const pathLayerGroup = Leaflet.layerGroup()

export const useMap = () => {
  const mapElementRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<Leaflet.Map>()

  const drawPath = (points: LatLngLiteral[], color = "red") => {
    const polyline = new Leaflet.Polyline(points, {
      color,
      smoothFactor: 1
    })
    pathLayerGroup.addLayer(polyline)
    polyline.addTo(mapRef.current!)
  }

  const clearPath = () => {
    pathLayerGroup.getLayers().forEach(layer => {
      layer.remove()
    })
    pathLayerGroup.clearLayers()
  }

  const addMarker = (coordinates: MapPoint, {title, icon, draggable = false}: AddMarkerParams) => {
    const params: Leaflet.MarkerOptions = {title, draggable}

    if (icon) {
      params.icon = icon
    }

    const marker = Leaflet.marker(
      [coordinates.lat, coordinates.lng],
      params
    )
      .addTo(mapRef.current!)

    return marker
  }

  useEffect(() => {
    if (!mapElementRef.current) return

    const map = Leaflet.map(mapElementRef.current).setView(PARIS_POSITION, 14)
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(map);

    mapRef.current = map

    return () => {
      map.remove()
    }
  }, [mapElementRef])

  return {
    mapElementRef,
    mapRef,
    addMarker,
    clearPath,
    drawPath
  }
}
