import Navigo from "navigo";
import Handlebars from "handlebars";
import chat from '../templatesHbs/chat/index.hbs'

let router = new Navigo("/");

router.on({
  "/": () => {},
  "/login": () => {},
  "/registration": () => {},
  "/progile": () => {},
  "/error": () => {},
});
