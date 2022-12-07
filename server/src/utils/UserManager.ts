import {User} from "../types";
import {MIN_MAX_LAT, MIN_MAX_LNG} from "../constants/positions";
import {randomColor} from "./randomColor";
import { Socket } from "socket.io";
import {randomCoordinates} from "./randomCoordinates";

export class UserManager {

  private users : User[] = []

  add(socket : Socket, username: string, room: string) {
    const user : User = {
      id: socket.id,
      name: username,
      coordinates: randomCoordinates(MIN_MAX_LAT, MIN_MAX_LNG),
      restaurant: "1",
      color: randomColor(),
      room
    }

    this.users.push(user)

    return user
  }

  update(user: User) {
    const userIndex = this.users.findIndex(_user => _user.id === user.id)
    if(userIndex === -1) return
    this.users[userIndex] = user
  }

  remove(userId: string) {
    this.users = this.users.filter(user => user.id !== userId)
  }

  getById(userId: string) {
    return this.users.find(user => user.id === userId)
  }

  getUsersByRoom(room: string) {
    return this.users.filter(user => user.room === room)
  }

}
