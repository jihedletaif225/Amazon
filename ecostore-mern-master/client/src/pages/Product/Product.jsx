import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../api/requests";
import { addToSaved, addToCart } from "../../actions/user";
import { Rating } from "@mui/material";

import "./Product.css";
import SimpleBackdrop from "../../components/SimpleBackdrop/SimpleBackdrop";

const Product = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const prodId = searchParams.get("id");

  const [product, setProduct] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchProduct = async () => {
      const { data } = await getProduct(prodId);
      setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [prodId]);
  const addToSavedHandler = () => {
    dispatch(addToSaved(product._id));
    navigate("/profile/saved");
  };

  return (
    <div className="product-page">
      {isLoading ? (
        <SimpleBackdrop />
      ) : (
        <div className="product-page-prod">
          <img src={product.image} alt="" />
          <div>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <Rating
              name="read-only"
              value={product.rate}
              readOnly
              precision={0.5}
            />
            <p>Price : {product.price}$</p>
            {isLoggedIn && (
              <>
                <button
                  className="btn btn-1"
                  onClick={() => {
                    dispatch(addToCart(product._id));
                  }}
                >
                  Add to cart
                </button>
                &nbsp;
                <button className="btn btn-2" onClick={addToSavedHandler}>
                  Save product
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
