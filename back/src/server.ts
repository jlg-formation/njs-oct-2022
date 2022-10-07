import { WebServer } from "./WebServer";

(async () => {
  const port = +(process.env.GS_PORT || 3000);
  const server = new WebServer({ port });
  await server.start();
})();
