const express = require("express");
const router = express.Router();
const {getOrder} = require("../controllers/orderController")

router.post("/order",getOrder)


module.exports = router;
