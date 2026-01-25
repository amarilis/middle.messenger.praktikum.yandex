import { Block, BlockProps } from '../../utils/Block';
import template from "./templates/messageList.hbs?raw";
import { MessageForm } from './MessageForm';

export class MessageList extends Block {
  constructor(props: BlockProps = {}) {
    super({
      ...props,
      MessageForm: new MessageForm()
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
