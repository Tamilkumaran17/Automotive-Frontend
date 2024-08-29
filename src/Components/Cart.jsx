import React, { useEffect, useMemo, useState } from 'react';
import '../Components/Cart.css'
import { useSelector, useDispatch } from 'react-redux';
import { remove, clear, update, decrement, initCart } from '../redux/cartSlice';
import beep  from '../sounds/beep.mp3'
import slash  from '../sounds/slash.mp3'
import axios from "axios"
import {toast} from 'react-toastify'
import { Link } from 'react-router-dom';


const Cart = () => {

  const cartItems = useSelector((state) => state.cart.items);
  const filteredProducts = useSelector((state) => state.search.query);
  const token = useSelector((state)=>state.token.token)
  console.log(token);


  const total = useMemo( ()=>{
    
    let sum=0;
    cartItems.forEach(item => {
      sum += (item.price * item.quantity);
    })
    return Math.ceil(sum);
  }, [cartItems]);

  const dispatch = useDispatch();


  const handleIncrement = async(item,quantity) => {
  const token = localStorage.getItem('token');

    playSound();
    const response = await axios.put(`https://automotive-backend.vercel.app/cart/put/${item.productId}`,{quantity:item.quantity+quantity},{headers:{
      Authorization : "Bearer "+token
    }});
    dispatch(update({...item,quantity}))
  }

  const handleClear = async() => {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`https://automotive-backend.vercel.app/cart/deleteall`,{headers:{
      Authorization : "Bearer "+token
    }});
    console.log(response.data);
    

    playSlash()
    dispatch(clear());
  }



  const handleRemove = async(item) => {
    console.log(item);  
    const token = localStorage.getItem('token');
    const response = await axios.delete(`https://automotive-backend.vercel.app/cart/carts/delete/${item.productId}`,{headers:{
      Authorization : "Bearer "+token
    }});
    console.log(response.data);
    
    dispatch(remove(item));
    playSlash()
  }
  

  const calTotAmount = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  }

  const calulateTotQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }


  const playSlash =()=>{
    const slashh = new Audio(slash);
    slashh.play();
  }
  const playSound= ()=>{
    const audio = new Audio(beep);
    audio.play();

    
  }
  const handleCartGetAPI = async()=>{
    const token = localStorage.getItem('token');
    await axios.get("https://automotive-backend.vercel.app/cart/get",{headers:{
      Authorization : "Bearer "+token
    }}).then((res)=>{
      dispatch(initCart(res.data.cartItems));
    }).catch((error)=>{
      toast.error(error.message);
    })
  }

  useEffect(()=>{
      handleCartGetAPI();
  },[])


  // const filteredProducts = cartItems.filter(item => item.title.toLowerCase().includes(search.toLowerCase()) ||
  //   item.description.toLowerCase().includes(search.toLowerCase()) ||
  //   item.category.toLowerCase().includes(search.toLowerCase()) ||
  //   item.price.toString().includes(search.toLowerCase()));


  return (
    <>
      <h2 className='cart'>  Cart Items</h2>
      <button onClick={handleClear} className='clear'> Clear<i class="fa-regular fa-circle-xmark"></i> </button>

      <div className="cart-page">



        <div className="cart-summary">

          <div className="total">
            <p>Total Quantity : </p>
            <p>Total Amount :</p>

          </div>

          <div className="tot-value">
            <p>{calulateTotQuantity()}</p>
            <p>${total}</p>

          </div>

          {/* <p className='tot-qnt'>Total Quantity: <span>{calulateTotQuantity()}</span></p>
          <p className='tot-amt'>Total Amount: <span>${total}</span></p> */}


          <h4><input type='radio' className='terms'/> Terms and Conditions </h4>
          <Link to="/order"><button className='checkout'>Checkout</button></Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h2>No items in cart</h2>
          </div>
        ) : (<>

          <ul className="cart-list">

            {cartItems.map((item, index) => (

              <li key={index} className="cart-list-item">

                <img src={item.image} alt={item.title} />

                <div className="item-details">

                  <p className="title">{item.title}</p>

                  <p className="price">Price: <span>${item.price}</span></p>

                  <div className="quantity-controls">
                    <p className="quantity">Quantity:

                      <button onClick={() => handleIncrement(item,-1)} className='minus'>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleIncrement(item,1)} className='plus'>+</button> </p>
                  </div>

                  <p className="total-price">Total: <span>${(parseInt(item.price) * parseInt(item.quantity)).toFixed(2)}</span></p>
                  
                  <button onClick={() => handleRemove(item)} className='remove'> <i class="fa-solid fa-trash-can"></i> Remove</button>
                 


                </div>
                
                
              </li>
              
              
            ))}
            
          </ul>
          
          </>
          

        )}


      </div>
    </>
  );
};

export default Cart;
