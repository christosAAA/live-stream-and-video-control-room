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
  const [liveStreamUrl, setLiveStreamUrl] = useState('')

useEffect(() => {
      // default live stream test.m3u8
      let prevStreamStatus = false
      socket.on('liveStreamState', async (data: boolean) => {
        setLiveStream(data)
        if (data !== prevStreamStatus) {
          prevStreamStatus = data
          if (selectedVideoUrl.endsWith('test.m3u8')) {
            setLiveStreamUrl(streamPath + selectedVideoUrl)
          }
        }
      })
}, [socket, selectedVideo])

  useEffect(() => {

    // user live stream link
    let videoUrlSrc = ''
    if (selectedVideoUrl.endsWith('.m3u8')) {
      videoUrlSrc = selectedVideoUrl
      setUrl(videoUrlSrc)
    }
    // static video files
    if (selectedVideoUrl.endsWith('.mp4')) {
      videoUrlSrc = uploadPath + selectedVideoUrl
      setUrl(videoUrlSrc)
    }
  }, [selectedVideo])

  const Player = () => {
    if (selectedVideoUrl.startsWith('http')) {
      return (
        <div className={classes.videoWrapper}>
          <ReactPlayer controls loop url={url} />
        </div>
      )
    }
    if (selectedVideoUrl.endsWith('test.m3u8')) {
      return (
        <div className={classes.videoWrapper}>
          {liveStream ? (
            <ReactPlayer controls loop url={liveStreamUrl} />
          ) : (
            <div className={classes.videoWrapper}>
              <span id='liveLabel' className={classes.liveLabel}>
                http://localhost:1936/live/test
                <br /> please start your live stream, replace locahost with your
                url
              </span>
              <ReactPlayer controls loop url={liveStreamUrl} />
            </div>
          )}
        </div>
      )
    }
    if (selectedVideoUrl.endsWith('.mp4')) {
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
