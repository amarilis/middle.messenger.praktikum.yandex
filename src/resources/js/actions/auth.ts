import getData from "./getData";

interface AuthForm extends HTMLFormElement {
  login: HTMLInputElement;
  password: HTMLInputElement;
}

document.querySelectorAll<HTMLElement>(".buttonSubmit").forEach((btn: HTMLElement) => {
  btn.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const form = target.closest("form") as AuthForm | null;
    
    if (!form) {
      return;
    }

    form.addEventListener("submit", (e: SubmitEvent) => e.preventDefault());

    if (btn.classList.contains("auth")) {
      // авторизация
      const body: { login: string; password: string } = {
        login: form.login.value,
        password: form.password.value,
      };

      const render = (response: any): void => {
        if (response === "OK" || response.reason === 'User already in system') {
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
