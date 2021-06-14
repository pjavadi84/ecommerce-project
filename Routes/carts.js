const express = require("express");
const router = express.Router();
const cartsRepo = require("../repositories/carts");

// Receive a post request to add an item to a cart
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
  // either increment quantity of the existing product

  // OR add new product to items array

  res.send("Product added to cart");
});
// Receive a GET request to show all items in a cart

// Receive a POST request to delete an item from a cart

module.exports = router;
