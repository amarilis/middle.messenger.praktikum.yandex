import { Block, BlockProps } from '../../utils/Block';
import template from "../../../templatesHbs/chat/messageList.hbs?raw";
import renderInnerComponent from '../../utils/renderInnerComponent';
import { MessageForm } from './MessageForm';

export class MessageList extends Block {
  constructor(props: BlockProps = {}) {
    super(props);
    this.props.MessageForm = new MessageForm();
  }

  render(): string {
    return renderInnerComponent({
      block: this,
      props: this.props,
      template: template
    });
  }
}
