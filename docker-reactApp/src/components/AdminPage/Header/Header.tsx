import React from 'react'
import ViewersCount from '../../ViewersCount_public/ViewersCount'
import { useLiveVideo } from '../../../hooks/useLiveVideo'
import classes from './Header.module.css'

export default function Header() {
  const { liveVideo } = useLiveVideo()
  return (
    <div className={classes.header}>
      <div
        className={`${classes.centerContainer} ${classes.basicFlex} ${classes.spaceFlex}`}
      >
        <div className={classes.basicFlex}>
          <span className={classes.liveIndicator}>{'LIVE NOW'}</span>
          <span className={classes.headerText}>{liveVideo().name}</span>
        </div>
        <div className={classes.basicFlex}>
          <a className={classes.livePageButton} href='/' target='blank'>
            <i className={classes.cameraIcon}></i>
            Go to live site
          </a>
          <ViewersCount />
        </div>
      </div>
    </div>
  )
}
