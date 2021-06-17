const express = require("express");
const productsRepo = require("../repositories/products");
const productIndexTemplate = require("../views/products/index");

const router = express.Router();

router.get("https://guarded-stream-95360.herokuapp.com/", async (req, res) => {
  const products = await productsRepo.getAll();

  res.send(productIndexTemplate({ products }));
});

module.exports = router;
