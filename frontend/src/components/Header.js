import { useState } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";

export default function Header({cartItems}) {
   
  const [keyword, setKeyword] = useState('');

  function logoClickHandler(){
    setKeyword("")
   }

  return (
    <nav className="navbar row sticky-top" id="header">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to={"/"} onClick={logoClickHandler} ><img width="150px" src="/images/logo/logo.png" alt="Logo" /></Link>
        </div>
      </div>

      <Search keyword={keyword} setKeyword={setKeyword}/>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center ">
        <img width="150px" src="/images/logo/emblem.png" />
        <Link className="btn text-decoration-none" to={"/cart"}><span id="cart" className="ml-3">
          Cart
        </span>
        <span className="ml-1" id="cart_count"> {cartItems?cartItems.length:0} </span>
        
        </Link>

        
         
      </div>
    </nav>
  );
}
