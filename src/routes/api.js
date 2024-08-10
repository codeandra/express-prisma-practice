const productController = require("../controllers/productController");
const userController = require("../controllers/userController");
const orderController = require("../controllers/orderController");

const express = require("express");
const router = express.Router();

// route api products
router.get("/products", productController.getProducts);
router.post("/products", productController.createProduct);
router.patch("/products/:id", productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);

// route api users
router.get("/users", userController.getUsers);
router.post("/users", userController.createUser);
router.patch("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

// route api order
router.get("/orders", orderController.getOrders);
router.post("/orders", orderController.createOrder);
router.patch("/orders/:id", orderController.updateOrder);
router.delete("/orders/:id", orderController.deleteOrder);

module.exports = router