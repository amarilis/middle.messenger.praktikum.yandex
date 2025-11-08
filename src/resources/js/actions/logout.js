import getData from "./getData";

let logout = document.querySelector(".logout");

logout &&
  logout.addEventListener("click", () => {
    getData({
      url: "logout",
      method: "GET",
    });

    window.location.href = "/login.html";
  });
