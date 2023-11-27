import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Order from "./Order/Order";
import "./Orders.css";

const Orders = () => {
  const orders = useSelector((state) => state.user.user.orders);
  const navigate = useNavigate();
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="orders">
            {orders.map((order, idx) => (
              <div className="order" key={idx}>
                <p>
                  OrderedAt : {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p>First Name : {order.fname}</p>
                <p>Last Name : {order.lname} </p>
                <p>Country : {order.country}</p>
                <p>City : {order.city}</p>
                <p>Street : {order.street}</p>
                <p>City code : {order.cityCode}</p>
                <p>Total Quantity : {order.cart.totalQte}</p>
                <p>Price : {order.cart.totalPrice}$</p>
                <button
                  onClick={() =>
                    navigate(`/profile/orders/order?id=${order._id}`)
                  }
                >
                  Preview
                </button>
              </div>
            ))}
          </div>
        }
      />
      <Route path="/order" element={<Order />} />
    </Routes>
  );
};

export default Orders;
