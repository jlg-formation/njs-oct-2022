import { WebServer } from "./WebServer";

(async () => {
  const server = new WebServer();
  await server.start();
})();
