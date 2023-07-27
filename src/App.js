import "./App.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";

import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Orders from "./Orders";



const stripePromise = loadStripe("pk_test_51NUuB8GzQVi5upvcG83ssvjV8ZjWCT6SL7Kzsmf3bbqr0vX4dwjNSPlW6DmCNMFw3Qblq2YJS82YAriKUVb9M3lj00tBMbk3uG");

const auth = getAuth();
function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("THE USER IS >>>", user);
      if (user) {
        dispatch({
          type: "SET_USER",
          user: user,
        });
        // User is signed in,

        // ...
      } else {
        // User is signed out

        dispatch({
          type: "SET_USER",
          user: null,
        });
        // ...
      }
    });
  }, []);
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/" element={<Home />} />

          <Route path="/payment" element={
            <Elements stripe={stripePromise} ><Payment /></Elements>} />

            <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
