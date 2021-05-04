import React, { useState } from 'react'
import { Container, Form } from 'react-bootstrap'
import { Modal, FormControlProps } from 'react-bootstrap'
import { useAxiosRequest } from '../../../../../hooks/useAxiosRequest'
import classes from './AddLiveStreamLink.module.css'

type SaveStreamProps = {
  [x: string]: string
}

export default function AddLiveStreamLink() {
  const [show, setShow] = React.useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const { request } = useAxiosRequest()
  const [loginMessage, setLoginMessage] = useState('')
  const [streamData, setStreamData] = useState<SaveStreamProps>({ ['']: '' })

  const saveStreamLink = async (data: SaveStreamProps | undefined) => {
    if (!Object.values(data)[0].endsWith('.m3u8')) return
    const response = await request('post', '/add_live_stream_link', data)
    setLoginMessage(response.data)
  }

  const setStreamName: FormControlProps['onChange'] = (event) => {
    if (!streamData || streamData === undefined) return
    setStreamData({ [event.target.value]: Object.values(streamData)[0] })
  }
  const setStreamUrl: FormControlProps['onChange'] = (event) => {
    if (!streamData || streamData === undefined) return
    setStreamData({ [Object.keys(streamData)[0]]: event.target.value })
  }

  function handleSubmitStreamData(
    event: React.FormEvent,
    streamData: SaveStreamProps
  ) {
    event.preventDefault()
    saveStreamLink(streamData)
  }
  return (
    <>
      <Container
        className={classes.container}
        onClick={() => {
          handleShow()
          setLoginMessage('')
        }}
      >
        <i className={classes.linkIcon} />
        <h1 className={classes.addLiveStream}>Add a live stream link</h1>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          closeButton
          style={{ borderBottom: 'white' }}
        ></Modal.Header>
        <Modal.Body>
          <Container
            className='align-items-center'
            style={{ height: '438px', width: '420px' }}
          >
            <Form
              className={classes.formContainer}
              onSubmit={(event) => handleSubmitStreamData(event, streamData)}
            >
              <h1 className={classes.loginTitle}>{'Add Link '}</h1>
              <h5 id='loginMessage' className={classes.loginMessage}>
                {loginMessage}
              </h5>
              <Form.Group>
                <Form.Label className={classes.label}>Link name</Form.Label>
                <Form.Control
                  className={classes.input}
                  type='text'
                  placeholder='Name'
                  onChange={setStreamName}
                  required
                  style={{ height: '48px', marginTop: '1%' }}
                />
                <Form.Label className={classes.label}>
                  Live stream url
                </Form.Label>
                <Form.Control
                  className={classes.input}
                  onChange={setStreamUrl}
                  type='text'
                  placeholder='https://server_link/example.m3u8'
                  style={{ height: '48px', marginTop: '1%' }}
                />
              </Form.Group>
              <button type='submit' className={classes.button}>
                Add Link
              </button>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  )
}
