import React, {useEffect, useState} from 'react';
import './App.css';
import {MainView} from "./views/MainView";
import {ROUTES} from "./constants/routes";
import {SignView} from "./views/SignView";
import {User} from "./types/items";
import {connectSocket} from "./tools/socket";
import {useMessages} from "./hooks/message";
import {useUsers} from "./hooks/users";
import {useRoom} from "./hooks/room";


function App() {
  const {setUsers, updateUser, removeUser, computeDepartureTime} = useUsers(state => ({
    setUsers: state.setAll,
    updateUser: state.update,
    removeUser: state.remove,
    computeDepartureTime: state.computeDepartureTime
  }))
  const {setRoom, setDestination, setMeetingTime, setRestaurants, restaurants, destination} = useRoom(state => ({
    setRoom: state.setRoom,
    setDestination: state.setDestination,
    setMeetingTime: state.setMeetingTime,
    setRestaurants: state.setRestaurants,
    restaurants: state.restaurants,
    destination: state.destination
  }))

  const [route, setRoute] = useState(ROUTES.HOME)
  const [userForm, setUserForm] = useState({username: "", room: ""})

  const addMessage = useMessages(state => state.addMessage)

  const onSubmitUser = (username: string, room: string) => {
    setUserForm({username, room})
  }

  useEffect(() => {
    const {username, room} = userForm

    if (!username || !room) return

    const socket = connectSocket()

    setRoom(room)
    setRoute(ROUTES.ROOM)

    socket.on("connect", () => {

      socket.on("new-user", (users: User[]) => {
        setUsers(users.map(user => ({...user, isMe: user.id === socket.id})))
      })

      socket.on("update-user", user => {
        updateUser(user)
      })

      socket.on("leave-user", user => {
        removeUser(user)
      })

      socket.on("update-destination", (destination) => {
        setDestination(destination)
      })

      socket.on("message", message => {
        addMessage({
          ...message,
          sentAt: new Date(message.sentAt),
        })
      })

      socket.on("update-room-data", ({meetingTime, restaurants, destination}) => {
        meetingTime && setMeetingTime(meetingTime)
        restaurants && setRestaurants(restaurants)
        destination && setDestination(destination)
      })

      socket.emit("join-room", {username, room})

    })

    return () => {
      socket.removeAllListeners()
    }
  }, [userForm])

  useEffect(() => {
    computeDepartureTime()
  }, [restaurants, destination])

  return (
    <div className="App">
      {
        route === ROUTES.HOME && <SignView onSubmitUser={onSubmitUser}/>
      }
      {
        route === ROUTES.ROOM && <MainView/>
      }
    </div>
  );
}

export default App;
