import {Server} from "socket.io"
import express from "express"
import * as http from "http";
import cors from "cors"
import {UserManager} from "./utils/UserManager";
import {CommandManager} from "./utils/CommandManager";
import {Command} from "./utils/Command";
import {EUROPEAN_HOUR_MIN_SEPARATOR} from "./constants/time";
import {RoomManager} from "./utils/RoomManager";

export function application () {
  const app = express()
  const server = http.createServer(app)
  const io = new Server(server, {
    cors: {
      origin: '*',
    }
  });

  const userManager = new UserManager()
  const roomManager = new RoomManager()

  const commands : Command[] = [
    new Command("/meeting-time", (io, socket, newMeetingTime) => {
      const [hour, minutes] = newMeetingTime
        .replaceAll(" ", "")
        .split(EUROPEAN_HOUR_MIN_SEPARATOR)
        .map(v => Number(v))

      if(isNaN(hour) || isNaN(minutes)) {
        throw new Error("Meeting time params malformed")
      }

      const newDate = new Date()
      newDate.setHours(hour)
      newDate.setMinutes(minutes)

      const user = userManager.getById(socket.id)
      const room = roomManager.getRoomByName(user?.room || "")

      if(!user || !room) return
      room.meetingTime = newDate.getTime()
      io.in(user.room).emit("update-room-data", room)
    })
  ]

  const commandManager = new CommandManager(commands)

  // app.use(cors())

  io.on("connection", (socket) => {
    console.log(`${socket.id} is connected`)

    socket.on("join-room", ({ room, username }) => {
      // join the room
      socket.join(room)

      //register the room
      const roomData = roomManager.register(room)

      // create the user
      userManager.add(socket, username, room)

      // Emit the new user
      io.in(room).emit("new-user", userManager.getUsersByRoom(room))

      // Emit the meeting time of the room
      socket.emit("update-room-data", roomData)

      console.log(`${username} join room : ${room}`)

    })

    socket.on("update-user", ({coordinates, restaurant}) => {
      const user = userManager.getById(socket.id)
      if(!user) return
      user.coordinates = coordinates || user.coordinates
      user.restaurant = restaurant || user.restaurant
      userManager.update(user)

      socket.broadcast.in(user.room).emit("update-user", user)
    })

    socket.on("update-destination", (destination) => {
      const user = userManager.getById(socket.id)
      if(!user) return
      socket.broadcast.in(user.room).emit("update-destination", destination)
    })

    socket.on("message", message => {
      if(commandManager.execute(io, socket, message)) return
      const user = userManager.getById(socket.id)
      if(!user) return;
      io.in(user.room).emit("message", { value: message, sentAt: new Date(), sender: socket.id })
    })

    socket.on("disconnect", () => {
      const user = userManager.getById(socket.id)
      if(!user) return
      userManager.remove(socket.id)
      socket.broadcast.in(user.room).emit("leave-user", user)
      if(!userManager.getUsersByRoom(user.room).length) {
        roomManager.unregister(user.room)
      }
    })

  });

  io.listen(3001);


}
