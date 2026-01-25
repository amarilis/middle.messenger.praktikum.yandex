import { Block, BlockProps } from "../../utils/Block";
import template from "./template.hbs?raw";
//import { EyeIcon } from "./EyeIcon"

/**
 * класс с иконкой глаза для показа
 */
class EyeIcon extends Block {
  constructor(props: BlockProps = {}) {
    super(props);    
  }

  render() {
    return this.compile(`<i class="icon eye"></i>`, this.props);
  }
}



export class InputWrapper extends Block {
  constructor(props: BlockProps = {}) {
    super({
      ...props,
      eye:
        props.eye &&
        new EyeIcon({
          events: {
            click: (e: MouseEvent) => {
              const target = e.target as HTMLElement;
              const inputWrapper = target.closest('.input') as HTMLElement | null;
              if (!inputWrapper) return;
              
              const inp = inputWrapper.querySelector('.input__field') as HTMLInputElement | null;
              if (!inp) return;
              
              if (inp.type === 'password') {
                inp.type = 'text';
              } else {
                inp.type = 'password';
              }
              target.classList.toggle('active');
            },
          },
        }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
