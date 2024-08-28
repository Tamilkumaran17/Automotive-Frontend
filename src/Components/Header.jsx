import React, { useEffect, useState } from "react";
import '../Components/Header.css';
import logo from '../assets/logo.jpg';
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from 'react-router-dom';
import { setSearchQuery } from "../redux/searchSlice";
import LoginSignupPopup from "./LoginSignup";
import { clearUser } from "../redux/userSlice";
import { toast } from "react-toastify";

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    dispatch(setSearchQuery(search));
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    // toast.info("Logged out successfully")
    
    togglePopup(); // Close popup after logout

    window.location.reload(); // This will reload the page
  };

  return (
    <>
      <header>
        <Link to="/"><img src={logo} alt="Logo" /></Link>
        <div className="side-bar">
          <h2 className="products"><Link to="/"> <span>Products</span> </Link></h2>
          <h2 className=""><Link to="/about"> <span>About</span> </Link></h2>
          <span className="cartt"> <Link to="/cart"> Cart : <span className="num"> {cartItems.length}</span></Link></span>
          <span className="acc-icon" onClick={togglePopup}>
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
        <div className="search">
          <i className="fas fa-search search-icon"></i>
          <input className="search-col" placeholder="Search" value={search} onChange={handleSearch}></input>
        </div>
      </header>

      <LoginSignupPopup
        isOpen={isPopupOpen}
        onClose={togglePopup}
        user={user}
        onLogout={handleLogout}
      />
    </>
  );
}

export default Header;
