import React, { useContext, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { SelectedVideoContext } from '../../../../../contexts/SelectedVideoCreateContext'
import PublishVideoButton from '../PublishVideoButton/PublishVideoButton'
import classes from './VideoPlayerComp.module.css'
import { uploadPath, streamPath } from '../../../../../config'
import { useSocket } from '../../../../../contexts/SocketProvider'

export default function VideoPlayerComp() {
  const { selectedVideo } = useContext(SelectedVideoContext)
  const [url, setUrl] = useState('')
  
  const { socket } = useSocket()
  const selectedVideoName = Object.keys(selectedVideo)[0]
  const selectedVideoUrl = Object.values(selectedVideo)[0]
  const [liveStream, setLiveStream] = useState(false)
  const [prevLiveStream, setPrevLiveStream] = useState<boolean>()

  useEffect(() => {
    if (selectedVideoUrl.endsWith('.m3u8') && !selectedVideoUrl.startsWith('http')) {
      socket.emit('liveStreamStateRequest')
      socket.on('liveStreamState', async (data: boolean) => {
        if (prevLiveStream !== data) {
          setLiveStream(data)
        }
        setPrevLiveStream(data)
      })
    }
    return () => {
      socket.off('liveStreamStateRequest')
      socket.off('liveStreamState')
    }
  }, [socket,selectedVideo])

  const Player = () => {
    let videoUrlSrc = ''
    if (selectedVideoUrl.startsWith('http')) {
      videoUrlSrc = selectedVideoUrl
      setUrl(videoUrlSrc)
      return (
        <div className={classes.videoWrapper}>
          <ReactPlayer controls loop url={url} />
        </div>
      )
    }
    if (selectedVideoUrl.endsWith('.m3u8') && !selectedVideoUrl.startsWith('http')) {
      videoUrlSrc = streamPath + selectedVideoUrl
      setUrl(videoUrlSrc)
      return (
        <div className={classes.videoWrapper}>
          {liveStream ? (
            <ReactPlayer controls loop url={url} />
          ) : (
            <div className={classes.videoWrapper}>
              <span id='liveLabel' className={classes.liveLabel}>
                please start your live stream http://localhost:1936/live/test{' '}
                <br /> replace locahost with your url
              </span>
              <ReactPlayer controls loop url={url} />
            </div>
          )}
        </div>
      )
    }
    if (selectedVideoUrl.endsWith('.mp4')) {
      videoUrlSrc = uploadPath + selectedVideoUrl
      setUrl(videoUrlSrc)
      return (
        <div className={classes.videoWrapper}>
          <ReactPlayer controls loop url={url} />
        </div>
      )
    }
  }

  return (
    <div style={{ paddingTop: '66px' }}>
      <Player />
      <div className={classes.videoFooter}>
        <div className={classes.videoTitle}>{selectedVideoName}</div>
        <PublishVideoButton />
      </div>
    </div>
  )
}
