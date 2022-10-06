import express from "express";
import { rest } from "./rest";

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
  rest("articles", { storageType: "File", path: "./data/articles.json" })
);
app.use("/users", rest("users", { storageType: "RAM" }));

export const api = app;
