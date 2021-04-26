import { createContext, useEffect, useState } from 'react'
import { useSocket } from './SocketProvider'
import {
  LiveVideoContext,
  LiveVideoContextProps,
} from './LiveVideoCreateContext'

export const LiveVideoProvider: React.FC = ({ children }) => {
  const { socket } = useSocket()
  let [liveVideoData, setLiveVideoData] = useState<LiveVideoContextProps>({
    ['']: '',
  })

  useEffect(() => {
    socket.emit('currentLiveVideoRequest')
  }, [socket])

  const getLiveVideo = async () => {
    socket.on(
      'currentLiveVideoResponse',
      async (data: { [x: string]: string }) => {
        console.log('form video player:', data, typeof data)
        setLiveVideoData(data)
      }
    )
  }

  useEffect(() => {
    getLiveVideo()

    return () => {
      socket.off('getLiveVideo')
    }
  }, [socket])

  return (
    <LiveVideoContext.Provider value={liveVideoData}>
      {children}
    </LiveVideoContext.Provider>
  )
}
