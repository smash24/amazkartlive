import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Cart({cartItems , setCartItems}){

    
    const [complete, setComplete] = useState(false)

    function increaseQty(item){
               if(item.singleProduct.stock == item.qty){
                toast.info("Max Stock Availablity Reached !!! ")
                 return;}
    
                //  setCartItems((prev)=>{
                //     return prev.map((i)=> {
                //     return  item.singleProduct._id===i._id ?
                //     item.qty++
                //     : item
                  
                //   })})
                
                const updatedItem = cartItems.map((i)=>{
                      if(i.singleProduct._id == item.singleProduct._id){
                        i.qty++
                      }
                      return i;

                }  )

                setCartItems(updatedItem)

}
    
      function decreaseQty(item){
          
        if(item.qty>1){
        const updatedItem = cartItems.map((i)=>{
            
            if(i.singleProduct._id == item.singleProduct._id){
                i.qty--;
              }
              return i;
            

      }  )

      setCartItems(updatedItem)

}}



      function removeItem(item){
        
         const deleteItem = cartItems.filter((i)=> !(
            item.singleProduct._id == i.singleProduct._id
        ))
            
        
         setCartItems(deleteItem)

            }

      function placeOrderHandler(){
         
          fetch(process.env.REACT_APP_PRODUCTS_URL+"/order",{
              method:"POST",
              headers: {"Content-type":"application/json"},
              body: JSON.stringify(cartItems)
          })
        .then(()=>{console.log(cartItems)})
        .then(()=>{
            setCartItems([])
            setComplete(true)
            toast.success("Order placed Successfully...")
            
        })

      }



        
        

      


 return  cartItems.length>0 ?  < Fragment>
       <div className="container container-fluid">
          <h2 className="mt-5">Your Cart: <b>{cartItems.length} items</b></h2>
 
          <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8">
         <hr />
         
         {cartItems.map((item)=> (<Fragment>
         
         <div className="cart-item">
             <div className="row">
                 <div className="col-4 col-lg-3" >  
                     <img src={item.singleProduct.images[0].image} alt={item.singleProduct.name} height="90" width="115"/>
                 </div>

                 <div className="col-5 col-lg-3">
                     <Link to={"/product/"+item.singleProduct._id}>{item.singleProduct.name}</Link>
                 </div>


                 <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                     <p id="card_item_price">${item.singleProduct.price}</p>
                 </div>

                 <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                     <div className="stockCounter d-inline">
                         <span className="btn btn-danger minus" onClick={()=>decreaseQty(item)} >-</span>
                         <input type="number" className="form-control count d-inline" value={item.qty} readOnly />

                         <span className="btn btn-primary plus" onClick={()=>increaseQty(item)} >+</span>
                     </div>
                 </div>

                 <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                     <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={()=>removeItem(item)}></i>
                 </div>

             </div>
         </div>
     
         </Fragment>))}


     </div>
     

     <div className="col-12 col-lg-3 my-4">
         <div id="order_summary">
             <h4>Order Summary</h4>
             <hr />
             <p> Subtotal:  <span className="order-summary-values">{cartItems.reduce((acc, item)=>{return acc + item.qty},0)} units </span></p>
             <p>Est. total: <span className="order-summary-values">${cartItems.reduce((acc, item)=>{return acc + item.singleProduct.price * item.qty},0).toFixed(2)}</span></p>

             <hr />
             <button id="checkout_btn"onClick={placeOrderHandler} className="btn btn-primary btn-block"> Place Order </button>
         </div>
     </div>
 </div>
</div>
          </Fragment> : ( !complete ? <> <h2 className="mt-5">Your Cart is Empty!</h2> <br/><br/><br/><br/>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/>
          </>: <><h2 className="mt-5" > Thanks for Shopping with us </h2><br/><br/><br/><br/>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/></>)

}