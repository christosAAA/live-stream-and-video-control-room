import { createContext } from 'react'

export type LiveVideoContextProps = {
  [x: string]: string
}

export const LiveVideoContext = createContext<LiveVideoContextProps>({
  ['']: '',
})
