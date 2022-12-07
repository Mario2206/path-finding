import {Server, Socket} from "socket.io";

export class Command {
  constructor(
    public readonly name : string,
    private handler : (io: Server, socket: Socket, ...params: string[]) => void
  ) {
  }

  execute(io: Server, socket: Socket, ...params: string[]) {
    this.handler(io, socket, ...params)
  }
}
