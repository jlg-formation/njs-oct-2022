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

  return app;
};
