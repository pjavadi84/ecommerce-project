const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const authRouter = require("./Routes/amin/auth");
const productsRouter = require("./Routes/amin/products");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["lkasld235j"],
  })
);
app.use(authRouter);
app.use(productsRouter);

app.listen(3000, () => {
  console.log("Listening");
});
