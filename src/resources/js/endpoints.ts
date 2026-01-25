interface Endpoints {
  resources: string;
  https: string;
  ws: string;
}

const endpoints: Endpoints = {
  resources: "https://ya-praktikum.tech/api/v2/resources/",
  https: "https://ya-praktikum.tech/api/v2/",
  ws: "wss://ya-praktikum.tech/ws/chats/"
};

export default endpoints;
