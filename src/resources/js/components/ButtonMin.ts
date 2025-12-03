import { Block, BlockProps } from "../utils/Block";
import template from "../../templatesHbs/buttonMin.hbs?raw";

export class ButtonMin extends Block {
  constructor(props: BlockProps = {}) {
    super(props);
  }

  render(): string {
    return this.compile(template, this.props);
  }
}
