import express from "express";
import { RAMService } from "./services/RAMService";

export const rest = (resourceName: string) => {
  const app = express.Router();
  const service = RAMService.getInstance(resourceName);

  app.get("/", (req, res) => {
    (async () => {
      try {
        const resources = await service.retrieveAll();
        res.json(resources);
      } catch (err) {
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
