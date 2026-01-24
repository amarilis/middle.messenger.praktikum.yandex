import { renderDOM } from "./utils/renderDOM";
import { IndexLayout } from "./pages/Chat/index";
import { Profile } from "./pages/Profile/index";
import { Login } from "./pages/Login/index";
import { Registration } from "./pages/Registration/index";
import { Errors } from "./pages/Errors/index";

switch (window.location.pathname) {
  case "/": {
    const index = new IndexLayout({});
    renderDOM("#root", index);
    break;
  }

  case "/profile.html":
  case "/profile": {
    const profile = new Profile({});
    renderDOM("#root", profile);
    break;
  }

  case "/login.html":
  case "/login": {
    const login = new Login({});
    renderDOM("#root", login);
    break;
  }

  case "/registration.html":
  case "/registration": {
    const registration = new Registration({});
    renderDOM("#root", registration);
    break;
  }

  default: {
    const errors = new Errors({
      code: 404,
      label: "Не туда попали",
    });
    renderDOM("#root", errors);
    break;
  }
}
