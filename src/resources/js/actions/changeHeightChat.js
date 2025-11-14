/**
 * Добавляем/убираем полосу прокрутки при досежении размера
 */
const chatTextarea = document.querySelector(
  ".chat__message-form_textarea-inner"
);

chatTextarea && chatTextarea.addEventListener("keyup", (e) => {
  if (e.target.offsetHeight === 48) {
    e.target.classList.add("scroll");
  } else {
    e.target.classList.remove("scroll");
  }
});
