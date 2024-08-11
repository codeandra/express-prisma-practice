const express = require("express");
const router = express.Router();

const product = require("../controllers/productController");

router.get("/", product.getProducts);
router.post("/", product.createProduct);
router.patch("/:id", product.updateProduct);
router.put("/:id", product.updateProduct);
router.delete("/:id", product.deleteProduct);

module.exports = router