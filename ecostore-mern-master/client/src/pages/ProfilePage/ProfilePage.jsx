import React from "react";
import { Routes, Route, Link } from "react-router-dom";
// Import the icons
import FaceIcon from "@mui/icons-material/Face";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import "./ProfilePage.css";
import Profile from "./Profile/Profile";
import Saved from "./Saved/Saved";
import Cart from "./Cart/Cart";
import Orders from "./Orders/Orders";

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <ul className="left-profile-nav">
        <li>
          <Link to="/profile">
            <FaceIcon />
            &nbsp; Profile
          </Link>
        </li>
        <li>
          <Link to="/profile/saved">
            <FavoriteIcon />
            &nbsp; Saved
          </Link>
        </li>
        <li>
          <Link to="/profile/cart">
            <ShoppingCartIcon />
            &nbsp; Cart
          </Link>
        </li>
        <li>
          <Link to="/profile/orders">
            <LocalShippingIcon />
            &nbsp; Orders
          </Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders/*" element={<Orders />} />
      </Routes>
    </div>
  );
};

export default ProfilePage;
