const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const path = require("path");
// dotenv.config({path: path.join(__dirname,'config.env')});

const connectDatabase = () =>{
   console.log(process.env.DB_URL)
   mongoose.connect(process.env.DB_URL).then((con)=>{
    console.log("database connection success"
      +" connected to host: "+con.connection.host
    )
    
   }).catch((err)=>console.log(err))
}


module.exports = connectDatabase;
