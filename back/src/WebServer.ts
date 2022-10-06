import express, { Express } from "express";
import { Server } from "http";
import serveIndex from "serve-index";
import { api } from "./api";
import { WebServerOptions } from "./interfaces/WebServerOptions";

export class WebServer {
  app: Express;
  options: WebServerOptions = {
    port: 3000,
  };
  server: Server | undefined;

  constructor(options?: Partial<WebServerOptions>) {
    this.options = { ...this.options, ...options };

    const app = express();
    const wwwDir = "./public";

    app.use((req, res, next) => {
      console.log("req: ", req.url);
      next();
    });

    app.use("/api", api);

    app.use(express.static(wwwDir));
    app.use(serveIndex(wwwDir, { icons: true }));

    this.app = app;
  }

  start(): Promise<void> {
    return new Promise((resolve, reject) => {
      const callback = (err: unknown) => {
        console.error("err: ", err);
        this.server = undefined;
        reject(err);
      };
      this.server = this.app.listen(this.options.port, () => {
        console.log(`Example app listening on port ${this.options.port}`);
        resolve();
        this.server?.off("error", callback);
      });
      this.server.once("error", callback);
    });
  }

  stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.server?.close((err) => {
        if (err) {
          reject(err);
          return;
        }
        this.server = undefined;
        resolve();
      });
    });
  }
}
