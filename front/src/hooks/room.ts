import {LatLngLiteral} from "leaflet";
import create from "zustand";
import {DEFAULT_MEETING_POSITION} from "../constants/data";
import {SpatialItem} from "../types/items";

type UseRoomState = {
  room: string
  destination: LatLngLiteral
  meetingTime: Date
  restaurants: SpatialItem[]
  setRoom: (room: string) => void
  setDestination: (destination: LatLngLiteral) => void
  setMeetingTime: (meetingTime: number) => void
  setRestaurants: (restaurants: SpatialItem[]) => void
}


export const useRoom = create<UseRoomState>(set => ({
  room: "",
  destination: DEFAULT_MEETING_POSITION,
  meetingTime: new Date(),
  restaurants: [],
  setRoom: (room: string) => set({room}),
  setDestination: (destination) => set({destination}),
  setMeetingTime: (meetingTime: number) => set({
    meetingTime: new Date(meetingTime)
  }),
  setRestaurants: restaurants => set({restaurants})
}))
