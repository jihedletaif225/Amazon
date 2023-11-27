import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  removeFromCart,
  decrementQte,
  incrementQte,
} from "../../../actions/user";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.user.user.cart);
  return (
    <div className="cart">
      <div className="cart-products">
        {cart?.products?.map((item, idx) => (
          <div className="cart-product" key={idx}>
            <h3>
              {item.product.title.length > 15
                ? item.product.title.substring(0, 15)
                : item.product.title}
            </h3>
            <img
              src={item.product.image}
              alt=""
              onClick={() => navigate(`/product?id=${item.product._id}`)}
            />
            <p>
              {item.product.description.length > 40
                ? item.product.description.substring(0, 40) + "..."
                : item.product.description}
            </p>
            <p>Price : {item.product.price}$</p>
            <p>Total Price : {item?.totalPrice?.toFixed(2)}$</p>
            <div className="bottom-cart-prod">
              <div>
                <IconButton
                  onClick={() => dispatch(decrementQte(item.product._id))}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <input type="text" readOnly value={item.qte} />
                <IconButton
                  onClick={() => dispatch(incrementQte(item.product._id))}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </div>
              <IconButton
                onClick={() => dispatch(removeFromCart(item.product._id))}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-checkout-box">
        <p> Total Price : {cart.totalPrice?.toFixed(2)}$</p>
        <button onClick={() => navigate("/checkout")}>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
