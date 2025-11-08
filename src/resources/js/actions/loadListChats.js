import Handlebars from "handlebars";
import getData from "./getData";
import endpoints from "../endpoints";

(() => {
  if (window.location.pathname === "/") {
    let render = (arr) => {
      let str = "";

      arr.forEach((chat) => {
        str += `<li class="chat__list-user_chat-li">
        <div class="chat__list-user_chat-link" data-id="${chat.id}">
          <div
            class="chat__list-user_chat-link_logo"
            style="background-image: url('${endpoints.resources}${chat.avatar}')"
          ></div>
          <div class="chat__list-user_chat-link_name">${chat.title}</div>
          <div class="chat__list-user_chat-link_last-message">${chat.last_message ? chat.last_message : ''}</div>
          <div class="chat__list-user_chat-link_last-message-time">10:10</div>
          ${chat.unread_count ? `<div class="chat__list-user_chat-link_unread-messages">${chat.unread_count}</div>` : ''}
        </div>
      </li>`;
      });

      document.querySelector(".chat__list-user_chat").innerHTML = new Handlebars.SafeString(str);
    };

    getData({
      url: "chats",
      method: "GET",
      render: render,
    });
  }
})();
