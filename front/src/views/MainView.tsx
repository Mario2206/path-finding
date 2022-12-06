import React, {useEffect, useReducer, useState} from "react";
import {ListItem, User} from "../types/types";
import {ActionButton} from "../components/ActionButton";
import {socket} from "../tools/socket";
import {FAKE_RESTAURANTS, FAKE_USERS, DEFAULT_MEETING_POSITION, USER_SPEED} from "../constants/data";
import {useMap} from "../hooks/map";
import {FLAG_ICON, getUserIcon} from "../constants/map.icons";
import {LatLngLiteral, LeafletEvent} from "leaflet";
import {DistanceCalculator} from "../tools/distance.calculator";
import {formatDateToDayScope} from "../tools/date.formatter";

enum UserActions {
  SET_ALL,
  UPDATE
}

const userReducer = (state: User[], action: { type: UserActions, value: User | User[] }) => {
  switch (action.type) {
    case UserActions.SET_ALL:
      return [...action.value as User[]]

    case UserActions.UPDATE:
      const userIndex = state.findIndex(user => user.id === (action.value as User).id)
      if (userIndex === -1) return state
      state[userIndex] = action.value as User
      return [...state]
  }
}

export const MainView = () => {
  const [restaurants, setRestaurants] = useState<ListItem[]>([])
  const [users, dispatchUser] = useReducer(userReducer, [])
  const [destination, setDestination] = useState<LatLngLiteral>(DEFAULT_MEETING_POSITION)

  const [roomName, setRoomName] = useState("")
  const [departureTime, setDepartureTime] = useState<Date>()
  const [meetingTime, setMeetingTime] = useState(new Date())

  const {mapElementRef, mapRef, addMarker, clearLayers, drawPath} = useMap()

  const onDragUserMarker = (user: User, event: LeafletEvent) => {
    user.coordinates =  event.target.getLatLng()
    dispatchUser({type: UserActions.UPDATE, value: user})
  }

  const drawUserPath = () => {
    clearLayers("path")
    users.forEach((user, index) => {
        const restaurant = restaurants.find(restaurant => restaurant.id === user.restaurant)
        if(!restaurant) return
        drawPath([user.coordinates, restaurant.coordinates, destination], user.color)
      }
    )
  }

  const drawRestaurantMarkers = () => {
    clearLayers("restaurant")
    restaurants.forEach(restaurant => {
      addMarker(restaurant.coordinates, {title: restaurant.name, markerType: "restaurant"})
    })
  }

  const drawUserMarkers = () => {
    clearLayers("user")
    users.forEach(user => {
      addMarker(
        user.coordinates,
        {title: user.name, markerType: "user", icon: getUserIcon(user.color), draggable: user.isMe}
      ).on("dragend", (e) => onDragUserMarker(user, e))
    })
  }

  const drawDestinationMarker = () => {
    clearLayers("meeting")
    addMarker(destination, {title: "Meeting", markerType: "meeting", icon: FLAG_ICON, draggable: true})
      .on("dragend", (e) => {
          setDestination(e.target.getLatLng())
      })
  }

  const getDepartureTime = () => {
    const user = users.find(user => user.isMe)
    const restaurant = restaurants.find(restaurant => restaurant.id === user?.restaurant)
    if (!user || !restaurant) return
    const calculator1 = new DistanceCalculator(user.coordinates, restaurant.coordinates)
    const calculator2 = new DistanceCalculator(restaurant.coordinates, destination)
    calculator1.computeDistance()
    calculator2.computeDistance()
    const duration = calculator1.computeDuration(USER_SPEED) + calculator2.computeDuration(USER_SPEED)
    const newDepartureTime = meetingTime.getTime() - duration
    setDepartureTime(new Date(newDepartureTime))
  }

  useEffect(() => {
    setRestaurants(FAKE_RESTAURANTS)
    setRoomName("Room 52")
    dispatchUser({type: UserActions.SET_ALL, value: FAKE_USERS})
  }, [])

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Front connected")
    })
  }, [])


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
    getDepartureTime()
  }, [restaurants, users, mapRef, destination])

  useEffect(() => {
    if (!mapRef) return
    drawDestinationMarker()
  }, [destination, mapRef])

  return (
    <div className="main-view">
      <div id="listing-restau" className="listing">
        <h2>Restaurants</h2>
        <div className="listing--list">
          {
            restaurants.map(restaurant => <ActionButton key={restaurant.id} label={restaurant.name}/>)
          }
        </div>
      </div>
      <div className="map-wrapper">
        <div className="map-header">
          Lunch at {formatDateToDayScope(meetingTime)} : You should go at {departureTime ? formatDateToDayScope(departureTime) : "..."}
        </div>
        <div id="chat" className={"chat"}></div>
        <div id="map" className={"map"} ref={mapElementRef}/>
      </div>
      <div id="listing-room" className={"listing"}>
        <h2>{roomName}</h2>
        <div className="listing--list">
          {
            users.map(user => <ActionButton key={user.id} label={user.name}/>)
          }
        </div>
      </div>
    </div>
  );
}
