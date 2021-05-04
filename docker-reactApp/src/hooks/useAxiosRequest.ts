import { useContext } from 'react'
import axios, { Method } from 'axios'
import { CurrentUserContext } from '../contexts/CurrentUserCreateContext'
import { api_base } from '../config'

export type LoginFormData = {
  userName: string
  password: string
}
export const useAxiosRequest = () => {
  const currentUserContext = useContext(CurrentUserContext)

  const request = async (
    type: Method | undefined,
    route: string,
    data?: object | undefined
  ) => {
    const authAxios = axios.create({
      auth: {
        username: currentUserContext.userName,
        password: currentUserContext.password,
      },
    })

    let serverIp = api_base
    const response = await authAxios({
      method: type,
      url: serverIp + route,
      data: data,
    })
    return response
  }

  return { request }
}
