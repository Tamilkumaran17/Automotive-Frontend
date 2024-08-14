import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Components/WishList.css";
import { initWishlist, removeWishList } from "../redux/wishListSlice";
import slash from '../sounds/slash.mp3'
import { Link, useNavigate } from "react-router-dom";
import { setProducts } from "../redux/ProductList.js";
import axios from "axios";
import { toast } from "react-toastify";



const WishList = ()=>{
    const wishList = useSelector((state) => state.wishList.items);
    const filteredProducts = useSelector((state)=> state.search.query);
    const navigate=useNavigate();
    
    // const filteredProducts = wishList.filter((item)=> item.title.toLowerCase().includes(search.toLowerCase()) ||
    // item.description.toLowerCase().includes(search.toLowerCase()) ||
    // item.category.toLowerCase().includes(search.toLowerCase()) ||
    // item.price.toString().includes(search.toLowerCase()));




  const dispatch = useDispatch();
  const token = useSelector((state)=>state.token.token)


    const removeList = async(item) =>{

       

        playSound()
        dispatch(removeWishList(item));
    }

    const playSound = ()=>{
        const audio = new Audio(slash);
        audio.play();
    }

    const handleproduct= (item) =>{
        dispatch(setProducts(item));
        navigate(`/productlist/${item.id}`);
      }



    return(
        <>
        <h1 className="wishlist">Wish list</h1>

        <div className="wishlist-page">

            {wishList.length === 0 ? (
                <div className="empty-wishlist">
                    <h2> No items in Wish List</h2>
                </div>
            ) : (

                <ul className="wishlist-list">

                    {wishList.map((item)=> (
                        
                        <li key={item.id} className="list">

                             
                            <img src={item.image} alt={item.image} onClick={()=>handleproduct(item)}/>

                            <div className="item-details">
                                <p className="title"> {item.title}</p>
                                <p className="price">Price: <span>${item.price}</span></p>
                                <button className="remove-btn" onClick={()=> removeList(item)}> <i class="fa-solid fa-trash-can"></i> Remove</button>
                                {/* <button className="bubbly-button" onClick={handleAnimation}>sub</button> */}
                            </div>
                        </li>
                        
                    ))}
                </ul>
            )}
        </div>

        </>

    )
}

export default WishList;