
import './App.css';
import './css/style.css'
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/home';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import PageDetails from './pages/pageDetails';
import { useState } from 'react';
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Cart from "./pages/Cart"

function App() {

  const [cartItems,setCartItems] = useState([])

  return (
       <div className="App">
        
         
         <Router>
          
          <div>
          <ToastContainer theme='dark' position='top-center'/>
          <Header cartItems={cartItems}/>
          <Routes>
           
           <Route path="/" element={<Home/>}/>
           <Route path="/search" element={<Home/>} />
           
          </Routes>
          </div>

          <div>
          <Routes >
            
            <Route path="/product/:id" element={<PageDetails cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="/cart"  element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />


          </Routes>

          </div>
         
         </Router>
         <Footer/>
      
       </div>
  );
}

export default App;
