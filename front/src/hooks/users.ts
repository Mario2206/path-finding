import {User} from "../types/items";
import create from "zustand";
import {DistanceCalculator} from "../tools/distance.calculator";
import {USER_SPEED} from "../constants/data";
import {useRoom} from "./room";

type UseUsersState = {
  activeUser: null | User
  users: User[],
  setAll: (users: User[]) => void,
  update : (user: User) => void
  remove: (user: User) => void
  computeDepartureTime: VoidFunction
}

function computeDepartureTime(user: User) {
  const {restaurants, destination, meetingTime} = useRoom.getState()
  const restaurant = restaurants.find(restaurant => restaurant.id === user?.restaurant)
  if (!user || !restaurant) return user
  const calculator1 = new DistanceCalculator(user.coordinates, restaurant.coordinates)
  const calculator2 = new DistanceCalculator(restaurant.coordinates, destination)
  calculator1.computeDistance()
  calculator2.computeDistance()
  const duration = calculator1.computeDuration(USER_SPEED) + calculator2.computeDuration(USER_SPEED)
  const newDepartureTime = new Date(meetingTime.getTime() - duration)

  return {
    ...user,
    departureTime: newDepartureTime,
    remainingTime : duration
  }
}

export const useUsers = create<UseUsersState>(set => ({
  users: [],
  activeUser: null,
  setAll: (users) => {
    const newUsers = users.map(user => computeDepartureTime(user))
    set({users: newUsers, activeUser: newUsers.find(user => user.isMe)})
  },
  update: (user) => {
    set(state => {
      const userIndex = state.users.findIndex(_user => _user.id === user.id)
      if (userIndex === -1) return state
      state.users[userIndex] = computeDepartureTime(user)
      return {
        users: [...state.users],
        activeUser: state.users.find(user => user.isMe)
      }
    })
  },
  remove: (user) => {
    set(state => ({
      users: state.users.filter(_user => user.id !== _user.id )
    }))
  },
  computeDepartureTime: () => {
    set(state => ({
      users: state.users.map(user => computeDepartureTime(user)),
      activeUser: state.activeUser ? computeDepartureTime(state.activeUser) : null
    }))
  }
}))
