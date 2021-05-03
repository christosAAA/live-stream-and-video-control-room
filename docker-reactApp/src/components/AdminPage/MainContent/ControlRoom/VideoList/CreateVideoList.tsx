import React, { useContext, useState } from 'react'
import {
  SelectedVideoContext,
  SelectedVideoContextProps,
  SelectedVideoProps,
} from '../../../../../contexts/SelectedVideoCreateContext'
import { useLiveVideo } from '../../../../../hooks/useLiveVideo'
import { useVideoList } from '../../../../../hooks/useVideoList'
import { useAxiosRequest } from '../../../../../hooks/useAxiosRequest'
import { setSelectState, setDeleteIcon, setSpinnerIcon } from './utils'
import classes from './VideoList.module.css'
import CreateListItem from './CreateListItem'

export default function CreateVideoList() {
  const { request } = useAxiosRequest()
  const { liveVideo } = useLiveVideo()
  const { videoList } = useVideoList()
  const videoFullList = videoList()
  const [prev, setPrev] = useState(0)
  //Set CSS
  const [listDisable, setListDisable] = useState(classes.listContainer)
  const [deleteIconDisplay, setDeleteIconDisplay] = useState('none')
  const { setSelectedVideo } = useContext<SelectedVideoContextProps>(
    SelectedVideoContext
  )
  //
  const chooseVideo = async (
    key: number,
    videoFullList: Array<{ [x: string]: string }>
  ) => {
    const selectedVideoName = Object.keys(videoFullList[key])[0]
    const selectedVideoUrl = Object.values(videoFullList[key])[0]
    const selectedElement = { [selectedVideoName]: selectedVideoUrl }

    setSelectState(key, prev, setPrev)
    setSelectedVideo(selectedElement)
    setDeleteIcon(key, 'chooseVideo', prev, setPrev)
  }

  const deleteVideo = async (
    selectedVideo: SelectedVideoProps,
    key: number,
    videoFullList: Array<{ [x: string]: string }>
  ) => {
    if (key === 0) {
      // console.log('cannot delete main')
      return
    }
    if (!window.confirm(`Delete video ${Object.keys(selectedVideo)[0]} ?`))
      return
    const selectedVideoUrl = Object.values(selectedVideo)[0]
    setSpinnerIcon(true, key)
    setDeleteIconDisplay('none')
    setListDisable(classes.setListInactive)
    setDeleteIcon(key, 'deleteVideoState')
    const response = await request('post', '/delete_video', {
      currentVideo: selectedVideoUrl,
    })

    if (response) {
      setListDisable(classes.listContainer)
      setSpinnerIcon(false, key)
      chooseVideo(key - 1, videoFullList)
    }
  }

  const linkIconDisplay = (item: SelectedVideoProps) => {
    let linkDisplay = 'none'
    const link = Object.values(item)[0]
    if (link.endsWith('.m3u8')) {
      linkDisplay = 'inline-block'
    }
    return linkDisplay
  }

  const liveIconDisplay = (
    key: number,
    item: SelectedVideoProps,
    liveVideoUrl: string
  ) => {
    let liveDisplay = 'none'
    const link = Object.values(item)[0]
    if (link === liveVideoUrl) {
      liveDisplay = 'flex'
    }
    return liveDisplay
  }

  const listGroup = videoFullList.map(
    (item: SelectedVideoProps, key: number) => {
      let linkDisplay = linkIconDisplay(item)
      let liveDisplay = liveIconDisplay(key, item, liveVideo().url)
      return (
        <li key={key} className={classes.listItem} id={`button${key}`}>
          <CreateListItem
            keyId={key}
            item={item}
            linkDisplay={linkDisplay}
            liveDisplay={liveDisplay}
            chooseVideo={chooseVideo}
            deleteVideo={deleteVideo}
            deleteIconDisplay={deleteIconDisplay}
          />
        </li>
      )
    }
  )

  return (
    <ul id='videoList' className={listDisable}>
      {listGroup}
    </ul>
  )
}
