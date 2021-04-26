import React from 'react'
import { onClickTabButton } from './utils'
import './tabs.css'

type Props = { id: string; name: string; default?: boolean }

const TabButton = (props: Props) => {
  let buttonState: string
  if (props.default) {
    buttonState = 'NavButtons current'
  } else {
    buttonState = 'NavButtons'
  }
  return (
    <button
      id={props.id}
      className={buttonState}
      onClick={(e) => {
        onClickTabButton(e)
      }}
    >
      {props.name}
    </button>
  )
}

export default TabButton
