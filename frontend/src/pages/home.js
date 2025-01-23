import { Fragment, useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"
import { useSearchParams } from "react-router-dom"

export default  function Home() {
   
      const [products,setProduct] = useState([])
      
      const [searchParams,setSearchParams]= useSearchParams()
      

      useEffect(()=>{
        fetch(process.env.REACT_APP_PRODUCTS_URL+"/products?"+searchParams)
        .then(res => res.json())
        .then(res => {setProduct(res.products)
      
      }).catch((err)=>console.log(err))
      },[searchParams])
      

      return <Fragment>
        
    
    <h1 id="products_heading">Latest Products</h1>

    <section id="products" className="container mt-5">
      <div className="row">

      {products.map(product=><ProductCard product={product}/>)}
         


      </div>
    </section>

   
   
   
   </Fragment>


}



