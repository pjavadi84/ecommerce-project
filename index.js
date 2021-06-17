const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const authRouter = require("./Routes/amin/auth");
const adminProductsRouter = require("./Routes/amin/products");
const productsRouter = require("./routes/products.js");
const cartsRouter = require("./routes/carts.js");

const PORT = process.env.PORT || "8080";
const app = express();
app.set("port", PORT);

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

app.listen(port, () => {
  console.log("listening");
});
