import React, { useContext } from 'react'
import { io, Socket } from 'socket.io-client'
import { socket_base } from '../config'

type SocketStore = {
  socket: Socket
}

const defaultSocketValue: SocketStore = {
  socket: io(socket_base),
}

const SocketContext = React.createContext<SocketStore>(defaultSocketValue)

export const useSocket = () => {
  return useContext(SocketContext)
}

export const SocketProvider: React.FC = ({ children }) => {
  return (
    <SocketContext.Provider value={defaultSocketValue}>
      {children}
    </SocketContext.Provider>
  )
}
