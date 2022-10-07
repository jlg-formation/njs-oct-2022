import express from "express";
import { RestOptions } from "./interfaces/RestOptions";
import { StorageServiceFactory } from "./services/StorageServiceFactory";
import { WebServer } from "./WebServer";

export const rest = (
  webServer: WebServer,
  resourceName: string,
  options?: RestOptions
) => {
  const app = express.Router();
  const service = StorageServiceFactory.getInstance(
    webServer,
    resourceName,
    options
  );

  app.use((req, res, next) => {
    if (service.isReady) {
      console.log("already ready");
      next();
      return;
    }
    service.on("isReady", () => {
      console.log("event isReady");
      next();
    });
  });

  app.get("/", (req, res) => {
    (async () => {
      try {
        const resources = await service.retrieveAll();
        res.json(resources);
      } catch (err) {
        console.log("err: ", err);
        res.status(500).end();
      }
    })();
  });

  app.get("/:id", (req, res) => {
    (async () => {
      try {
        const resource = await service.retrieveOne(req.params.id);
        res.json(resource);
      } catch (err) {
        console.log("err: ", err);
        res.status(500).end();
      }
    })();
  });

  app.use(express.json());

  app.post("/", (req, res) => {
    (async () => {
      try {
        const newResource = req.body;
        const newResourceId = await service.create(newResource);
        res.status(201).json({ id: newResourceId });
      } catch (err) {
        console.log("err: ", err);
        res.status(500).end();
      }
    })();
  });

  app.delete("/", (req, res) => {
    (async () => {
      try {
        if (JSON.stringify(req.body) !== "{}" && !(req.body instanceof Array)) {
          res.status(400).send("body exists but is not an array.");
          return;
        }
        const ids: string[] | undefined =
          req.body instanceof Array ? req.body : undefined;
        console.log("ids: ", ids);

        ids ? await service.deleteMany(ids) : await service.deleteAll();
        res.status(204).end();
      } catch (err) {
        console.log("err: ", err);
        res.status(500).end();
      }
    })();
  });

  return app;
};
