import React from 'react'
import TabContent from '../Tabs_public/TabContent'
import ControlRoom from './ControlRoom/ControlRoom'
import AccountSettings from './AccountSettings/AccountSettings'

export default function MainContent() {
  return (
    <div>
      <TabContent
        id={'Content_tab1'}
        content={<ControlRoom />}
        default={true}
      />
      <TabContent id={'Content_tab2'} content={<AccountSettings />} />
    </div>
  )
}
