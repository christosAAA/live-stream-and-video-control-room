import React, { useState, useEffect } from 'react'
import { useSocket } from '../../contexts/SocketProvider'
import classes from './ViewersCount.module.css'

export default function ViewersCount() {
  let [viewersCount, setViewersCount] = useState(0)
  const { socket } = useSocket()

  const getViewers = async () => {
    let userStatus = 'admin'
    socket.emit('connectedUsers', userStatus)
    socket.on('connectedUsersResponse', async (data: number) => {
      setViewersCount(data)
    })
  }

  useEffect(() => {
    getViewers()
    return () => {
      socket.off('getViewers')
    }
  }, [socket, setViewersCount])

  return (
    <div className={classes.viewersCountContainer}>
      <span>{'Live viewers'}</span>
      <i className={classes.viewIcons}></i>
      <span className={classes.count}>{viewersCount}</span>
    </div>
  )
}
