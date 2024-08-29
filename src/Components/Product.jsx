import React, { useEffect, useState } from "react";
import { product } from '../constant';
import '../Components/Product.css';
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import click from "../sounds/add-to-cart-click.mp3"

import { add, remove } from "../redux/cartSlice.js";
import { addWishList, removeWishList } from "../redux/wishListSlice.js";
import anime from '../sounds/anime.mp3';
import chin from '../sounds/chin_tapak_dum_dum.mp3';
import { setProducts } from "../redux/ProductList.js";
import { toast } from 'react-toastify';
import axios from 'axios'





const Productcart = () => {
const search = useSelector((state) => state.search.query);
const cartItems = useSelector((state) => state.cart.items);
const wishLists = useSelector((state) => state.wishList.items);
const user = useSelector((state) => state.user.user);
const dispach = useDispatch();
const navigate = useNavigate();

// console.log(wishLists+ "wishlist");


const isCartItems = (item) => cartItems.some(cartItem => {

return item.id === cartItem.productId
});

const isWishList = (item) => wishLists.some(wishList => {
return item.id === wishList.id
});

// const token = useSelector((state) => state.token.token)





const toggleCart = async (item) => {
if (!user) {
  toast.warning("Please login to add items to the cart.");
  return;
}

const token = localStorage.getItem('token');

const cartItem = cartItems.filter((cart) => cart.productId === item.id);
var quantity = 1;
if (cartItem.length === 1) {
  quantity += cartItem[0].quantity;
}


const response = await axios.post("https://automotive-backend.vercel.app/cart/carts", {
  products: {
    productId: item.id,
    quantity
  }
}, {
  headers: {
    Authorization: "Bearer " + token
  }
});
if (response.status == 200) toast.info("Added to cart");
else toast.error("err to cart");
dispach(add(item));
playSound();
}




const toggleWish = (item) => {
  if (!user) { 
      toast.warning("Please login to add items to the wishlist.");
      return;
    }


  if (isWishList(item)) {
    dispach(removeWishList(item));
  }
  else {
    dispach(addWishList(item));
  }
  // playanime()

}


const handleGotocart = () => {
playSound();
}


const playSound = () => {
const audio = new Audio(click);
audio.play();

}

const playanime = () => {
const audio = new Audio(anime);
audio.play();
}

const handleProduct = (item) => {
dispach(setProducts(item));
navigate(`/productlist/${item.id}`);
}

useEffect(() => {
console.log(cartItems);


}, [cartItems])

const handleWishlist = () => {
console.log("wishlist handle");
}

useEffect(() => {
// console.log(wishLists);
}, [wishLists])



return (
<>

  <h2 className="product"> Products</h2>

  <h3 className="wish-list"> <Link to="/wishlist" onClick={handleWishlist}><span>WishList <i className="fas fa-heart topic-heart"></i> </span></Link></h3>
  <ul className="cart-container">

    {search.map((item) => (


      <li key={item.id} className="cart-item">
        <img src={item.image} alt={item.title} onClick={() => handleProduct(item)} />

        <p className="title"> {item.title}</p>
        <p className="price">Price: <span>${item.price}</span></p>
        <p className="des">Description: {item.description}</p>
        <p className="cat">Category: {item.category}</p>

        {isCartItems(item) ? (

          <button className="add-to-cart in-cart" onClick={handleGotocart}> <Link to="/cart">Go to Cart</Link></button>
        ) : (<>
          <button className="add-to-cart" onClick={() => { toggleCart(item) }}>Add to Cart</button>

        </>
        )}

        <button
          className={`add-to-wishlist ${isWishList(item) ? 'in-wishlist' : ''}`}
          onClick={() => toggleWish(item)}>
          <i className={`fas ${isWishList(item) ? 'fa-heart in-heart' : 'fa-heart'}`}></i>
        </button>

      </li>

    ))}
  </ul>
</>
)
}

export default Productcart;