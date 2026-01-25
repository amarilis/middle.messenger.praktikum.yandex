/**
 * Преобразует объект в строку запроса
 * @param data - объект с данными для преобразования
 * @returns строка запроса (начинается с "?" или пустая строка, если объект пустой)
 */
const queryStringify = (data: Record<string, any>): string => {
  if (!data || Object.keys(data).length === 0) {
    return "";
  }

  let paramStr: string = "?";

  for (const key in data) {
    if (!Object.prototype.hasOwnProperty.call(data, key)) {
      continue;
    }

    const paramValue: any = data[key];
    let serializedValue: string;

    if (Array.isArray(paramValue)) {
      serializedValue = paramValue.join(",");
    } else if (typeof paramValue === "object" && paramValue !== null) {
      serializedValue = "[object Object]";
    } else {
      serializedValue = String(paramValue);
    }

    paramStr += `${encodeURIComponent(key)}=${encodeURIComponent(
      serializedValue
    )}&`;
  }

  return paramStr.slice(0, -1);
};

export default queryStringify;
