import "./tabs.css";

const buttons = document.getElementsByClassName("NavButtons");

export const onClickTabButton = (e:any) => {
  if (buttons) {
    Array.from(buttons).forEach((item, key) => {
      if (item.id === e.target.id) {
        item.classList.add("current"); //button
        const content = document.getElementById(`Content_${item.id}`);
        if (!content) return;
        content.style.display = "block";
      } else {
        item.classList.remove("current"); //button
        const content = document.getElementById(`Content_${item.id}`);
        if (!content) return;
        content.style.display = "none";
      }
    });
  }
};
