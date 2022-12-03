const express = require("express");
const app = express();
const Controller = require("./apiController");

app.get("/api", (req, res) => {});

app.get("/search", Controller.Search);

app.listen(4000, () => {
  console.log("node runing on 4000");
});
