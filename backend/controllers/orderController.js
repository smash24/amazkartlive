const OrderModel = require("../models/orderModel");
const ProductModel = require("../models/productModel");


//create order -- /api/v1/order
exports.getOrder = async (req,res)=>{

    console.log(req.body ,"body")
    
    let cartItems = req.body; 

    

    let amount = cartItems.reduce((acc, item)=> {

        return acc + item.singleProduct.price * item.qty

    } ,0).toFixed(2) 
    
    let status = "pending"
 
    console.log(amount , "amount")

    
    const order = await OrderModel.create({cartItems,amount,status})
    
    cartItems.forEach(async (item)=> {
        const product = await ProductModel.findById(item.singleProduct._id)
        product.stock = product.stock - item.qty
        await product.save()
    })

    
    
    res.json({
       success: true,
       order
    })

   
    
}