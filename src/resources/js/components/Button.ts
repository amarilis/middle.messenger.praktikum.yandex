import { Block, BlockProps } from "../utils/Block";
import template from "../../templatesHbs/button.hbs?raw";

export class Button extends Block {
  constructor(props: BlockProps = {}) {
    super(props);
  }

  render(): string {
    return this.compile(template, this.props);
  }
}
