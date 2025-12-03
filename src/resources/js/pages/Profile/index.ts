import { Block, BlockProps } from '../../utils/Block';
import template from "../../../templatesHbs/profile.hbs?raw";
import "../../actions/getProfile";
import { ButtonMin } from '../../components/ButtonMin';

export class Profile extends Block {
  constructor(props: BlockProps = {}) {
    super(props);
    this.props.ButtonMin = new ButtonMin({
      icon: "back",
    });
  }

  render(): string {
    // Преобразуем ButtonMin в HTML-строку и добавляем в props
    const propsWithRenderedFields = {
      ...this.props,
      ButtonMin: this.props.ButtonMin?.render() || "",
    };
    return this.compile(template, propsWithRenderedFields);
  }
}
