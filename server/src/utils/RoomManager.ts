import {Room} from "../types";
import {DEFAULT_RESTAURANTS} from "../constants/restaurants";

export class RoomManager {
  private rooms: Room[] = []

  register(roomName: string) {
    let room = this.getRoomByName(roomName)

    if(!room) {
      room = {
        meetingTime: Date.now() + 60 * 60 * 1000, // + 1 hour,
        name: roomName,
        restaurants: DEFAULT_RESTAURANTS
      }
      this.rooms.push(room)
    }

    return room
  }

  getRoomByName(roomName: string) {
    return this.rooms.find(room => room.name === roomName)
  }

  unregister(roomName: string) {
    this.rooms = this.rooms.filter(room => room.name !== roomName)
  }
}
