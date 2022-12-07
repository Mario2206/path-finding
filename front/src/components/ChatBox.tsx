import React, {FormEventHandler, useState} from "react";
import {Message} from "../types/message";
import {formatDateToDayScope} from "../tools/date.formatter";

type Props = {
  messages: Message[],
  processMessage: (message: string) => void
}

export const ChatBox = ({messages, processMessage} : Props) => {
  const [message, setMessage] = useState("")

  const onSubmit : FormEventHandler = (e) => {
    e.preventDefault()
    if(!message) return
    processMessage(message)
    setMessage("")
  }

  return (
    <form id="chat" className={"chat"} onSubmit={onSubmit}>
      <div className={"chat-body"}>
        {
          messages.map((message, index) => (
            <div key={index} className={"chat-body-item"}>
              <p style={{color: message.sender.color }}>{message.value}</p>
              <span style={{color: message.sender.color }} className={"chat-body-date"}>{formatDateToDayScope(message.sentAt)}</span>
            </div>
          ))
        }
      </div>
      <div className={"chat-input"}>
        <input type="text" value={message} onChange={e => setMessage(e.target.value)}/>
      </div>
    </form>
  )
}
