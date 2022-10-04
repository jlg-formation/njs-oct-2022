const express = require("express");
const serveIndex = require("serve-index");

const app = express();
const port = 3000;
const wwwDir = "./public";

app.use((req, res, next) => {
  console.log("req: ", req.url);
  next();
});

app.get("/api/date", (req, res) => {
  res.json({
    date: new Date(),
  });
});

app.use(express.static(wwwDir));
app.use(serveIndex(wwwDir, { icons: true }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
