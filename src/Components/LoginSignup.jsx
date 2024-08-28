import React, { useState } from 'react';
import '../Components/LoginSignup.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { setToken } from '../redux/tokenSlice';
import { initCart } from '../redux/cartSlice';
import { initWishlist } from '../redux/wishListSlice';

const LoginSignupPopup = ({ isOpen, onClose, user, onLogout }) => {
const [isLogin, setIsLogin] = useState(true);
const [name, setName] = useState('');
const [password, setPassword] = useState('');
const [email, setEmail] = useState('');
const navigate = useNavigate();
const dispatch = useDispatch();

const handleLogin = async () => {
  try {
    const data = { name, password };
    const response = await axios.post("https://automotive-backend-ctzn.onrender.com/user/login", data);

    const {token}=response.data;
    localStorage.setItem('token', token);
    // dispatch(setToken(token));
    dispatch(initCart(response.data.cartItems))
  
    
    // localStorage.setItem('token', token);
    // console.log(token,"login");
    


    // Store user data in global state
    dispatch(setUser(response.data.user));
    toast.success("Login Successfully done");
    

    // Redirect to products page
    navigate('/');

    // Close the popup
    onClose();

  } catch (error) {
    console.error("Login failed:", error);
    toast.error("Login failed. Please try again.");
  }
};

const handleSignup = async () => {
  try {
    const data = { name, email, password };
    const response = await axios.post("https://automotive-backend-ctzn.onrender.com/user/signup", data);

    
    dispatch(setUser(response.data.user));
    toast.success("SignUp Successfully done");   
    navigate('/');    
    onClose();

  } catch (error) {
    console.error("Signup failed:", error);
    toast.error("Signup failed. Please try again.");
  }
};
return (
  <div className={`popup-overlay ${isOpen ? 'open' : ''}`}>
    <div className="popup-content">
      <button className="close-btn" onClick={onClose}>X</button>
      {user ? (
        <div className="user-info">
          <h2>Welcome, <span>{user.name} !</span> </h2>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      ) : (
        <>
          <div className="form-toggle">
            <button onClick={() => setIsLogin(true)} className={isLogin ? 'active' : ''}>Login</button>
            <button onClick={() => setIsLogin(false)} className={!isLogin ? 'active' : ''}>Sign Up</button>
          </div>
          {isLogin ? (
            <form className="login-form">
              <h2>Login</h2>
              <input type="text" placeholder="Username" required onChange={(e) => setName(e.target.value)} />
              <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
              <button type="button" onClick={handleLogin}>Login</button>
            </form>
          ) : (
            <form className="signup-form">
              <h2>Sign Up</h2>
              <input type="text" placeholder="Username" required onChange={(e) => setName(e.target.value)} />
              <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
              <button type="button" onClick={handleSignup}>Sign Up</button>
            </form>
          )}
        </>
      )}
    </div>
  </div>
);
};

export default LoginSignupPopup;


