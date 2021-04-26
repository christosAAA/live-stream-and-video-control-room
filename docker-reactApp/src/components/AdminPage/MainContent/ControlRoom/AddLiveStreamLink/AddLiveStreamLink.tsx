import React, { useState } from 'react'
import { Container, Form } from 'react-bootstrap'
import { useRef } from 'react'
import { Modal, FormControlProps } from 'react-bootstrap'
import { useAxiosRequest } from '../../../../../hooks/useAxiosRequest'
import classes from './AddLiveStreamLink.module.css'

type SaveStreamProps = {
  [x: string]: string
}

export default function AddLiveStreamLink() {
  // const nameRef = useRef<HTMLInputElement>(null);
  // const streamRef = useRef<HTMLInputElement>(null);
  const [show, setShow] = React.useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const { request } = useAxiosRequest()
  const [loginMessage, setLoginMessage] = useState('')
  const saveStreamLink = async (data: SaveStreamProps | undefined) => {
    const response = await request('post', '/add_live_stream_link', data)
    setLoginMessage(response.data)
  }
  const [streamData, setStreamData] = useState<SaveStreamProps>({ ['']: '' })

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
      <Container className={classes.container} onClick={handleShow}>
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
                  // ref={nameRef}
                  onChange={setStreamName}
                  required
                  style={{ height: '48px', marginTop: '1%' }}
                />
                <Form.Label className={classes.label}>
                  Live stream url
                </Form.Label>
                <Form.Control
                  className={classes.input}
                  // ref={streamRef}
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
