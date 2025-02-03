
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

app.use("/", function(req,res){
     res.json({
          message: "hi this is amazkart"
     })
})


connectDatabase();

const PORT = process.env.PORT || 3000; 


app.listen(PORT,
     ()=> {
    console.log(`Server running successfully on port ${process.env.PORT} in ${process.env.NODE_ENV}`)}) 
