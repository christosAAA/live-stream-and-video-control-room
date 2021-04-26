import React, { useContext, useEffect, useState } from 'react'
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


// import React, { useContext, useEffect, useState } from "react";
// import { io, Socket } from "socket.io-client";
// // import { api_base } from '../config'
// import {socket_base} from '../config'

// type SocketStore = {
//   socketConnect: () => Socket;
// };

// const defaultSocketValue: SocketStore = {
//   socketConnect: () => io(socket_base)
// };

// const SocketContext = React.createContext<SocketStore>(defaultSocketValue);

// export const useSocket = () => {
//   return useContext(SocketContext);
// };

// export const SocketProvider: React.FC = ({ children }) => {
//   const [socket, setSocket] = useState<SocketStore>({
//     socketConnect: () => io(socket_base),
//   });

//   useEffect(() => {
//     const newSocket = io(socket_base);
//     console.log('newSocket', newSocket);
//     setSocket({ socketConnect: () => newSocket });

//     return () => {
//       newSocket.disconnect();
//     };
//   }, []);

//   return (
//     <SocketContext.Provider value={socket}>
//       {children}
//     </SocketContext.Provider>
//   );
// };