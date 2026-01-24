import { Block, BlockProps } from '../../utils/Block';
import template from "./templates/index.hbs?raw";
import { UserChatList } from './UserChatList';
import { MessageList } from './MessageList';

export class IndexLayout extends Block {
  constructor(props: BlockProps = {}) {
    super({
      ...props,
      UserChatList: new UserChatList(),
      MessageList: new MessageList(),
    })
  }

  render() {
    return this.compile(template, this.props);
  }
}
