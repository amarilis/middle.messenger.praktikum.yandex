import getData from "./getData";

document.querySelectorAll(".buttonSubmit").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const form = e.target.closest("form");
    form.addEventListener("submit", (e) => e.preventDefault());

    if (btn.classList.contains("auth")) {
      // авторизация
      let body = {
        login: form.login.value,
        password: form.password.value,
      };

      let render = (responce) => {
        if (responce === "OK" || responce.reason === 'User already in system') {
          window.location.href = "/";
        }
      };

      getData({
        url: "auth/signin",
        method: "POST",
        body: body,
        render: render,
      });

    }

    if (btn.classList.contains("registr")) {
      // регистрация
    }
  });
});
