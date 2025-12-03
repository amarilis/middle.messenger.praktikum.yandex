import { Block, BlockProps } from '../../utils/Block';
import template from "../../../templatesHbs/chat/index.hbs?raw";
import renderInnerComponent from '../../utils/renderInnerComponent';
import { UserChatList } from '../../components/chat/UserChatList';
import { MessageList } from '../../components/chat/MessageList';

export class IndexLayout extends Block {
  constructor(props: BlockProps = {}) {
    props.UserChatList = new UserChatList();
    props.MessageList = new MessageList();
    super(props);
  }

  componentDidMount(): void {
    // добавляем обработчик на форму сообщений
    let form = this.element?.querySelector('.chat__message-form') as HTMLFormElement;
    form?.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      const messageDiv = form.querySelector<HTMLElement>('[data-name="message"]');
      const message = messageDiv?.innerHTML?.trim() || ""; //innerHTML, чтобы можно было отправлять картинки и т.д.

      if (!!message) {
        // отправка сообщения на сервер
        console.log("send message:", message);
      }

      // очистка поля сообщения
      if (messageDiv) {
        messageDiv.innerText = "";
      }
    });
  }

  render(): string {
    return renderInnerComponent({
      block: this,
      props: this.props,
      template: template
    });
  }
}
