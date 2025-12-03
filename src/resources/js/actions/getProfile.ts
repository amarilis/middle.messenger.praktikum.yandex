import getData from "./getData";
import endpoints from "../endpoints";

interface User {
  avatar?: string;
  display_name?: string;
  email?: string;
  login?: string;
  first_name?: string;
  second_name?: string;
  phone?: string;
}

(() => {
  if (window.location.pathname === "/profile.html" || window.location.pathname === "/profile") {
    const render = (user: User): void => {
      const logo: HTMLElement | null = document.querySelector(".profile__content-logo");
      if (logo && user.avatar) {
        logo.style.backgroundImage = `url(${endpoints.resources}${user.avatar})`;
        logo.innerHTML = '';
      }

      const userName: HTMLElement | null = document.querySelector(".profile__content-user_name");
      if (userName && user.display_name) {
        userName.textContent = user.display_name;
      }

      const email: HTMLElement | null = document.querySelector(".profile__content-list .profile__email");
      if (email && user.email) {
        email.textContent = user.email;
      }

      const login: HTMLElement | null = document.querySelector(".profile__content-list .profile__login");
      if (login && user.login) {
        login.textContent = user.login;
      }

      const name: HTMLElement | null = document.querySelector(".profile__content-list .profile__name");
      if (name && user.first_name) {
        name.textContent = user.first_name;
      }

      const lastname: HTMLElement | null = document.querySelector(".profile__content-list .profile__lastname");
      if (lastname && user.second_name) {
        lastname.textContent = user.second_name;
      }

      const displayname: HTMLElement | null = document.querySelector(".profile__content-list .profile__displayname");
      if (displayname && user.display_name) {
        displayname.textContent = user.display_name;
      }

      const phone: HTMLElement | null = document.querySelector(".profile__content-list .profile__phone");
      if (phone && user.phone) {
        phone.textContent = user.phone;
      }
    };

    getData({
      url: "auth/user",
      method: "GET",
      render: render,
    });
  }
})();
