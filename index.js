const express = require("express");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const authRouter = require("./routes/amin/auth");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["a;kwj0sjklsdjfw09s"],
  })
);
app.use(authRouter);

app.listen(3000, () => {
  console.log("Listening");
});
