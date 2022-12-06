import {User} from "../types/types";

export const PARIS_POSITION = {lng: 2.320041, lat: 48.8588897}

export const FAKE_RESTAURANTS = [
  {id: "1", name: "Restaurant 1", coordinates: {lat: 48.8585669, lng: 2.3145143}},
  {id: "2", name: "Restaurant 2", coordinates: {lat: 48.8512197, lng: 2.313935}},
  {id: "3", name: "Restaurant 3", coordinates: {lat: 48.8568334, lng: 2.3155367}},
  {id: "4", name: "Restaurant 4", coordinates: {lat: 48.8637824, lng: 2.3369261}},
]

export const FAKE_USERS: User[] = [
  {
    id: "1",
    name: "Nico",
    coordinates: {lng: 2.343347474297737, lat: 48.84901564410068},
    color: "red",
    isMe: true,
    restaurant: "1"
  },
  {
    id: "2",
    name: "Francis",
    coordinates: {lng: 2.293316694403656, lat: 48.86866700111898},
    color: "blue",
    restaurant: "2"
  },
  {
    id: "3",
    name: "Marge",
    coordinates: {lng: 2.344542152006937, lat: 48.84302835299519},
    color: "purple",
    restaurant: "3"
  },
]

export const DEFAULT_MEETING_POSITION = {
  lat: 48.84986284445959,
  lng: 2.325843406219628
}

export const USER_SPEED = 5 // km/h
