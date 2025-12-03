import * as Handlebars from "handlebars";
import getData from "./getData";
import endpoints from "../endpoints";

interface Chat {
  id: number;
  title: string;
  avatar?: string;
  last_message?: string;
  unread_count?: number;
}

const render = (arr: Chat[]): void => {
  let str: string = "";

  arr.forEach((chat: Chat) => {
    str += `<li class="chat__list-user_chat-li">
        <div class="chat__list-user_chat-link" data-id="${chat.id}">
          <div
            class="chat__list-user_chat-link_logo"
            style="background-image: url('${endpoints.resources}${chat.avatar || ''}')"
          ></div>
          <div class="chat__list-user_chat-link_name">${chat.title}</div>
          <div class="chat__list-user_chat-link_last-message">${chat.last_message || ''}</div>
          <div class="chat__list-user_chat-link_last-message-time">10:10</div>
          ${chat.unread_count ? `<div class="chat__list-user_chat-link_unread-messages">${chat.unread_count}</div>` : ''}
        </div>
      </li>`;
  });

  const chatList: HTMLElement | null = document.querySelector(".chat__list-user_chat");
  if (chatList) {
    chatList.innerHTML = new Handlebars.SafeString(str).toString();
  }
};

getData({
  url: "chats",
  method: "GET",
  render: render,
});
