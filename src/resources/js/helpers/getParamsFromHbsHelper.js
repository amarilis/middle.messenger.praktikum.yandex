/**
 * Хелпер нужен для трансформации строки параметров в объект параметров
 * @param {*} str строка разделенная вертикальной чертой ("param1:value1|param2:value2")
 * @returns объект с парметрами
 */
const func = (str) => {
  const obj = {};
  let arr = str.split("|");

  arr.forEach((el) => {
    obj[el.split(":")[0]] = el.split(":")[1];
  });

  return obj;
};
export default func;
