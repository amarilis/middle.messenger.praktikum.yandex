import endpoints from "../endpoints";

/**
 * Параметры запроса к API
 */
export interface GetDataParams<TRequest = unknown, TResponse = unknown> {
  url: string;
  method: string;
  body?: TRequest;
  render: (data: TResponse) => void;
}

/**
 * Отправка и получение данных
 * @param params объект:
 * - url — адрес запроса
 * - method — HTTP‑метод
 * - body — исходные параметры
 * - render — функция, которая будет выполнена после получения данных
 */
export default function getData<TRequest = unknown, TResponse = unknown>(
  params: GetDataParams<TRequest, TResponse>
): void {
  const requestInit: RequestInit = {
    method: params.method,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    credentials: "include",
  };

  if (params.body !== undefined) {
    requestInit.body = JSON.stringify(params.body);
  }

  fetch(`${endpoints.https}${params.url}`, requestInit)
    .then(async (response: Response) => {
      const status = response.status;
      let data: any = null;

      try {
        data = await response.json();
      } catch {
        // может быть пустой ответ без тела
      }

      // если авторизован без ошибок отправляем сразу в чат
      if (params.url === "auth/signin" && status === 200) {
        window.location.href = "/";
      }

      if (data && typeof data === "object" && (data as any).reason === "User already in system" && status === 400) {
        window.location.href = "/";
      }

      return data as TResponse;
    })
    .then((data: TResponse) => {
      console.log("getData, data", data);
      params.render(data);
    })
    .catch((error: unknown) => {
      console.error("getData error:", error);
    });
}
