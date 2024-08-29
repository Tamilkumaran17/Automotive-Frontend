import React, { useState } from "react";
import "../Components/ProductList.css"
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { add } from "../redux/cartSlice";
import click from "../sounds/add-to-cart-click.mp3"
import { toast } from 'react-toastify';
import { addWishList, removeWishList } from "../redux/wishListSlice";



const ProductList= ()=>{

    
    const productList = useSelector((state)=> state.productlist.products);
    const cartItems = useSelector((state)=> state.cart.items);
    const wishLists = useSelector((state) => state.wishList.items);
    const user = useSelector((state) => state.user.user);

    const dispatch = useDispatch()

    const {id} = useParams();

    const [image,setImage] = useState(productList.image)



    const isCartItems = (item) => cartItems.some(cartItem => {
      return item.id === cartItem.productId
    });
    const isWishList = (item) => wishLists.some(wishList => item.id === wishList.id);



    const toggleWish = (item) => {
        if (!user) { 
            toast.warning("Please login to add items to the wishlist.");
            return;
          }


        if (isWishList(item)) {
          dispatch(removeWishList(item));
        }
        else {
          dispatch(addWishList(item));
        }
        // playanime()
    
      }


const handlecart = async(item) =>{
    if (!user) { 
        toast.warning("Please login to add items to the cart.");
        return;
      }

      // const cartItem = cartItems.filter((cart) => cart.productId === item.id);
      // var quantity = 1;
      // if (cartItem.length === 1) {
      //   quantity += cartItem[0].quantity;
      // }


      // const response = await axios.post("https://automotive-backend.vercel.app/cart/carts", {
      //   products: {
      //     productId: item.id,
      //     quantity
      //   }
      // }, {
      //   headers: {
      //     Authorization: "Bearer " + token
      //   }
      // });
      // if (response.status == 200) toast.info("Added to cart");
      // else toast.error("err to cart");

      toast.info("Added to cart");
      
       dispatch(add(item))
    playSound()
}

    const handlebuy =(item)=>{
        playSound();
    }

    const handlegoo =()=>{
        playSound();
    }

    const playSound =()=>{
        const audio = new Audio(click);
        audio.play();
    }


    return (
        <>
       
        
       <div className="container">
        <div className="product">

            <div className="left-side">

            <button
              className={`add-to-wishlist ${isWishList(productList) ? 'in-wishlist' : ''}`}
              onClick={() =>  toggleWish(productList)}>
              <i className={`fas ${isWishList(productList) ? 'fa-heart in-heart' : 'fa-heart'}`}></i>
            </button>

                <div className="prod-img">
                <img src={image}></img>  
                </div>

                <div className="sub-img">
                    
                    <div className="image">
                    <img onClick={()=>setImage(productList.image)} src={productList.image}></img>
                    </div>
                    <div className="image">
                    <img onClick={()=>setImage(productList.subimage[0])} src={productList.subimage[0]}></img>
                    </div> 
                    <div  className="image">
                    <img onClick={()=>setImage(productList.subimage[1])} src={productList.subimage[1]}></img>
                    </div> 
                    <div className="image">
                    <img onClick={()=>setImage(productList.subimage[2])} src={productList.subimage[2]}></img>
                    </div>                


                </div>

            </div>

            <div className="right-side">

                <h4 className="title">{productList.title}</h4>

                <div className="ratings">
                <i class="fas fa-star"></i>

                    <p className="rate">{productList.rating.rate}</p>
                    <p className="count">In-stock: <span>{productList.rating.count}</span> </p>
                </div>

                <p className="des">{productList.description}</p>
                <p className="price">Price: <span>${productList.price}</span></p>

                <div className="process">


                {  isCartItems(productList) ? (
                    <button className="goo" onClick={  handlegoo}><Link to='/cart'>Go to cart</Link></button> 
                    
                ): (
                    <button className="add" onClick={()=>{handlecart(productList)}}>Add to cart</button> 

                )}

                    {/* <button className="add" onClick={()=>handlecart(productList)}>Add to cart</button> */}
                    <button className="buy-now" onClick={()=>handlebuy(productList)}>Buy now</button>
                </div>


            </div>

        </div>



       </div>
        
        
        
        </>


    )

}

export default ProductList;