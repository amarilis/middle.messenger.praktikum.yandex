import { Block, BlockProps } from "../utils/Block";
import template from "../../templatesHbs/input.hbs?raw";
import renderInnerComponent from "../utils/renderInnerComponent";
import showHidePassword from "../actions/showHidePassword";

  class EyeIcon extends Block {
    constructor(props: BlockProps = {}) {
      super(props);
    }
    render() {
      return this.props.type === 'password' ? `<i class="icon eye"></i>` : '';
    }
  }

  class ErrorLine extends Block {
    constructor(props: BlockProps = {}) {
      super(props);
    }
    render() {
      return `<div class="input__error">${this.props.errorLabel}</div>`;
    }
  }

export class Input extends Block {
  constructor(props: BlockProps = {}) {
    super(props);
    this.props.eye = new EyeIcon({
      type: this.props.type,
    });
    this.props.errorLine = new ErrorLine({errorLabel: this.props.errorLabel});
  }

  componentDidMount(): void {
    // Привязываем события к input элементу, а не к корневому div
    const { events = {} } = this.props;
    if (this.element && events) {
      const inputElement = this.element.querySelector('input');
      if (inputElement) {
        Object.keys(events).forEach((eventName: string) => {
          inputElement.addEventListener(eventName, events[eventName]);
        });
      }
    }

    // Привязываем событие клика к иконке глаза
    if (this.props.type === 'password') {
      const eyeIcon = this.element?.querySelector('.icon.eye');
      if (eyeIcon) {
        eyeIcon.addEventListener('click', (e: Event) => {
          showHidePassword(e.target as HTMLElement);
        });
      }
    }
  }

  render(): string {
    return renderInnerComponent({
      block: this,
      props: this.props,
      template: template
    });
  }
}
