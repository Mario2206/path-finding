import {Room} from "../types";
import {DEFAULT_RESTAURANTS} from "../constants/restaurants";
import {DEFAULT_MEETING_POSITION} from "../constants/positions";

export class RoomManager {
  private rooms: Room[] = []

  register(roomName: string) {
    let room = this.getRoomByName(roomName)

    if(!room) {
      room = {
        meetingTime: Date.now() + 60 * 60 * 1000, // + 1 hour,
        name: roomName,
        restaurants: DEFAULT_RESTAURANTS,
        destination: DEFAULT_MEETING_POSITION
      }
      this.rooms.push(room)
    }

    return room
  }

  update(room: Room) {
    const roomIndex = this.rooms.findIndex(r => r.name === room.name)
    if (roomIndex === -1) return
    this.rooms[roomIndex] = room
  }

  getRoomByName(roomName: string) {
    return this.rooms.find(room => room.name === roomName)
  }

  unregister(roomName: string) {
    this.rooms = this.rooms.filter(room => room.name !== roomName)
  }
}
