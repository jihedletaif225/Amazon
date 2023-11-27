import React, { useRef, useState } from "react";
import "./CheckoutPage.css";
import countryList from "./countryList.js";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useDispatch } from "react-redux";
import { addOrder } from "../../actions/user";
import { useNavigate } from "react-router-dom";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const initialSnack = {
  status: false,
  severity: "success",
  message: "no message here",
};

const CheckoutPage = () => {
  const [snackStatus, setSnackStatus] = useState(initialSnack);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fnameRef = useRef();
  const lnameRef = useRef();
  const countryRef = useRef();
  const cityRef = useRef();
  const streetRef = useRef();
  const cityCodeRef = useRef();
  const cardNumberRef = useRef();
  const cardCvvRef = useRef();
  const cardExpRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const fname = fnameRef.current.value;
    const lname = lnameRef.current.value;
    const country = countryRef.current.value;
    const city = cityRef.current.value;
    const street = streetRef.current.value;
    const cityCode = cityCodeRef.current.value;
    const cardNumber = cardNumberRef.current.value;
    const cardCvv = cardCvvRef.current.value;
    const cardExp = cardExpRef.current.value;

    if (country === "Country") {
      setSnackStatus({
        status: true,
        severity: "warning",
        message: "Please enter a country",
      });
      return;
    }

    if (cardNumber.length !== 16 || isNaN(cardNumber)) {
      setSnackStatus({
        status: true,
        severity: "warning",
        message: "Please provide a correct card number",
      });
      return;
    }

    if (cardCvv.length !== 3) {
      setSnackStatus({
        status: true,
        severity: "warning",
        message: "Please provide a correct card cvv",
      });
      return;
    }

    const tab = cardExp.split("/");

    if (
      tab.length !== 2 ||
      tab[0].length !== 2 ||
      isNaN(tab[0]) ||
      tab[1].length !== 4 ||
      isNaN(tab[1])
    ) {
      setSnackStatus({
        status: true,
        severity: "warning",
        message: "Please provide a correct card expiration date",
      });
      return;
    }

    const body = {
      fname,
      lname,
      country,
      city,
      street,
      cityCode,
    };

    dispatch(addOrder(body));
    navigate("/profile/orders");
  };

  const closeHandler = () => {
    setSnackStatus({
      ...snackStatus,
      status: false,
    });
  };

  return (
    <div className="checkout-page">
      <form onSubmit={submitHandler}>
        <h2>Checkout</h2>
        <div>
          <input type="text" placeholder="First Name" required ref={fnameRef} />
          <input type="text" placeholder="Last Name" required ref={lnameRef} />
        </div>
        <div>
          <select name="cars" id="cars" ref={countryRef}>
            <option value="Country" defaultValue>
              Country
            </option>
            {countryList.map((country, idx) => (
              <option value={country} key={idx}>
                {country}
              </option>
            ))}
          </select>
          <input type="text" placeholder="City" required ref={cityRef} />
        </div>
        <div>
          <input
            type="text"
            placeholder="Street Name"
            required
            ref={streetRef}
          />
          <input
            type="text"
            placeholder="City Code"
            required
            ref={cityCodeRef}
          />
        </div>
        <div></div>
        <div>
          <input
            type="text"
            placeholder="Card Number"
            required
            ref={cardNumberRef}
          />
          <input type="text" placeholder="CVV" required ref={cardCvvRef} />
        </div>
        <div>
          <input
            type="text"
            placeholder="MM / YYYY"
            required
            ref={cardExpRef}
          />
        </div>
        <button>
          <ShoppingCartCheckoutIcon />
          <span>Order</span>
        </button>
      </form>
      <Snackbar
        open={snackStatus.status}
        autoHideDuration={6000}
        onClose={closeHandler}
      >
        <Alert
          severity={snackStatus.severity}
          sx={{ width: "100%" }}
          onClose={closeHandler}
        >
          {snackStatus.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CheckoutPage;
