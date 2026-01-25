import getData from "./getData";

const logout: HTMLElement | null = document.querySelector(".logout");

if (logout) {
  logout.addEventListener("click", (): void => {
    getData({
      url: "logout",
      method: "GET",
      render: (): void => {
        window.location.href = "/login.html";
      },
    });
  });
}
