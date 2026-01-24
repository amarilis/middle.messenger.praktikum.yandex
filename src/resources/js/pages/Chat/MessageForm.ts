import { Block, BlockProps } from "../../utils/Block";
import template from "./templates/messageForm.hbs?raw";
import { ButtonMin } from "../../components/ButtonMin";

export class MessageForm extends Block {
  constructor(props: BlockProps = {}) {
    super({
      ...props,
      ButtonMin: new ButtonMin({
        icon: "send",
        type: "submit",
      }),
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          const target = e.target as HTMLElement;
          const form = target.closest('form') as HTMLFormElement;
          if (form) {
            const msg = form.querySelector('.chat__message-form_textarea-inner') as HTMLElement;
            if (msg && msg.innerText.length > 2) {
              const msgName = msg.dataset.name;
              const msgValue = msg.innerText;
              console.log(`form submit, fielfName = "${msgName}", value = "${msgValue}"`);
            }
          }
        }
      }
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
