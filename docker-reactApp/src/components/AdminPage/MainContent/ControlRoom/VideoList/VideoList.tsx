import React, { useState } from 'react'
import classes from './VideoList.module.css'
import CreateVideoList from './CreateVideoList'

export default function VideoList() {
  const [height, setHeight] = useState(document.body.clientHeight - 250)

  const resizeObserver = new ResizeObserver((heightValue) =>
    setHeight(heightValue[0].target.clientHeight - 250)
  )
  resizeObserver.observe(document.body)
  return (
    <div className={classes.scrollbar} style={{ height: height }}>
      <CreateVideoList />
    </div>
  )
}
