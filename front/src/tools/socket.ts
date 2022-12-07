import {io, Socket} from "socket.io-client";

let socket: Socket

export function connectSocket() {
  socket = io("http://localhost:3001")
  return socket
}

export function getSocket() {
  return socket
}
