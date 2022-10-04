const express = require("express");

const app = express.Router();

app.get("/date", (req, res) => {
  res.json({
    date: new Date(),
  });
});

app.use(express.json());

app.post("/articles", (req, res) => {
  console.log("req.body: ", req.body);
  res.status(201).end();
});

module.exports = app;
