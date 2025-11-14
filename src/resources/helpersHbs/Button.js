import Handlebars from "handlebars";
import getParamsFromHbsHelper from "../js/helpers/getParamsFromHbsHelper";

/**
 * Обычная кнопка
 */
export default (fieldParam) => {
  let label = getParamsFromHbsHelper(fieldParam).label,
      type = getParamsFromHbsHelper(fieldParam).type,
      additionalСlass = !!getParamsFromHbsHelper(fieldParam).additionalСlass ? getParamsFromHbsHelper(fieldParam).additionalСlass : '',
      typeButton = (type === 'submit') ? 'type="submit"' : '';

  let str = `<button class="button buttonSubmit ${additionalСlass}" ${typeButton}>${label}</button>`;

  return new Handlebars.SafeString(str);
};
