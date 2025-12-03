import { Block, BlockProps } from "../../utils/Block";
import template from "../../../templatesHbs/chat/messageForm.hbs?raw";
import { ButtonMin } from "../ButtonMin";
import renderInnerComponent from "../../utils/renderInnerComponent";

export class MessageForm extends Block {
  constructor(props: BlockProps = {}) {
    props.ButtonMin = new ButtonMin({
      icon: "send",
      type: "submit",
    });
    super(props);   
  }

  render(): string {
    return renderInnerComponent({
      block: this,
      props: this.props,
      template: template
    });
  }

}
