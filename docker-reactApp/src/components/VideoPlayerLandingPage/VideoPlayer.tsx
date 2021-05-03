import React, { useEffect } from 'react'
import { useSocket } from '../../contexts/SocketProvider'
import ReactPlayer from 'react-player'
import ViewersCount from '../ViewersCount_public/ViewersCount'
import { useLiveVideo } from '../../hooks/useLiveVideo'
import classes from './VideoPlayer.module.css'
import { uploadPath, streamPath } from '../../config'

export default function VideoPlayer() {
  const { socket } = useSocket()
  const { liveVideo } = useLiveVideo()

  useEffect(() => {
    socket.emit('connectedUsers')
  }, [socket])

  const vplayer = document.getElementById('videoPlayer')
  const liveLabel = document.getElementById('liveLabel')
  if (vplayer) {
    vplayer.onmouseover = () => {
      if (liveVideo().url.endsWith('.m3u8')) {
        if (liveLabel) {
          liveLabel.style.display = 'flex'
        }
      }
      vplayer.onmouseout = () => {
        if (liveLabel) {
          liveLabel.style.display = 'none'
        }
      }
    }
  }

  let videoUrlSrc = ''
  if (liveVideo().url.startsWith('http')) {
    // for local development
    videoUrlSrc = liveVideo().url
  } else if (liveVideo().url.endsWith('.m3u8')) {
    videoUrlSrc = streamPath + liveVideo().url
  } else {
    videoUrlSrc = uploadPath + liveVideo().url
  }

  return (
    <div className={classes.videoPage}>
      <div id='videoPlayer' className={classes.videoContainer}>
        <span id='liveLabel' className={classes.liveLabel}>
          Live
        </span>
        <ReactPlayer
          className={classes.videoPlayer}
          controls
          loop
          url={videoUrlSrc}
        />
        <div className={classes.titleContainer}>
          <h5 className={classes.videoTitle}>{liveVideo().name}</h5>
          <ViewersCount />
        </div>
      </div>
    </div>
  )
}
