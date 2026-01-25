/**
 * Клик по глазу для отображения пароля
 */
const showHidePassword = (target: HTMLElement | null) => {
  const input = target?.closest(".input") as HTMLElement | null;
  const inputField = input?.querySelector(".input__field") as HTMLInputElement | null;

  if (!target || !input || !inputField) {
    return;
  }

  if (target.classList.contains("active")) {
    inputField.type = "password";
    target.classList.remove("active");
  } else {
    inputField.type = "text";
    target.classList.add("active");
  }
};

export default showHidePassword;
