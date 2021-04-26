import { createContext } from 'react'
import {  LoginResponseProps } from '../components/App'


export const CurrentUserContext = createContext<LoginResponseProps>({
    loginCheck: false,
    userStatus: "",
    userName: "",
    password:""
  })