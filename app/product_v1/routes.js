const express = require("express");

const router = express.Router();

const controller = require("./controller");

router.get("/product", controller.getProducts);
router.get("/products", controller.getProducts);
router.get("/product/:id", controller.getProductById);
router.get("/products/:id", controller.getProductById);
router.post("/product", controller.createProduct);
router.post("/products", controller.createProduct);
router.put("/product/:id", controller.updateProduct);
router.put("/products/:id", controller.updateProduct);
router.delete("/product/:id", controller.deleteProduct);
router.delete("/products/:id", controller.deleteProduct);

module.exports = router;