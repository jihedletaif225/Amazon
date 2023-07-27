import React, { useEffect, useState } from "react";

import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct.js";
import { Link, useNavigate } from "react-router-dom";

import { NumberFormatBase } from "react-number-format";
import { getBasketTotal } from "./reducer";

import { db } from "./firebase";

import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import axios from "axios";

import "./Payment.css";

function Payment() {
  const navigate = useNavigate();

  const stripe = useStripe();
  const element = useElements();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [clientSecret, setClientSecret] = useState(null);

  const [{ basket, user }, dispatch] = useStateValue();

  useEffect(() => {
    const getClientSecret = async () => {
      const total = getBasketTotal(basket) * 100; // Make sure getBasketTotal is defined and implemented
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${total}`.trim(), // Remove whitespace if necessary
      });

      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  console.log("the secret is >>>", clientSecret);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: { card: element.getElement(CardElement) },
        }
      );

      if (error) {
        // Handle payment error (optional)
        setError(error.message);
        setSucceeded(false);
        setProcessing(false);
      } else {
        // Payment succeeded, store order details in Firestore
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        // Reset state and navigate to the orders page
        setError(null);
        setSucceeded(true);
        setProcessing(false);
        dispatch({ type: "EMPTY_BASKET" });
        navigate("/orders");
      }
    } catch (error) {
      // Handle any unexpected errors
      setError("An unexpected error occurred.");
      setSucceeded(false);
      setProcessing(false);
    }
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? error.message : "");
  };
  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          checkout (<Link to="/checkout"> {basket.length} items </Link> )
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Adresse</h3>
          </div>
          <div className="payment__adress">
            <p>{user && user.email}</p>
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3> Review items and Delivery </h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Methode</h3>
          </div>
          <div className="payment__details">
            <form action="" onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <NumberFormatBase
                  renderText={(value) => <h3>order Total : {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType="text"
                  thousandSeparator={true}
                  prefix="$"
                />
                <button disabled={processing || succeeded || disabled}>
                  <span>{processing ? <p>processing</p> : "buy now"} </span>{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
