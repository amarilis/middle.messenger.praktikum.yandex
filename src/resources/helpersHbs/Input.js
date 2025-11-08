import Handlebars from "handlebars";
import getParamsFromHbsHelper from "../js/helpers/getParamsFromHbsHelper";

/**
 * Поле ввод с разными возможными типами
 */
export default (fieldParam) => {
  let label = getParamsFromHbsHelper(fieldParam).label,
    name = getParamsFromHbsHelper(fieldParam).name,
    type = getParamsFromHbsHelper(fieldParam).type,
    errorLabel = getParamsFromHbsHelper(fieldParam).errorLabel,
    typeInput = type === "pass" ? "password" : "text",
    eye = type === "pass" ? `<i class="icon eye"></i>` : "",
    errorLine = !!errorLabel ? `<div class="input__error">${errorLabel}</div>` : "";

  let str = `
  <div class="input">
    <input id="${name}" name="${name}" type="${typeInput}" class="input__field" placeholder="  " />
    <label for="${name}" class="input__placeholder">${label}</label>
    ${eye}
    ${errorLine}
  </div>`;

  return new Handlebars.SafeString(str);
};
