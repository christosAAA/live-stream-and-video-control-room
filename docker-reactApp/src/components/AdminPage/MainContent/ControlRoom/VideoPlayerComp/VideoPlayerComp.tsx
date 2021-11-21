import React, { useContext} from 'react'
import { SelectedVideoContext } from '../../../../../contexts/SelectedVideoCreateContext'
import PublishVideoButton from '../PublishVideoButton/PublishVideoButton'
import classes from './VideoPlayerComp.module.css'
import Player from './Player'



export default function VideoPlayerComp() {
  const { selectedVideo } = useContext(SelectedVideoContext)
  const selectedVideoName = Object.keys(selectedVideo)[0]

  return (
    <div style={{ paddingTop: '66px' }}>
      <Player selectedVideo={ selectedVideo }/>
      <div className={classes.videoFooter}>
        <div className={classes.videoTitle}>{selectedVideoName}</div>
        <PublishVideoButton />
      </div>
    </div>
  )
}
