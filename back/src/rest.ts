import express from "express";

export const rest = (resourceName: string) => {
  const app = express.Router();

  app.get("/", (req, res) => {
    res.json([]);
  });

  return app;
};
