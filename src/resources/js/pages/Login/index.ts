import { Block, type BlockProps } from "../../utils/Block";
import template from "../../../templatesHbs/login.hbs?raw";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import testField from "../../utils/testField";

export class Login extends Block {
  constructor(props: BlockProps = {}) {
    super(props);

    this.props.fields = [
      new Input({
        label: "Логин",
        name: "login",
        type: "text",
        errorLabel: "Неверный логин",
        events: {
          blur: (e: FocusEvent) => {
            const target = e.target as HTMLInputElement;
            if (!testField(target.value, target.type)) {
              target.closest(".input")?.classList.add("error");
            }
          },
          // Здесь можно добавить логику авторизации
          focus: (e: FocusEvent) => {
            const target = e.target as HTMLInputElement;
            target.closest(".input")?.classList.remove("error");
          },
        },
      }),
      new Input({
        label: "Пароль",
        name: "password",
        type: "password",
        errorLabel: "Неверный пароль",
        events: {
          blur: (e: FocusEvent) => {
            const target = e.target as HTMLInputElement;
            if (!testField(target.value, target.type)) {
              target.closest(".input")?.classList.add("error");
            }
          },
          focus: (e: FocusEvent) => {
            const target = e.target as HTMLInputElement;
            target.closest(".input")?.classList.remove("error");
          },
        },
      }),
    ];

    this.props.buttons = [
      new Button({
        label: "Вход",
        typeButton: "submit",
        additionalClass: "auth",
      }),
    ];

    this.props.events = {
      submit: (e: Event) => {
        e.preventDefault();
        let form = e.target as HTMLFormElement,
          formData = new FormData(form),
          fields = form.querySelectorAll("input"),
          isValid = true;

        for (let field of fields) {
          if (!testField((field as HTMLInputElement).value, (field as HTMLInputElement).type)) {
            (field as HTMLInputElement).closest(".input")?.classList.add("error");
            isValid = false;
            break;
          }
        }

        if (isValid) {

          for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
          }

          // отправка данных на сервер
        }

      },
    };
  }

  componentDidMount(): void {
    // После монтирования заменяем HTML-строки на реальные DOM-элементы с событиями
    const element = this.element;
    if (this.props.fields && element) {
      this.props.fields.forEach((field: Input) => {
        const fieldElement = field.getContent();
        if (fieldElement) {
          // Находим элемент по data-input-name
          const placeholder = element.querySelector(`[data-input-name="${field.props.name}"]`);
          const parent = placeholder?.parentNode;
          if (placeholder && parent) {
            parent.replaceChild(fieldElement, placeholder);
          }
        }
      });
    }
  }

  render(): string {
    // Преобразуем компоненты Input и Button в HTML-строки
    const propsWithRenderedFields = {
      ...this.props,
      fields: this.props.fields?.map((field: Input) => field.render()) || [],
      buttons: this.props.buttons?.map((button: Button) => button.render()) || [],
    };
    return this.compile(template, propsWithRenderedFields);
  }
}
