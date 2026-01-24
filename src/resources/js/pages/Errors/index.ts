import { Block, BlockProps } from "../../utils/Block";
import template from "./template.hbs?raw";

interface ErrorsProps extends BlockProps {
  code?: number;
  label?: string;
}

export class Errors extends Block {
  constructor(props: ErrorsProps = {}) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
