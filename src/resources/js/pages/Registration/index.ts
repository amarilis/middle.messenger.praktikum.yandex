import { Block, BlockProps } from "../../utils/Block";
import template from "../../../templatesHbs/registration.hbs?raw";
import testField from "../../utils/testField";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";


export class Registration extends Block {
  constructor(props: BlockProps = {}) {
    super(props);

    this.props.fields = [
      new Input({
        label: "Почта",
        name: "email",
        type: "text",
        errorLabel: "Неверная почта",
        events: {
          blur: (e: FocusEvent) => {
            const target = e.target as HTMLInputElement;
            if (!testField(target.value, target.type, target.name)) {
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
        label: "Имя",
        name: "first_name",
        type: "text",
        errorLabel: "Поле должно содержать от 2х до 20ти символов",
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
      new Input({
        label: "Фамилия",
        name: "second_name",
        type: "text",
        errorLabel: "Поле должно содержать от 2х до 20ти символов",
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
      new Input({
        label: "Телефон",
        name: "phone",
        type: "tel",
        errorLabel: "Телефон должен содержать 11 цифр",
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
      new Input({
        label: "Пароль",
        name: "password",
        type: "password",
        errorLabel: "Пароль должен содержать от 8 до 40ти символов",
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
      new Input({
        label: "Пароль еще раз",
        name: "password_confirm",
        type: "password",
        errorLabel: "Пароли не совпадают",
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
          if (!testField((field as HTMLInputElement).value, (field as HTMLInputElement).type, (field as HTMLInputElement).name)) {
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
