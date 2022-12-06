import {useEffect, useRef} from "react";
import Leaflet, {control, LatLngLiteral} from "leaflet";
import {PARIS_POSITION} from "../constants/data";
import {MapPoint} from "../tools/distance.calculator.types";
import {AddMarkerParams} from "./map.types";
import layers = control.layers;

const userLayerGroup = Leaflet.layerGroup()
const restaurantsLayerGroup = Leaflet.layerGroup()
const pathLayerGroup = Leaflet.layerGroup()
const meetingLayerGroup = Leaflet.layerGroup()

export const useMap = () => {
  const mapElementRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<Leaflet.Map>()

  const _addToMarkerGroup = (marker: Leaflet.Marker, markerType: AddMarkerParams["markerType"]) => {
    switch (markerType) {
      case "restaurant":
        restaurantsLayerGroup.addLayer(marker)
        break
      case "user":
        userLayerGroup.addLayer(marker)
        break
      case "meeting":
        meetingLayerGroup.addLayer(marker)
        break
    }
  }

  const drawPath = (points: LatLngLiteral[], color = "red") => {
    const polyline = new Leaflet.Polyline(points, {
      color,
      smoothFactor: 1
    })
    pathLayerGroup.addLayer(polyline)
    polyline.addTo(mapRef.current!)
  }

  const clearLayers = (markerType: "restaurant" | "user" | "path" | "meeting") => {
    switch (markerType) {
      case "restaurant":
        restaurantsLayerGroup.clearLayers()
        break
      case "user":
        userLayerGroup.clearLayers()
        break
      case "path":
        pathLayerGroup.getLayers().forEach(layer => {
          layer.remove()
        })
        pathLayerGroup.clearLayers()
        break
      case "meeting":
        meetingLayerGroup.getLayers().forEach(layer => layer.remove())
        meetingLayerGroup.clearLayers()
        break
    }
  }

  const addMarker = (coordinates: MapPoint, { title, markerType, icon, draggable = false }: AddMarkerParams) => {
    const params : Leaflet.MarkerOptions = { title, draggable }

    if (icon) {
      params.icon = icon
    }

    const marker = Leaflet.marker(
      [coordinates.lat, coordinates.lng],
      params
    )
      .addTo(mapRef.current!)

    _addToMarkerGroup(marker, markerType)

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

    // Bind layer groups
    userLayerGroup.addTo(map)
    restaurantsLayerGroup.addTo(map)

    return () => {
      map.remove()
    }
  }, [mapElementRef])

  return {
    mapElementRef,
    mapRef,
    addMarker,
    clearLayers,
    drawPath
  }
}
