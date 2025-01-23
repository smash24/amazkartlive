import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import { toast } from 'react-toastify';

export default function PageDetails({cartItems,setCartItems}){
    
    const [qty ,setQty] = useState(1);
    
    const [singleProduct,setSingleProduct] = useState(null)
    const {id} = useParams();

    useEffect(()=>{
        fetch(process.env.REACT_APP_PRODUCTS_URL+"/product/"+id)
        .then(res => res.json())
        .then(res => { setSingleProduct(res.singleProduct)
           
        })
        .catch((err)=>console.log(err))
       },[])

       function increaseQty(){
           if(singleProduct.stock== qty){
            toast.info("Max Stock Availablity Reached !!! ")
             return;}

              setQty(qty + 1)

       }

       function decreaseQty(){
        
        if (qty>1)
         setQty(qty -1 )

     }


       
       const addToCart = () => {
            
             
            const itemExists = cartItems.find((item)  => 
                item.singleProduct._id === id )
             
            

            let isSameQty;

            if(itemExists){
                isSameQty= itemExists.qty === qty
               if(isSameQty){
                 console.log("same Quatity?" , isSameQty  )
                 return;
               } else {

                 //updating quantity only 
                 setCartItems((prev)=>{
                      return prev.map((item)=> {
                      return  item.singleProduct._id===id ?
                      {...item , qty:qty } 
                      : item
                    
                    })})

                 
               }
             
            
          
           } else{
      
               if (!itemExists){
                 const newItem = { singleProduct , qty }
                 setCartItems((prev)=>{return [...prev , newItem]})
                 toast.success("Items added successfully...")
            }}}
   
            console.log(cartItems)
                
                 
            
            
            
       
            
    return  singleProduct && (<div className="container container-fluid">
            <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
            
           
            <img src={singleProduct.images[0].image} alt="sdf" height="500" width="500"/>
            </div>

            <div className="col-12 col-lg-5 mt-5">
            <h3>{singleProduct.name}</h3>
            <p id="product_id">Product # {singleProduct._id}</p>

            <hr/>

          <div className="rating-outer">
             
              <div className="rating-inner" style={{width: `${singleProduct.ratings/5*100}%`}}> </div>
              
          </div>
     

          <hr/>

          <p id="product_price">${singleProduct.price}</p>
          <div className="stockCounter d-inline">
              <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

              <input type="number" className="form-control count d-inline" 
              value={qty} readOnly />

              <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
          </div>
           <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" 
           onClick={addToCart} disabled={singleProduct.stock==0}>Add to Cart</button>

          <hr/>

          <p>Status: <span id="stock_status"
           className={singleProduct.stock>0?"text-success":"text-danger"}>

            {singleProduct.stock>0?"In Stock":"Out Of Stock"}
            
            </span></p>

          <hr/>

          <h4 className="mt-2">Description:</h4>
          <p>{singleProduct.description}</p>
          <hr/>
          <p id="product_seller" className="mb-3" > Sold by: <strong>{singleProduct.seller}</strong></p>
          
          <div className="rating w-50"></div>
                  
      </div>

  </div>

</div> ) 
}


