import express, { Express } from "express";
import { createServer, Server } from "http";
import serveIndex from "serve-index";
import { api } from "./api";
import { WebServerOptions } from "./interfaces/WebServerOptions";

export class WebServer {
  options: WebServerOptions = {
    port: 3000,
  };
  server: Server;

  constructor(options?: Partial<WebServerOptions>) {
    this.options = { ...this.options, ...options };

    const app = express();
    this.server = createServer(app);
    const wwwDir = "./public";

    app.use((req, res, next) => {
      console.log("req: ", req.url);
      next();
    });

    app.use("/api", api(this));

    app.use(express.static(wwwDir));
    app.use(serveIndex(wwwDir, { icons: true }));
  }

  start(): Promise<void> {
    return new Promise((resolve, reject) => {
      const callback = (err: unknown) => {
        console.error("err: ", err);
        reject(err);
      };
      this.server.listen(this.options.port, () => {
        console.log(`Example app listening on port ${this.options.port}`);
        resolve();
        this.server.off("error", callback);
      });
      this.server.once("error", callback);
    });
  }

  stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.server.close((err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  }
}
