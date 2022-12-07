import {Command} from "./Command";
import {Server, Socket} from "socket.io";

export class CommandManager {
  constructor(
    private commands: Command[],
  ) {
  }

  execute(io: Server, socket: Socket, entry: string) {
    const command = this.commands.find(command => entry.includes(command.name))

    if(!command) return false

    const commandParams = entry.replace(command.name, "")
      .split(" ")
      .filter(v => v)

    try {
      command.execute(io, socket, ...commandParams)
    } catch (e) {
      console.error(e)
      return false
    }

    return true
  }
}
