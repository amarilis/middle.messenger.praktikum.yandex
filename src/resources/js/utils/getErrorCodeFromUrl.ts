/**
 * Получает код ошибки из URL параметров
 * @returns код ошибки из query string или null
 */
export default (): string | null => {
  return new URLSearchParams(window.location.search).get("code");
};
