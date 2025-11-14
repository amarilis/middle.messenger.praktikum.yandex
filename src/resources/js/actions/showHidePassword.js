/**
 * клик по глазу для отображения пароля
 */
document.querySelectorAll(".eye").forEach((eye) => {
  eye.addEventListener("click", (e) => {
    if (e.target.classList.contains("active")) {
      e.target.closest(".input").querySelector(".input__field").type =
        "password";
      e.target.classList.remove("active");
    } else {
      e.target.closest(".input").querySelector(".input__field").type =
        "text";
      e.target.classList.add("active");
    }
  });
});
