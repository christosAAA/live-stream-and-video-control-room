import React, {useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import classes from './VideoPlayerComp.module.css'
import { uploadPath, streamPath } from '../../../../../config'
import { useSocket } from '../../../../../contexts/SocketProvider'

const Player = ({ selectedVideo }) => {
  const [url, setUrl] = useState('')
  const { socket } = useSocket()
  const selectedVideoUrl = Object.values(selectedVideo)[0] as string
  const [liveStreamUrl, setLiveStreamUrl] = useState('')

  useEffect(() => {
    // default live stream test.m3u8
    socket.on('liveStreamState', async (data: boolean) => {
      if (data === true && selectedVideoUrl.endsWith('test.m3u8')) {
        setLiveStreamUrl(streamPath + selectedVideoUrl)
      } else if (data === false) {
        setLiveStreamUrl('')
      }
    })
    return () => {
      socket.off('liveStreamState')
    }
  }, [socket])

  useEffect(() => {
    // user live stream link
    let videoUrlSrc = ''
    if (selectedVideoUrl.startsWith('http')) {
      videoUrlSrc = selectedVideoUrl
      setUrl(videoUrlSrc)
    } else if (selectedVideoUrl.endsWith('.mp4')) {
      // static video files
      videoUrlSrc = uploadPath + selectedVideoUrl
      setUrl(videoUrlSrc)
    } else if (selectedVideoUrl.endsWith('.m3u8')) {
      setUrl(liveStreamUrl)
    }
  }, [selectedVideo])

  if (selectedVideoUrl.endsWith('test.m3u8')) {
    return (
      <div className={classes.videoWrapper}>
        <span id='liveLabel' className={classes.liveLabel}>
          rtmp://localhost:1936/live/test
          <br /> please start your live stream, replace locahost with your url
        </span>
        <ReactPlayer
          controls
          loop
          url={liveStreamUrl}
          playing={true}
          muted={true}
        />
      </div>
    )
  } else {
    return (
      <div className={classes.videoWrapper}>
        {'normal'}
        <ReactPlayer controls loop url={url} playing={true} muted={true} />
      </div>
    )
  }
}

export default Player
