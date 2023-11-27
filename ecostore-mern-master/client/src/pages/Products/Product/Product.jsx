import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ScrollReveal from "scrollreveal";
import { addToCart } from "../../../actions/user";
import "./Product.css";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    // Scroll reveal settings
    ScrollReveal({ distance: "60px", duration: 2500 });

    // Scroll actions
    ScrollReveal().reveal(".products-page .products .product", {
      origin: "bottom",
      delay: 400,
    });
  }, []);
  const showProduct = () => {
    navigate(`/product?id=${product._id}`);
  };

  return (
    <div className="product">
      <img src={product.image} alt="" onClick={showProduct} />
      <div className="infos-box">
        <div className="text-box" onClick={showProduct}>
          <h3>{product.title}</h3>
          <h5>{product.description}</h5>
          <Rating
            name="read-only"
            value={product.rate}
            readOnly
            precision={0.5}
          />
          <h4>Price : {product.price}$</h4>
        </div>
        {isLoggedIn && (
          <button
            onClick={() => {
              dispatch(addToCart(product._id));
            }}
          >
            Add To Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
