import React, { useContext } from 'react'
import {
  VideosListDataContext,
  VideosInfoFromFileProps,
} from '../contexts/VideoListCreateContext'

type fullVideoArrayProps = { [x: string]: string }

export const useVideoList = () => {
  const videoFullList: VideosInfoFromFileProps = useContext(
    VideosListDataContext
  )

  const videoList = () => {
    let fullVideoArray: fullVideoArrayProps[] = [] // artem question fro types

    if (videoFullList !== undefined && videoFullList) {
      fullVideoArray.push(videoFullList.streams.default)
      Object.keys(videoFullList.streams.fromUser).forEach((item) => {
        fullVideoArray.push({ [item]: videoFullList.streams.fromUser[item] })
      })
      Object.keys(videoFullList.videos).forEach((item) => {
        fullVideoArray.push({ [item]: videoFullList.videos[item] })
      })
    }
    return fullVideoArray
  }

  return { videoList }
}
