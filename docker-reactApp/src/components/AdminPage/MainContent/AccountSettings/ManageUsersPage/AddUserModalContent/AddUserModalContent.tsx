import React, { useState } from 'react'
import { Container, Form, FormControlProps } from 'react-bootstrap'
import { useAxiosRequest } from '../../../../../../hooks/useAxiosRequest'
import classes from './AddUserModalContent.module.css'

export type LoginFormData = {
  newUserStatus: string
  newUserName: string
  newPassword: string
}

export type LoginResponseData = {
  loginCheck: boolean
  userNameFile: string
}

export default function AddUserModalContent() {
  const { request } = useAxiosRequest()
  const [loginMessage, setLoginMessage] = useState('')
  const [loginUserData, setLoginUserData] = useState<LoginFormData>({
    newUserStatus: 'user',
    newUserName: '',
    newPassword: '',
  })
  const [loginMessageClassName, setloginMessageClassName] = useState(
    `${classes.loginMessage}`
  )
  const setUserName: FormControlProps['onChange'] = (event) => {
    setLoginUserData({ ...loginUserData, newUserName: event.target.value })
  }

  const setUserPassword: FormControlProps['onChange'] = (event) => {
    setLoginUserData({ ...loginUserData, newPassword: event.target.value })
  }

  const loginValidation = async (loginUserData: LoginFormData) => {
    const response = await request('post', '/add_user', loginUserData)
    setloginMessageClassName(
      `${classes.loginMessage} ${classes.loginMessageVissible}`
    )
    if (response.data.message === true) {
      setLoginMessage('you have successfully add a new user')
    } else if (response.data.message === false) {
      setLoginMessage('This user already exists')
    }
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    loginValidation(loginUserData)
  }

  return (
    <Container
      className='align-items-center'
      style={{ height: '438px', width: '420px' }}
    >
      <Form className={classes.formContainer} onSubmit={handleSubmit}>
        <h1 id='loginTitle' className={classes.loginTitle}>
          Add User
        </h1>
        <h5 id='loginMessage' className={loginMessageClassName}>
          {loginMessage}
        </h5>
        <Form.Group>
          <Form.Label className={classes.label}>New Name</Form.Label>
          <Form.Control
            className={classes.input}
            type='text'
            required
            value={loginUserData.newUserName}
            onChange={setUserName}
          />
          <Form.Label className={classes.label}>New Password</Form.Label>
          <Form.Control
            className={classes.input}
            type='password'
            required
            value={loginUserData.newPassword}
            onChange={setUserPassword}
          />
        </Form.Group>
        <button type='submit' className={classes.button}>
          Save changes
        </button>
      </Form>
    </Container>
  )
}
