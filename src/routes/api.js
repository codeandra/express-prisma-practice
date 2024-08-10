const productController = require("../controllers/productController");

const express = require("express");
const router = express.Router();

// route api products
router.get("/products", productController.getProducts);
router.post("/products", productController.createProduct);
router.delete("/products/:id", productController.deleteProduct);

module.exports = router