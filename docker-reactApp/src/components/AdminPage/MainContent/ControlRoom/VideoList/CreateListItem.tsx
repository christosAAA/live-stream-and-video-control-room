import React, { useContext } from 'react'
import {
  SelectedVideoContext,
  SelectedVideoContextProps,
  SelectedVideoProps,
} from '../../../../../contexts/SelectedVideoCreateContext'
import classes from './VideoList.module.css'
import { Spinner } from 'react-bootstrap'
import { useVideoList } from '../../../../../hooks/useVideoList'

type Props = {
  key: number
  item: SelectedVideoProps
  liveDisplay: string
  linkDisplay: string
  chooseVideo: (
    key: number,
    videoFullList: Array<{ [x: string]: string }>
  ) => void
  deleteVideo: (
    selectedVideo: SelectedVideoProps,
    key: number,
    videoFullList: Array<{ [x: string]: string }>
  ) => void
  deleteIconDisplay: string
}

export default function CreateListItem(props: Props) {
  const { videoList } = useVideoList()
  const videoFullList = videoList()
  const { selectedVideo } = useContext<SelectedVideoContextProps>(
    SelectedVideoContext
  )
  return (
    <div key={props.key} className={classes.videoItem}>
      <div
        className={classes.videoName}
        key={props.key}
        onClick={() => props.chooseVideo(props.key, videoFullList)}
      >
        {Object.keys(props.item)}
        <div
          className={classes.liveIndicator}
          style={{
            display: props.liveDisplay,
          }}
        >
          live
        </div>
      </div>

      <div className={classes.iconArea}>
        <i
          id={`deleteIcon${props.key}`}
          style={{ display: props.deleteIconDisplay }}
          className={classes.deleteIcon}
          onClick={() =>
            props.deleteVideo(selectedVideo, props.key, videoFullList)
          }
        ></i>
        <Spinner
          id={`spinner${props.key}`}
          style={{ marginTop: '0', display: 'none' }}
          animation='grow'
        />
        <i
          className={classes.linkIcon}
          style={{
            marginTop: '0',
            display: props.linkDisplay,
          }}
        ></i>
      </div>
    </div>
  )
}
