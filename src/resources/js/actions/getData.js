import endpoints from '../endpoints';

/**
 * Отправка и получение данных
 * @param {*} params объект
 * params.url адрес запроса
 * params.method метод запроса
 * params.body исходщие параметры
 * params.render функция, которая будет выполнена после получения данных
 */
export default (params) => {
  fetch(`${endpoints.https}${params.url}`, {
    method: params.method,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    credentials: "include",
    body: JSON.stringify(params.body),
  })
    .then((response) => {
      // если авторизован без ошибок отправляем сразу в чат
      if (params.url === "auth/signin" && response.status === 200) {
        window.location.href = "/";
      }
      if (response.reason === "User already in system" && response.status === 400) {
        window.location.href = "/";
      }
      return response.json();
    })
    .then((data, status) => {
      console.log(`getGata, data`, data);

      params.render(data);
    });
};
