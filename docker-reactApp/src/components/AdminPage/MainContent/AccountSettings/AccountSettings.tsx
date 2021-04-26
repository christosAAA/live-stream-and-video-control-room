import React, { useState, useContext } from 'react'
import { Row } from 'react-bootstrap'
import { CurrentUserContext } from '../../../../contexts/CurrentUserCreateContext'
import ManageUsersPage from './ManageUsersPage/ManageUsersPage'
import ChangePasswordNamePage from './ChangePasswordPage/ChangePasswordNamePage'
import AccoutSettingsNav from './AccountSettingsNav/AccountSettingsNav'
import classes from './AccountSettings.module.css'

type AccountSettingPagePros = {
  showChangePassword: boolean
  showManageSettings: boolean
}

export default function AccountSettings() {
  const currentUser = useContext(CurrentUserContext)

  const [showChangePasswordContent, setShowChangePasswordContent] = useState(
    false
  )
  const [showManageSettingsContent, setShowManageSettingsContent] = useState(
    false
  )

  const AccountSettingPage = (props: AccountSettingPagePros) => {
    let setButton = true
    if (currentUser.userStatus === 'admin') {
      setButton = false
    }
    if (!props.showChangePassword && !props.showManageSettings) {
      //ACCOUNT SETTINGS
      return (
        <div className={classes.accountSettingsContainer}>
          <h1 className={classes.accountSettingsTitle}>Account Settings</h1>
          <AccoutSettingsNav
            setButton={setButton}
            setShowChangePasswordContent={setShowChangePasswordContent}
            setShowManageSettingsContent={setShowManageSettingsContent}
          />
        </div>
      )
    } else if (props.showChangePassword) {
      //CHANGE PASSWORD
      return (
        <div className={classes.contentContainer}>
          <Row className={classes.titleContainer}>
            <i
              className={classes.arrowLeft}
              onClick={() => setShowChangePasswordContent(false)}
            />
            <h1 className={classes.pageTitle}>Change Password</h1>
          </Row>
          <Row>
            <ChangePasswordNamePage />
          </Row>
        </div>
      )
    } else if (props.showManageSettings) {
      //MANAGE USERS
      return (
        <div className={classes.contentContainer}>
          <Row className={classes.titleContainer}>
            <i
              className={classes.arrowLeft}
              onClick={() => setShowManageSettingsContent(false)}
            />
            <h1 className={classes.pageTitle}>Manage Users</h1>
          </Row>
          <Row>
            <ManageUsersPage />
          </Row>
        </div>
      )
    } else {
      return <h2>components cannot be rendered</h2>
    }
  }

  return (
    <AccountSettingPage
      showChangePassword={showChangePasswordContent}
      showManageSettings={showManageSettingsContent}
    />
  )
}
