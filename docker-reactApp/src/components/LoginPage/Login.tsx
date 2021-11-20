import React, { useState } from 'react'
import { Form, FormControlProps } from 'react-bootstrap'
import { useAxiosRequest } from '../../hooks/useAxiosRequest'
import classes from './Login.module.css'

export type LoginSubmitProps = {
  onResponse: (loginResponseData: LoginResponseData) => void
}

export type LoginFormData = {
  userName: string
  password: string
}

export type LoginResponseData = {
  userStatus: string
  userName: string
  password: string
  loginCheck: boolean
  userNameFile: string
}

const Login = (props: LoginSubmitProps) => {
  const [loginMessage, setLoginMessage] = useState('')
  const [loginUserData, setLoginUserData] = useState<LoginFormData>({
    userName: '',
    password: '',
  })
  const { request } = useAxiosRequest()
  const setUserName: FormControlProps['onChange'] = (event) => {
    setLoginUserData({ ...loginUserData, userName: event.target.value })
  }

  const setUserPassword: FormControlProps['onChange'] = (event) => {
    setLoginUserData({ ...loginUserData, password: event.target.value })
  }

  const [loginTitleClassName, setloginTitleClassName] = useState(
    `${classes.loginTitle}`
  )
  const [loginMessageClassName, setloginMessageClassName] = useState(
    `${classes.loginMessage}`
  )

  const loginValidation = async (loginUserData: LoginFormData) => {
    const response = await request('post', '/login', loginUserData)
    if (response.data.message === true) {
      const loginResponseData: LoginResponseData = {
        ...loginUserData,
        ...{
          loginCheck: true,
          userNameFile: response.data.userName,
          userStatus: response.data.userStatus,
          password: response.data.password,
        },
      }
      props.onResponse(loginResponseData)
    } else {
      setloginTitleClassName(
        `${classes.loginTitle} ${classes.loginTitleMargin}`
      )
      setloginMessageClassName(
        `${classes.loginMessage} ${classes.loginMessageVissible}`
      )
      if (response.data.message === 'wrong user name') {
        setLoginMessage('Please check your user name')
      }
      if (response.data.message === false) {
        setLoginMessage('Please check your password')
      }
    }
  }

  function handleSubmit(event: React.FormEvent, loginUserData: LoginFormData) {
    event.preventDefault()
    loginValidation(loginUserData)
  }

  return (
    <div className={classes.loginBackground}>
      <div className={classes.loginContainer}>
        <Form
          onSubmit={(event) => handleSubmit(event, loginUserData)}
          className='w-100'
        >
          <h1 id='loginTitle' className={loginTitleClassName}>
            Login
          </h1>
          <h5 id='loginMessage' className={loginMessageClassName}>
            {loginMessage}
          </h5>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control type='text' required onChange={setUserName} />
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' required onChange={setUserPassword} />
          </Form.Group>
          <button type='submit'>Log in</button>
        </Form>
      </div>
    </div>
  )
}

export default Login
