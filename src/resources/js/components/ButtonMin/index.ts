import { Block, BlockProps } from "../../utils/Block";
import template from "./template.hbs?raw";

export class ButtonMin extends Block {
  constructor(props: BlockProps = {}) {
    super(props);    
  }

  render() {
    return this.compile(template, this.props);
  }
}
