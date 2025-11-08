import Handlebars from "handlebars";
import getData from "./getData";
import endpoints from "../endpoints";

(() => {
  if (window.location.pathname === "/profile.html") {
    let render = (user) => {
      if (!!user.avatar) {
        document.querySelector(".profile__content-logo").style.backgroundImage = `url(${endpoints.resources}${user.avatar})`;
        document.querySelector(".profile__content-logo").innerHTML = '';
      }
      document.querySelector(".profile__content-user_name").textContent = user.display_name;
      document.querySelector(".profile__content-list .profile__email").textContent = user.email;
      document.querySelector(".profile__content-list .profile__login").textContent = user.login;
      document.querySelector(".profile__content-list .profile__name").textContent = user.first_name;
      document.querySelector(".profile__content-list .profile__lastname").textContent = user.second_name;
      document.querySelector(".profile__content-list .profile__displayname").textContent = user.display_name;
      document.querySelector(".profile__content-list .profile__phone").textContent = user.phone;
    };
    let profile = getData({
      url: "auth/user",
      method: "GET",
      render: render,
    });
  }
})();
