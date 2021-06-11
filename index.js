const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const authRouter = require("./Routes/amin/auth");
const adminProductsRouter = require("./Routes/amin/products");
const productsRouter = require("./routes/products.js");
const cartsRouter = require("./routes/carts.js");

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
app.use(cartsRouter);
app.unsubscribe(adminProductsRouter);

app.listen(3000, () => {
  console.log("Listening");
});
