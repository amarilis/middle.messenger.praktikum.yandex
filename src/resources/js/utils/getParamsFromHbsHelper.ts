/**
 * Хелпер нужен для трансформации строки параметров в объект параметров
 * @param str - строка разделенная вертикальной чертой ("param1:value1|param2:value2")
 * @returns объект с параметрами
 */
const func = (str: string): Record<string, string> => {
  const obj: Record<string, string> = {};
  const arr: string[] = str.split("|");

  arr.forEach((el: string) => {
    const [key, value] = el.split(":");
    if (key && value) {
      obj[key] = value;
    }
  });

  return obj;
};
export default func;
