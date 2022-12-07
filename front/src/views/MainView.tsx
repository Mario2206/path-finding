import React, {useEffect, useState} from "react";
import {SpatialItem, User} from "../types/items";
import {ActionButton} from "../components/ActionButton";
import {useMap} from "../hooks/map";
import {FLAG_ICON, getUserIcon} from "../constants/map.icons";
import Leaflet, {LeafletEvent} from "leaflet";
import {formatDateToDayScope} from "../tools/date.formatter";
import {getSocket} from "../tools/socket";
import {ChatBox} from "../components/ChatBox";
import {useMessages} from "../hooks/message";
import {useUsers} from "../hooks/users";
import {useRoom} from "../hooks/room";
import {UserCard} from "../components/UserCard";

const userlayerGroup = Leaflet.layerGroup()
const restaurantLayerGroup = Leaflet.layerGroup()
const destinationLayerGroup = Leaflet.layerGroup()

export const MainView = () => {
  const users = useUsers(state => state.users)
  const updateUser = useUsers(state => state.update)
  const activeUser = useUsers(state => state.activeUser)
  const {processMessage, messages} = useMessages(state => ({
    processMessage: state.processMessage,
    messages: state.messages
  }))
  const {destination, room, setDestination, meetingTime, restaurants} = useRoom(state => ({
    destination: state.destination,
    room: state.room,
    setDestination: state.setDestination,
    meetingTime: state.meetingTime,
    restaurants: state.restaurants
  }))

  const {mapElementRef, mapRef, addMarker, clearPath, drawPath} = useMap()

  const onDragUserMarker = (user: User, event: LeafletEvent) => {
    user.coordinates = event.target.getLatLng()
    updateUser(user)
    getSocket().emit("update-user", {coordinates: user.coordinates})
  }

  const onDragDestination = (e: LeafletEvent) => {
    setDestination(e.target.getLatLng())
    getSocket().emit("update-destination", e.target.getLatLng())
  }

  const drawUserPath = () => {
    clearPath()
    users.forEach((user, index) => {
        const restaurant = restaurants.find(restaurant => restaurant.id === user.restaurant)
        if (!restaurant) return
        drawPath([user.coordinates, restaurant.coordinates, destination], user.color)
      }
    )
  }

  const drawRestaurantMarkers = () => {
    restaurantLayerGroup.eachLayer(layer => layer.remove())
    restaurants.forEach(restaurant => {
      const marker = addMarker(restaurant.coordinates, {title: restaurant.name})
      restaurantLayerGroup.addLayer(marker)
    })
  }

  const drawUserMarkers = () => {
    userlayerGroup.eachLayer(layer => layer.remove())
    users.forEach(user => {
      const marker = addMarker(
        user.coordinates,
        {title: user.name, icon: getUserIcon(user.color), draggable: user.isMe}
      )
        .on("dragend", (e) => onDragUserMarker(user, e))

      userlayerGroup.addLayer(marker)
    })
  }

  const drawDestinationMarker = () => {
    destinationLayerGroup.eachLayer(l => l.remove())
    const destinationMarker = addMarker(destination, {title: "Meeting", icon: FLAG_ICON, draggable: true})
      .on("dragend", (e) => onDragDestination(e))
    destinationLayerGroup.addLayer(destinationMarker)
  }


  const onClickRestaurant = (restaurant: SpatialItem) => {
    const user = users.find(user => user.isMe)
    if (!user) return
    user.restaurant = restaurant.id
    updateUser(user)
    getSocket().emit("update-user", {restaurant: user.restaurant})
  }

  useEffect(() => {
    if (!mapRef) return
    drawRestaurantMarkers()
  }, [restaurants, mapRef])

  useEffect(() => {
    if (!mapRef) return
    drawUserMarkers()
  }, [mapRef, users])

  useEffect(() => {
    if (!mapRef || !users.length || !restaurants.length) return
    drawUserPath()
  }, [restaurants, users, mapRef, destination])

  useEffect(() => {
    if (!mapRef) return
    drawDestinationMarker()
  }, [destination, mapRef])


  return (
    <div className="main-view">
      <div id="listing-restau" className="listing-wrapper listing">
        <h2>Restaurants</h2>
        <div className="listing--list">
          {
            restaurants.map(
              restaurant =>
                <ActionButton
                  key={restaurant.id}
                  label={restaurant.name}
                  onClick={() => onClickRestaurant(restaurant)}
                  isActive={activeUser?.restaurant === restaurant.id}
                />
            )
          }
        </div>
      </div>
      <div className="map-wrapper">
        <div className="map-header">
          Lunch at <span className="map-header--time">{formatDateToDayScope(meetingTime)}</span> : You should go
          at <span className="map-header--time">{activeUser?.departureTime ? formatDateToDayScope(activeUser.departureTime) : "..."}</span>
        </div>
        <div id="map" className={"map"} ref={mapElementRef}/>
      </div>
      <div className={"listing-wrapper"}>
        <div id="listing-room" className={"listing"}>
          <h2>{room}</h2>
          <div className="listing--list">
            {
              users.map(user =>
                <UserCard
                key={user.id}
                user={user}
                restaurant={restaurants.find(rest => rest.id === user.restaurant)?.name || ""}
              />)
            }
          </div>
        </div>
        <ChatBox messages={messages} processMessage={processMessage}/>
      </div>

    </div>
  );
}
