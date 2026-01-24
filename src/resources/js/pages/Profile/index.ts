import { Block, BlockProps } from '../../utils/Block';
import template from "./template.hbs?raw";
import "../../actions/getProfile";
import { ButtonMin } from '../../components/ButtonMin';

export class Profile extends Block {
  constructor(props: BlockProps = {}) {
    super({
      ...props,
      ButtonMin: new ButtonMin({
        icon: "back",
      })
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
