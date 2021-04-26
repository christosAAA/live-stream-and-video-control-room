import React, { useContext } from 'react'
import TabButton from '../Tabs_public/TabButton'
import { CurrentUserContext } from '../../../contexts/CurrentUserCreateContext'
import classes from './NavBar.module.css'

export default function NavBar() {
  const currentUserContext = useContext(CurrentUserContext)
  return (
    <div className={classes.centerContainerAdminPage}>
      <div>
        <i className={classes.klaketIcon}></i>
        <TabButton id={'tab1'} name={'Control Room'} default={true} />
        <TabButton id={'tab2'} name={'Account Settings'} />
      </div>
      <span className={classes.userContainer}>
        <i className={classes.userIcon}></i>
        {currentUserContext.userName}
      </span>
    </div>
  )
}
