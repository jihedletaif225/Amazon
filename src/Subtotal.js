import React from "react";
import "./Subtotal.css";
import { NumberFormatBase } from "react-number-format";
// import { Link } from "react-router-dom";

import { getBasketTotal } from "./reducer";
import { useStateValue } from "./StateProvider";
import { useNavigate } from "react-router-dom";

function Subtotal() {
  const navigate = useNavigate();
  const [{ basket }] = useStateValue();
  return (
    <div className="subtotal">
      <NumberFormatBase
        renderText={(value) => (
          <div>
            <p>
              Subtotal ({basket.length} Items): <strong>${value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" />
              This order contains a gift
            </small>
          </div>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType="text"
        thousandSeparator={true}
        prefix="$"
      />

      <button onClick={(e) => navigate("/payment")}>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
