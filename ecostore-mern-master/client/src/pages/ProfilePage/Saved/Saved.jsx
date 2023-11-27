import React from "react";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromSaved } from "../../../actions/user";
import "./Saved.css";

const Saved = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saved = useSelector((state) => state.user.user.saved.products);

  return (
    <div className="saved">
      {saved.map((product, idx) => (
        <div className="product" key={idx}>
          <img
            src={product.image}
            alt=""
            onClick={() => navigate(`/product?id=${product._id}`)}
          />
          <div
            className="text-box"
            onClick={() => navigate(`/product?id=${product._id}`)}
          >
            <h2>{product.title}</h2>
            <h4>{product.description}</h4>
            <Rating readOnly value={product.rate} precision={0.5} />
            <h3>Price : {product.price}$</h3>
          </div>
          <div>
            <button
              onClick={() => {
                dispatch(removeFromSaved(product._id));
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Saved;
