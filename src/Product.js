import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";
const Product = ({id, title, price, image, rating }) => {
  const [{basket},dispatch]=useStateValue ();
  

  console.log("this is the the basket",basket)

  const AddToBasket = () => {
    dispatch({
      type: "ADD_To_BASKET",
      item: {
        id: id,
        title: title,
        price: price,
        image: image,
        rating: rating
      }
    });
  };
  
  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price"></p>
        <p>
          <small>$</small>
          <strong> {price} </strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
      </div>
      <img src={image} alt="" />
      <button onClick={AddToBasket} >Add to Basket</button>
    </div>
  );
};

export default Product;
