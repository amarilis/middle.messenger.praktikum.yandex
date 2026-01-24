/**
 * тестирование полей на правильность заполнения
 */

const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)[^\s].{6,38}[^\s]$/;
const EMAIL_REGEX =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

const getInputValue = (selector: string): string => {
  const input = document.querySelector<HTMLInputElement>(selector);
  return input?.value ?? "";
};

const isPasswordValid = (value: string): boolean => PASSWORD_REGEX.test(value);

const testField = (fieldValue: string, type: string, name?: string): boolean => {
  if (type === "password") {
    const isValid = isPasswordValid(fieldValue);
    if (name === "password-again") {
      return isValid && fieldValue === getInputValue('[name="password"]');
    }
    return isValid;
  }
  if (type === "login") {
    return /^[a-zA-Z0-9_-]+$/.test(fieldValue);
  }
  if (type === "name") {
    return /^[a-zA-Zа-яА-Я]+$/.test(fieldValue);
  }
  if (type === "tel") {
    return /^[0-9]+$/.test(fieldValue);
  }
  if (type === "message") {
    return fieldValue.length > 2;
  }
  if (type === "text") {
    if (name === "email") {
      return EMAIL_REGEX.test(fieldValue);
    }
    return fieldValue.length > 2;
  }
  return fieldValue.length > 0;
};

export default testField;
