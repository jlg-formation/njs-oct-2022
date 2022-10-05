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

  return app;
};
