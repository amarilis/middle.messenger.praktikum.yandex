import testField from "./testField";

// Проверяет форму и подсвечивает поля с ошибками
export const checkForm = (formName: string): boolean => {
  const form = document.forms.namedItem(formName) as HTMLFormElement | null;

  // Если форма не найдена — считаем, что проверка не пройдена
  if (!form) {
    return false;
  }

  let isValid = true;

  // Валидируем все поля ввода
  form.querySelectorAll<HTMLInputElement>("input").forEach((input: HTMLInputElement) => {
    const fieldValid = testField(input.value, input.type, input.name);
    if (!fieldValid) {
      input.closest(".input")?.classList.add("error");
      isValid = false;
      return;
    }

    input.closest(".input")?.classList.remove("error");
  });

  return isValid;
};
