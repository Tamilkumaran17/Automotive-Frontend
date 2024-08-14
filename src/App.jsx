import {React, useState} from 'react' 

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import '../src/App.css'
import Productcart from './Components/Product';
import Header from './Components/Header';
import Cart from "./Components/Cart";
import'@fortawesome/fontawesome-free/css/all.min.css'
import WishList from './Components/WishList';
import About from './Components/About';
import ProductList from './Components/ProductList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginSignupPopup from './Components/LoginSignup';
import Order from './Components/Order';

const App = ()=>{

  // const [count, setCount] = useState(0);
  // const [cart,setCart] = useState([]);
  // const [search ,setSearch] = useState("");
 
  // const increment =()=>{
  //   setCount(count+1);
  //   console.log(count)
  // } 

  return (


    //fragment

    <>  
    {/* <div className="container">
    <h1>React App     </h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est eos impedit consectetur, tempore dignissimos labore? Vitae reiciendis rerum dolores. Illo nulla odit repudiandae autem quasi quas perferendis nobis omnis facere.</p>
    </div>
    <h2>Counter:{count}</h2>
    <button onClick={increment}>+</button>
    <p>{count}</p> */}



<Router>
  <ToastContainer 
position="top-center"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss={false}
draggable
pauseOnHover={false}
theme="colored"
transition: Bounce/>

        <Header/>
        <div className="content-blur">

        <Routes>
          
          <Route exact path="/" element={
            <Productcart/>
            } />

          <Route path="/cart" element={
            <Cart/>
            } />

            <Route path="/wishlist" element={
              <WishList/>
            }/>

            <Route path="/about" element={
              <About/>
            }/>

            <Route path='/productlist/:id' element={
              <ProductList/>
            }/>

            <Route path='/auth' element={
              <LoginSignupPopup/>
            }/>

            <Route path='/order' element={
              <Order/>
            }/>

        </Routes>
        </div>


</Router>
  

    </>
  )
}

export default App;