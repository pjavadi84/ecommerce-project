const express = require("express");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const usersRepo = require("./repositories/users");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["a;kwj0sjklsdjfw09s"],
  })
);

app.listen(3000, () => {
  console.log("Listening");
});
