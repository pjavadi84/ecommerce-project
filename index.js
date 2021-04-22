const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("hi there yoohoo");
});

app.listen(3000, () => {
  console.log("Listening yo");
});
