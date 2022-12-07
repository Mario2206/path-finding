import { User } from "./items";

export type Message = {
  value: string
  sentAt: Date
  sender: User
}
