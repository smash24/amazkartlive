const ProductModel = require("../models/productModel")

//get products api -- api/v1/products
exports.getProducts = async (req,res)=>{
    
    
    const query = req.query.keyword?{name:{

        $regex : req.query.keyword,
        $options: 'i'

     }}:{}

    const products = await ProductModel.find(query)

    res.json({
       success: true,
       products
    })

    

   
}

//get singleProduct api -- api/v1/product/:id
exports.getSingleProduct = async (req,res)=>{
    
    
    
    try{
          
    const singleProduct = await ProductModel.findById(req.params.id)
    res.json({
        
       success: true,
       singleProduct

    })}
    catch(err){
        res.status(404).json({
        
            success:false,
            message: `unable to get the product by that id which is ${req.params.id}`
         })
        
    }

    console.log("Single Product page is working")
}