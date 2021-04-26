import classes from "./VideoList.module.css";

export const setSelectState = (
  key: number,
  prev: number,
  setPrev: React.Dispatch<React.SetStateAction<number>>
) => {
  let selectStatePrev = document.getElementById(`button${prev}`);
  if (selectStatePrev) {
    selectStatePrev.className = `${classes.listItem}`;
    selectStatePrev.style.color = "#343A40";
    selectStatePrev.style.backgroundColor = "white";
    setPrev(key);
  }
  let selectState = document.getElementById(`button${key}`);
  if (selectState) {
    console.log("change state");
    selectState.className = `${classes.listItem} ${classes.setActive}`;
    setPrev(key);
  }
};

export const setDeleteIcon = (
  key: number,
  test?: string,
  prev?: number,
  setPrev?: React.Dispatch<React.SetStateAction<number>>
) => {
  console.log("set delete icon", key);
  if (test === "chooseVideo") {
    console.log("set delete icon1");
    let deleteIconButtonPrev = document.getElementById(`deleteIcon${prev}`);
    console.log(deleteIconButtonPrev);
    if (deleteIconButtonPrev) {
      deleteIconButtonPrev.style.display = "none";
    }
    if (key === 0) return;
    let deleteIconButton = document.getElementById(`deleteIcon${key}`);
    console.log(deleteIconButton);
    if (deleteIconButton) {
      deleteIconButton.style.display = "inline-block";
      if (setPrev) {
        setPrev(key);
      }
    }
  }
  if (test === "deleteVideoState") {
    let deleteIconButton = document.getElementById(`deleteIcon${key}`);
    if (deleteIconButton) {
      deleteIconButton.style.display = "none";
    }
  }
};

export const setSpinnerIcon = (enable: boolean, key: number) => {
  // if (!key) {
  //   let spinnerIconAll = document.querySelectorAll("[id^=spinner]");
  //   spinnerIconAll.forEach((key) => {
  //     let icon = document.getElementById(`spinner${key}`);
  //     if (icon) icon.style.display = "none";
  //   });
  // } else {
    let spinnerIcon = document.getElementById(`spinner${key}`);
    if (spinnerIcon) {
      if (enable === true) {
        spinnerIcon.style.display = "inline-block";
      } else {
        spinnerIcon.style.display = "none";
      }
    }
  
};
