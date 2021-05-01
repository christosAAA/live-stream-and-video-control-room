import { useEffect, useState } from 'react'
import { useSocket } from './SocketProvider'
import {
  VideosListDataContext,
  VideosInfoFromFileProps,
} from './VideoListCreateContext'

export const VideoListProvider: React.FC = ({ children }) => {
  const { socket } = useSocket()
  const [fullList, setFullList] = useState<VideosInfoFromFileProps>({
    streams: {
      default: {
        main: '',
      },
      fromUser: {},
    },
    videos: {
      ['']: '',
    },
  })

  useEffect(() => {
    socket.emit('videoFilesListRequest')
    return () => {
      socket.off('videoFilesListRequest')
    }
  }, [socket])

  useEffect(() => {
    socket.on('fullVideoList', async (response: VideosInfoFromFileProps) => {
      setFullList(response)
    })
    return () => {
      socket.off('fullVideoList')
    }
  }, [socket])

  return (
    <VideosListDataContext.Provider value={fullList}>
      {children}
    </VideosListDataContext.Provider>
  )
}
