import { Block, BlockProps } from "../../utils/Block";
import template from "./template.hbs?raw";
import { InputWrapper } from "../../components/InputWrapper";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { ButtonLink } from "../../components/ButtonLink";
import { checkForm } from "../../utils/checkForm";
import testField from "../../utils/testField";


export class Registration extends Block {
  constructor(props: BlockProps = {}) {
    super({
      ...props,
      fields: [
        new InputWrapper({
          label: 'Почта',
          name: 'email',
            errorLabel: "Неверная почта",
          input: new Input({
            name: 'email',
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
          label: 'Логин',
          name: 'login',
            errorLabel: "Поле должно содержать от 2х до 20ти символов",
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
          label: 'Имя',
          name: 'first_name',
            errorLabel: "Поле должно содержать от 2х до 20ти символов",
          input: new Input({
            name: 'first_name',
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
          label: 'Фамилия',
          name: 'second_name',
            errorLabel: "Поле должно содержать от 2х до 20ти символов",
          input: new Input({
            name: 'second_name',
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
          label: 'Телефон',
          name: 'phone',
            errorLabel: "Телефон должен содержать 11 цифр",
          input: new Input({
            name: 'phone',
            type: 'tel',
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
          name: 'password',
          errorLabel: "Пароль от 8 до 40 символов, хотя бы одна заглавная буква и цифра",
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
        new InputWrapper({
          label: 'Пароль (еще раз)',
          eye: true,
          name: 'password2',
          errorLabel: "Пароли не совпадают",
          input: new Input({
            name: 'password-again',
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
              console.log(`Отправлена форма регистрации`);
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
        label: 'Войти',
        url: '/login.html',
      })
    });
  }


  render() {
    return this.compile(template, this.props);
  }
}
