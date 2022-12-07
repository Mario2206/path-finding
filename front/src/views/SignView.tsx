import {FormEventHandler, useState} from "react";
import {User} from "../types/items";

type Props = {
  onSubmitUser: (username: string, room: string) => void
}

export const SignView = ({ onSubmitUser } : Props) => {
  const [username, setUsername] = useState("Test")
  const [room, setRoom] = useState("Room 1")
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit : FormEventHandler = (e) => {
    e.preventDefault()

    if(isLoading) return

    if(!username || !room) {
      return alert("The form isn't valid")
    }

    onSubmitUser(username, room)

  }

  return (
    <div className="sign-form">
      <form onSubmit={onSubmit} className="sign-form--form">
        <div className="sign-form--header">
          <h1>Nice map</h1>
        </div>
        <div className="sign-form--input-group">
          <label htmlFor="username">Username</label>
          <input type="text" id={"username"} value={username} onChange={e => setUsername(e.target.value)}/>
        </div>
        <div className="sign-form--input-group">
          <label htmlFor="room">Room</label>
          <input type="text" id={"room"} value={room} onChange={e => setRoom(e.target.value)}/>
        </div>
        <div className="sign-form--footer">
          <button className="action-btn">Confirm</button>
        </div>
      </form>
    </div>
  )
}
