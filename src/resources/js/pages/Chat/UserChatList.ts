import { Block, BlockProps } from "../../utils/Block";
import template from "./templates/userChatList.hbs?raw";

export class UserChatList extends Block {
  constructor(props: BlockProps = {}) {
    super({
      ...props,
      events: {
        load: () => {
          console.log("Загрузился список чатов");
        }
      }
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
