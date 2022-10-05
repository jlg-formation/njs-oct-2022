import express from "express";
import serveIndex from "serve-index";
import { api } from "./api";

const app = express();
const port = 3000;
const wwwDir = "./public";

app.use((req, res, next) => {
  console.log("req: ", req.url);
  next();
});

app.use("/api", api);

app.use(express.static(wwwDir));
app.use(serveIndex(wwwDir, { icons: true }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
