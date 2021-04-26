import React, { useContext, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { SelectedVideoContext } from '../../../../../contexts/SelectedVideoCreateContext'
import PublishVideoButton from '../PublishVideoButton/PublishVideoButton'
import classes from './VideoPlayerComp.module.css'


export default function VideoPlayerComp() {
  const { selectedVideo } = useContext(SelectedVideoContext)
  const [url, setUrl] = useState('')
  const selectedVideoName = Object.keys(selectedVideo)[0]
  const selectedVideoUrl = Object.values(selectedVideo)[0]

  const Player = () => {
    return (
      <div className={classes.videoWrapper}>
        <ReactPlayer controls url={url} />
      </div>
    )
  }

  useEffect(() => {
    let videoUrlSrc = ''
    if (selectedVideoUrl.endsWith('.m3u8')) {
      videoUrlSrc = '/stream/' + selectedVideoUrl
    } else if (selectedVideoUrl.endsWith('.m3u8') && selectedVideoName !== "main"){
      videoUrlSrc = selectedVideoUrl
    } else {
      videoUrlSrc = '/uploads/' + selectedVideoUrl
    }
    setUrl(videoUrlSrc)
    Player()
  }, [selectedVideo])

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
