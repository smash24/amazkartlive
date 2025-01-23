
const express = require("express");
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const cors = require("cors")
const products = require("./routes/products")
const orders = require("./routes/order")
const connectDatabase = require("./config/connectDatabase")
dotenv.config({path: path.join(__dirname,'config','config.env')})


app.use(express.json());
app.use(cors());

app.use("/api/v1",products)
app.use("/api/v1",orders)



connectDatabase();


app.listen(process.env.PORT,
     ()=> {
    console.log(`Server running successfully on port ${process.env.PORT} in ${process.env.NODE_ENV}`)}) 
