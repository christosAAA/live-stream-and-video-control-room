import React, { useState } from 'react'
import { useAxiosRequest } from '../../../../../hooks/useAxiosRequest'
import classes from './UploadVideo.module.css'
import {
  StateProps,
  initialState,
  chooseState,
  loadingState,
  successState,
  errorState,
} from './utils'

export default function UploadVideo() {
  const [selectedFiles, setSelectedFiles] = useState<FileList>()
  const [uploadMessage, setUploadMessage] = useState('Choose a video to upload')
  const [uploadHiddenButton, setUploadHiddenButton] = useState(true)
  const [inputDisable, setInputDisable] = useState(false)
  const [uploadIconHidden, setUploadIconHidden] = useState(false)
  const [checkIconHidden, setCheckIconHidden] = useState(true)
  const [loadingIconHidden, setLoadingIconHidden] = useState(true)
  const [uploadIconBlueHidden, setUploadIconBlueHidden] = useState(true)
  const [crossIconHidden, setCrossIconHidden] = useState(true)
  const { request } = useAxiosRequest()

  const uploadButtonState = (props: StateProps) => {
    const uploadContainer = document.getElementById('label')
    const uploadMessage = document.getElementById('uploadMessage')
    if (uploadContainer && uploadMessage) {
      uploadContainer.style.border = props.uploadBorder
      uploadMessage.style.color = props.color
      setUploadIconHidden(props.uploadIconHidden)
      setUploadIconBlueHidden(props.uploadIconBlueHidden)
      setUploadMessage(props.uploadMessage)
      setInputDisable(props.inputHidden)
      setUploadHiddenButton(props.uploadButtonHidden)
      setLoadingIconHidden(props.loadingIconHidden)
      setCheckIconHidden(props.checkIconHidden)
      setCrossIconHidden(props.crossIconHidden)
    }
  }
  const onChange = (files: FileList | null) => {
    if (files) {
      if (files[0] === undefined || files[0] === null) return
      if (files[0].name === undefined || files[0].name === null) {
        return
      } else {
        const message = files[0].name
        uploadButtonState({ ...chooseState, uploadMessage: message })
        setSelectedFiles(files)
      }
    }
  }
  const submitHandler = async (
    event: React.MouseEvent,
    selectedFiles: FileList | undefined
  ) => {
    event.preventDefault()

    if (!selectedFiles || selectedFiles === undefined) return

    uploadButtonState(loadingState)

    let formData = new FormData()
    formData.append('video', selectedFiles[0])
    let response = await request('post', '/upload_video_file', formData)
    // response.data = "error"
    if (response.data === 'File Uploaded') {
      uploadButtonState(successState)
      setTimeout(() => {
        uploadButtonState(initialState)
      }, 2000)
    }
    if (response.data === 'error') {
      uploadButtonState(errorState)
      setTimeout(() => {
        uploadButtonState(initialState)
      }, 2000)
    }
  }

  return (
    <>
      <div>
        <label
          id='label'
          className={classes.uploadContainer}
          htmlFor='upload-button'
        >
          <div>
            <i hidden={uploadIconHidden} className={classes.uploadIcon} />
            <i
              hidden={uploadIconBlueHidden}
              className={classes.uploadIconBlue}
            />
            <i hidden={crossIconHidden} className={classes.crossIcon} />
            <i hidden={loadingIconHidden} className={classes.loading} />
            <i hidden={checkIconHidden} className={classes.success} />
            <span id='uploadMessage' className={classes.uploadTitle}>
              {uploadMessage}
            </span>
            <input
              disabled={inputDisable}
              name='video'
              type='file'
              id='upload-button'
              style={{ display: 'none' }}
              onChange={(event) => {
                onChange(event.target.files)
              }}
            />
          </div>
          <button
            className={classes.uploadButton}
            hidden={uploadHiddenButton}
            onClick={(event) => submitHandler(event, selectedFiles)}
          >
            Upload
          </button>
        </label>
      </div>
    </>
  )
}
