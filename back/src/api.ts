import express from "express";
import { rest } from "./rest";
import { WebServer } from "./WebServer";

export const api = (webServer: WebServer) => {
  const app = express.Router();

  app.get("/date", (req, res) => {
    res.json({
      date: new Date(),
    });
  });

  app.get("/ping", (req, res) => {
    res.send("pong");
  });

  app.use(
    "/articles",
    rest(webServer, "articles", {
      storageType: "File",
      path: "./data/articles.json",
    })
  );
  app.use("/users", rest(webServer, "users", { storageType: "RAM" }));
  app.use(
    "/groups",
    rest(webServer, "groups", {
      storageType: "Mongo",
      url: process.env.MONGO_URL || "mongodb://localhost:27017/gestion-stock",
    })
  );
  app.use(
    "/roles",
    rest(webServer, "roles", {
      storageType: "Mongoose",
      url:
        process.env.MONGOOSE_URL || "mongodb://localhost:27017/gestion-stock",
    })
  );

  return app;
};
