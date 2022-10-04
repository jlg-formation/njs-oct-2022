const express = require("express");

const app = express.Router();

app.get("/date", (req, res) => {
  res.json({
    date: new Date(),
  });
});

module.exports = app;
