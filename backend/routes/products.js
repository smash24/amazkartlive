const express = require("express");
const router = express.Router();
const {getProducts,getSingleProduct} = require("../controllers/productsController")


router.get("/products",getProducts)
router.get("/product/:id",getSingleProduct)



module.exports = router;

