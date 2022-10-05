(() => {
  module.exports = (resourceName: string) => {
    const express = require("express");

    const app = express.Router();

    app.get("/", (req, res) => {
      res.json([]);
    });

    return app;
  };
})();
