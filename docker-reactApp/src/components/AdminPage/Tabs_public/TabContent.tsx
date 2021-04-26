import React from 'react'
import './tabs.css'

type Props = {
  id: string
  content: React.ReactElement
  default?: boolean
}

const TabContent = (props: Props) => {
  let contentState: string
  if (props.default) {
    contentState = 'block'
  } else {
    contentState = 'none'
  }

  return (
    <div id={props.id} style={{ display: contentState }}>
      {props.content}
    </div>
  )
}

export default TabContent
