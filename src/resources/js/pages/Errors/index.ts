import { Block, BlockProps } from "../../utils/Block";
import template from "../../../templatesHbs/errors.hbs?raw";

interface ErrorsProps extends BlockProps {
  code?: number;
  label?: string;
}

export class Errors extends Block {
  constructor(props: ErrorsProps = {}) {
    super(props);
  }

  render(): string {
    return this.compile(template, this.props);
  }
}
