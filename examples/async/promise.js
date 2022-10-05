const fs = require("node:fs/promises");

fs.readdir(".")
  .then((files) => {
    console.log("files: ", files);
    return fs.readFile(files[0], { encoding: "utf-8" });
  })
  .then((content) => console.log("content: ", content))
  .catch((err) => console.log("err: ", err));
