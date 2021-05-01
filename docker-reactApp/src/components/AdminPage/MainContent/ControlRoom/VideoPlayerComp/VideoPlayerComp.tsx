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
  const [liveStream, setLiveStream] = useState(false)
  const { socket } = useSocket()
  const selectedVideoName = Object.keys(selectedVideo)[0]
  const selectedVideoUrl = Object.values(selectedVideo)[0]

  const getLiveStreamState = () => {
    socket.on('liveStreamState', async (data: boolean) => {
      setLiveStream(data)
    })
  }

  useEffect(() => {
    getLiveStreamState()
    return () => {
      socket.off('getLiveStreamState')
    }
  }, [socket, setLiveStream])

  const Player = () => {
    if (selectedVideoUrl.endsWith('.m3u8')) {
      return (
        <div className={classes.videoWrapper}>
          {liveStream ? (
            <ReactPlayer controls url={url} />
          ) : (
            <div className={classes.videoWrapper}>
              <span id='liveLabel' className={classes.liveLabel}>
                please start your live stream http://localhost:1936/live/test{' '}
                <br /> replace locahost with your url
              </span>
              <ReactPlayer controls url={url} />
            </div>
          )}
        </div>
      )
    } else {
      return (
        <div className={classes.videoWrapper}>
          <ReactPlayer controls url={url} />
        </div>
      )
    }
  }

  useEffect(() => {
    let videoUrlSrc = ''
    if (selectedVideoUrl.startsWith('http')) {
      videoUrlSrc = selectedVideoUrl
    } else if (selectedVideoUrl.endsWith('.m3u8')) {
      videoUrlSrc = streamPath + selectedVideoUrl
    } else {
      videoUrlSrc = uploadPath + selectedVideoUrl
    }
    setUrl(videoUrlSrc)
    Player()
  }, [socket, selectedVideo])

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
