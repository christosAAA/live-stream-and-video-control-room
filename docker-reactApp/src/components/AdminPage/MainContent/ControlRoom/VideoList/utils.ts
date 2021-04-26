import classes from './VideoList.module.css'

export const setSelectState = (
  key: number,
  prev: number,
  setPrev: React.Dispatch<React.SetStateAction<number>>
) => {
  let selectStatePrev = document.getElementById(`button${prev}`)
  if (selectStatePrev) {
    selectStatePrev.className = `${classes.listItem}`
    selectStatePrev.style.color = '#343A40'
    selectStatePrev.style.backgroundColor = 'white'
    setPrev(key)
  }
  let selectState = document.getElementById(`button${key}`)
  if (selectState) {
    selectState.className = `${classes.listItem} ${classes.setActive}`
    setPrev(key)
  }
}

export const setDeleteIcon = (
  key: number,
  test?: string,
  prev?: number,
  setPrev?: React.Dispatch<React.SetStateAction<number>>
) => {
  if (test === 'chooseVideo') {
    let deleteIconButtonPrev = document.getElementById(`deleteIcon${prev}`)
    if (deleteIconButtonPrev) {
      deleteIconButtonPrev.style.display = 'none'
    }
    if (key === 0) return
    let deleteIconButton = document.getElementById(`deleteIcon${key}`)
    if (deleteIconButton) {
      deleteIconButton.style.display = 'inline-block'
      if (setPrev) {
        setPrev(key)
      }
    }
  }
  if (test === 'deleteVideoState') {
    let deleteIconButton = document.getElementById(`deleteIcon${key}`)
    if (deleteIconButton) {
      deleteIconButton.style.display = 'none'
    }
  }
}

export const setSpinnerIcon = (enable: boolean, key: number) => {
  let spinnerIcon = document.getElementById(`spinner${key}`)
  if (spinnerIcon) {
    if (enable === true) {
      spinnerIcon.style.display = 'inline-block'
    } else {
      spinnerIcon.style.display = 'none'
    }
  }
}
