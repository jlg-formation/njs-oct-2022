const express = require("express");
const rest = require("./rest");

const app = express.Router();

app.get("/date", (req, res) => {
  res.json({
    date: new Date(),
  });
});

app.use(express.json());

app.use("/articles", rest("articles"));
app.use("/users", rest("users"));

module.exports = app;
