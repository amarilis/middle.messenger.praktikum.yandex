import Handlebars from "handlebars";
import getParamsFromHbsHelper from "../js/helpers/getParamsFromHbsHelper";

/**
 * Круглая кнопка с иконкой внутри
 */
export default (fieldParam) => {
  let icon = getParamsFromHbsHelper(fieldParam).icon,
    additionalСlass = !!getParamsFromHbsHelper(fieldParam).additionalСlass ? getParamsFromHbsHelper(fieldParam).additionalСlass : '';

  let str = `<button class="button-icon ${additionalСlass}"><em class="icon ${icon}"></em></button>`;

  return new Handlebars.SafeString(str);
};
