/**
 * тестирование полей на правильность заполнения
 */

const testField = (fieldValue: string, type: string, name?: string): boolean => {
  if (type === "password") {
    return fieldValue.length >= 8;
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
      return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(fieldValue);
    }
    return fieldValue.length > 2;
  }
  return fieldValue.length > 0;
};

export default testField;
