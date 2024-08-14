import React, { useMemo } from "react";
import '../Components/Order.css'
import {useSelector} from "react-redux";

const Order = () =>{

    const cartItems = useSelector((state) => state.cart.items);
    console.log(cartItems);
    

    const total = useMemo( ()=>{
    
        let sum=0;
        cartItems.forEach(item => {
          sum += (item.price * item.quantity);
        })
        return Math.ceil(sum);
      }, [cartItems]);
    

    return (
        <>
        <h2 className="order">Order page</h2>
        <div className="order-container">
            <div className="left-content">
                <h3 className="total">Total: <span>${total}</span> </h3>

                { (!cartItems)  ? (
          <div className="empty-cart">
            <h2>No items in cart</h2>
          </div>
        ) : (<>

          <ul className="product-list">

            {cartItems.map((item, index) => (

              <li key={index} className="product-list-item">

                <img src={item.image} alt={item.title} />

                <div className="item-detail">

                  <p className="title">{item.title}</p>
                  <p className="quantity">Quantity: {item.quantity}</p>

                  {/* <p className="price">Price: <span>${item.price}</span></p> */}

                  {/* <div className="quantity-controls">
                    <p className="quantity">Quantity:

                      <button onClick={() => handleDecrement(item)} className='minus'>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleIncrement(item)} className='plus'>+</button> </p>
                  </div> */}

                  <p className="total-price">Total: <span>${(parseInt(item.price) * parseInt(item.quantity)).toFixed(2)}</span></p>
                  
                  {/* <button onClick={() => handleRemove(item)} className='remove'> <i class="fa-solid fa-trash-can"></i> Remove</button> */}
                </div>
              </li>
            ))}
          </ul>
          </>
        )}


            </div>
            <div className="right-content">
                <p className="emailtext"> Email</p>
                <input type="email" className="email" placeholder="Enter your Email" required ></input>

                <p className="detailstext">Details</p>

                <table className="details">
                    <tr>
                        <input className="name" type="name" placeholder="Enter the name" required></input>
                    </tr>
                    <tr>
                        <input className="number" type="number" placeholder="Enter the Phone Number" required></input>
                    </tr>
                    <tr>
                        <textarea className="address"  placeholder="Enter the Address" rows="2" required ></textarea>
                    </tr>
                    
                </table>

               <input type="radio" className="radio"></input>
               <p className="terms">Terms and conditions</p>

                <button type="submit" className="pay">Pay ${total}</button>



            </div>
        </div>
        </>
    )

}
export default Order;