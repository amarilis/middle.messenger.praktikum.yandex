import { Block, BlockProps } from '../../utils/Block';
import template from "../../../templatesHbs/chat/userChatList.hbs?raw";
import renderInnerComponent from '../../utils/renderInnerComponent';
import "../../actions/loadListChats";

export class UserChatList extends Block {
  constructor(props: BlockProps = {}) {
    super(props);
    this.props.events = {
      load: (): void => {
        console.log('load');
      },
    };
  }

  render(): string {
    return renderInnerComponent({
      block: this,
      props: this.props,
      template: template
    });
  }
}
