import React, { useContext, useEffect } from 'react'
import {
  SelectedVideoContext,
  SelectedVideoContextProps,
  SelectedVideoProps,
} from '../../../../../contexts/SelectedVideoCreateContext'
import classes from './VideoList.module.css'
import { Spinner } from 'react-bootstrap'
import { useVideoList } from '../../../../../hooks/useVideoList'
import { setDeleteIcon } from './utils'

type Props = {
  keyId: number
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
  const disableDeleteButtonOnLiveVideo = () => {
    let para = document.querySelectorAll<HTMLElement>('[id^="liveIndicator"]')
    para.forEach((item, i) => {
      if (item.style.display === 'flex') {
        props.chooseVideo(i, videoFullList)
        setDeleteIcon(i, 'deleteVideoState')
      }
    })
  }
  useEffect(() => {
    disableDeleteButtonOnLiveVideo()
  }, [])
  return (
    <div key={props.keyId} className={classes.videoItem}>
      <div
        className={classes.videoName}
        key={props.keyId}
        onClick={() => props.chooseVideo(props.keyId, videoFullList)}
      >
        {Object.keys(props.item)}
        <div
        id={'liveIndicator' + props.keyId}
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
          id={`deleteIcon${props.keyId}`}
          style={{ display: props.deleteIconDisplay }}
          className={classes.deleteIcon}
          onClick={() =>
            props.deleteVideo(selectedVideo, props.keyId, videoFullList)
          }
        ></i>
        <Spinner
          id={`spinner${props.keyId}`}
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
