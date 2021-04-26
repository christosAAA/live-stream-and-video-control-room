import React, { useEffect } from 'react'
import { useSocket } from '../../contexts/SocketProvider'
import ReactPlayer from 'react-player'
import ViewersCount from '../ViewersCount_public/ViewersCount'
import { useLiveVideo } from '../../hooks/useLiveVideo'
import classes from './VideoPlayer.module.css'
import { useAxiosRequest } from '../../hooks/useAxiosRequest'
import { api_base } from '../../config'
import Header from '../AdminPage/Header/Header'

export default function VideoPlayer() {
  const { socket } = useSocket()
  const { request } = useAxiosRequest()
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
  if (liveVideo().url.endsWith('.m3u8')) {
    videoUrlSrc = '/stream/' + liveVideo().url
  } else {
    videoUrlSrc = '/uploads/' + liveVideo().url
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
