const express = require("express");
const router = express.Router();
const cartsRepo = require("../repositories/carts");
const productsRepo = require("../repositories/products");
const cartShowTemplate = require("../views/carts/show");

// A) Receive a post request to add an item to a cart or update the existing item quantity
router.post("/cart/products", async (req, res) => {
  //  Figure out the cart
  let cart;
  if (!req.session.cartId) {
    //   We dont have cart, we need to create one
    //  and store the cart id on the req.session.cartId property
    cart = await cartsRepo.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    //   We have the cart! lets get it from the repo
    cart = await cartsRepo.getOne(req.session.cartId);
  }

  console.log(cart);
  const existingItem = cart.items.find(
    (item) => item.id === req.body.productId
  );
  // either increment quantity of the existing product
  if (existingItem) {
    // increment quantity and save cart
    existingItem.quantity++;
  } else {
    // add new product id to items array
    cart.items.push({
      id: req.body.productId,
      quantity: 1,
    });
  }

  await cartsRepo.update(cart.id, {
    items: cart.items,
  });

  res.send("Product added to cart");
});

// B) Receive a GET request to show all items in a cart
router.get("/cart", async (req, res) => {
  if (!req.session.cartId) {
    return res.redirect("/");
  }

  const cart = await cartsRepo.getOne(req.session.cartId);

  console.log(cart);

  for (let item of cart.items) {
    const product = await productsRepo.getOne(item.id);

    item.product = product;
  }

  res.send(cartShowTemplate({ items: cart.items }));
});

//C) Receive a POST request to delete an item from a cart
router.post("/cart/products/delete", async (req, res) => {
  console.log(req.body.itemId);
});

module.exports = router;
