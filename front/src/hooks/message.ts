import create from "zustand"
import {getSocket} from "../tools/socket";
import {Message} from "../types/message";
import {useUsers} from "./users";


type UseMessageState = {
  messages: Message[]
  addMessage: (message: Omit<Message, "sender"> & {sender: string}) => void
  processMessage: (message: string) => void
}

export const useMessages = create<UseMessageState>((set, get) => ({
  messages: [],
  addMessage: message => {
    const sender = useUsers.getState().users.find(user => user.id === message.sender)
    if(!sender) return
    const newMessage : Message = {
      ...message,
      sender
    }
    set(state => ({
      messages: [
        ...state.messages,
        newMessage
      ]
    }))
  },
  processMessage : (message) =>  {
    getSocket().emit("message", message)
  }
}))
