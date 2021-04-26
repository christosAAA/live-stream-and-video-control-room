export type StateProps = {
  color: string
  uploadMessage: string
  uploadBorder: string
  uploadIconHidden: boolean
  uploadIconBlueHidden: boolean
  inputHidden: boolean
  uploadButtonHidden: boolean
  loadButtonHidden: boolean
  loadingIconHidden: boolean
  checkIconHidden: boolean
  crossIconHidden: boolean
}

export const initialState = {
  color: '#6C757D',
  uploadMessage: 'Choose a video to upload',
  uploadBorder: '1px dashed #adb5bd',
  uploadIconHidden: false,
  uploadIconBlueHidden: true,
  inputHidden: false,
  uploadButtonHidden: true,
  loadButtonHidden: true,
  loadingIconHidden: true,
  checkIconHidden: true,
  crossIconHidden: true,
}
export const chooseState = {
  color: '#343A40',
  uploadMessage: '',
  uploadBorder: '1px solid #343a40',
  uploadIconHidden: true,
  uploadIconBlueHidden: false,
  inputHidden: false,
  uploadButtonHidden: false,
  loadButtonHidden: true,
  loadingIconHidden: true,
  checkIconHidden: true,
  crossIconHidden: true,
}
export const loadingState = {
  color: '#343A40',
  uploadMessage: 'Uploading...',
  uploadBorder: '1px dashed #adb5bd',
  uploadIconHidden: true,
  uploadIconBlueHidden: true,
  inputHidden: false,
  uploadButtonHidden: true,
  loadButtonHidden: true,
  loadingIconHidden: false,
  checkIconHidden: true,
  crossIconHidden: true,
}
export const successState = {
  color: '#28A745',
  uploadMessage: 'Video uploaded successfully!',
  uploadBorder: '1px dashed #adb5bd',
  uploadIconHidden: true,
  uploadIconBlueHidden: true,
  inputHidden: false,
  uploadButtonHidden: true,
  loadButtonHidden: true,
  loadingIconHidden: true,
  checkIconHidden: false,
  crossIconHidden: true,
}
export const errorState = {
  color: 'red',
  uploadMessage: 'Something went wrong',
  uploadBorder: '1px dashed #adb5bd',
  uploadIconHidden: true,
  uploadIconBlueHidden: true,
  inputHidden: false,
  uploadButtonHidden: true,
  loadButtonHidden: true,
  loadingIconHidden: true,
  checkIconHidden: true,
  crossIconHidden: false,
}
