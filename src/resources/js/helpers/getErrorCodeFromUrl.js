export default (str) => {
  return new URLSearchParams(window.location.search).get("code");
};