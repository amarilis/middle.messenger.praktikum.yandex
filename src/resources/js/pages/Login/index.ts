import { Block, type BlockProps } from "../../utils/Block";
import template from "./template.hbs?raw";
import { InputWrapper } from "../../components/InputWrapper";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { ButtonLink } from "../../components/ButtonLink";
import { checkForm } from "../../utils/checkForm";
import testField from "../../utils/testField";




export class Login extends Block {
  constructor(props: BlockProps = {}) {
    super({
      ...props,
      fields: [
        new InputWrapper({
          label: 'Логин',
          errorLabel: "Поле должно содержать от 2х до 20ти символов",
          name: 'login',
          input: new Input({
            name: 'login',
            type: 'text',
            events: {
              blur: (e: FocusEvent) => {
                const target = e.target as HTMLInputElement;
                if (!testField(target.value, target.type)) {
                  target.closest(".input")?.classList.add("error");
                }
              },
              keyup: (e: KeyboardEvent) => {
                const target = e.target as HTMLInputElement;
                target.closest(".input")?.classList.remove("error");
              },
            },
          })
        }),
        new InputWrapper({
          label: 'Пароль',
          eye: true,
          errorLabel: "Пароль от 8 до 40 символов, хотя бы одна заглавная буква и цифра",
          name: 'password',
          input: new Input({
            name: 'password',
            type: 'password',
            events: {
              blur: (e: FocusEvent) => {
                const target = e.target as HTMLInputElement;
                if (!testField(target.value, target.type)) {
                  target.closest(".input")?.classList.add("error");
                }
              },
              keyup: (e: KeyboardEvent) => {
                const target = e.target as HTMLInputElement;
                target.closest(".input")?.classList.remove("error");
              },
            },
          })
        }),
      ],
      buttonSubmit: new Button({
        label: 'Войти',
        events: {
          click: (e: MouseEvent) => {
            e.preventDefault();
            if (checkForm('login')) {
              console.log(`Отправлена форма входа`);
              const form = document.forms.namedItem("login") as HTMLFormElement | null;
              if (form) {
                const formData = new FormData(form);
                const formDataObj: Record<string, string> = {};
                formData.forEach((value: FormDataEntryValue, key: string) => {
                  formDataObj[key] = String(value);
                });
                console.table(formDataObj);
              }
            }
          }
        }
      }),
      buttonLink: new ButtonLink({
        label: 'Нет аккаунта?',
        url: '/registration.html',
      })
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
