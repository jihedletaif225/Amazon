import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getOrder } from "../../../../api/requests";
import SimpleBackdrop from "../../../../components/SimpleBackdrop/SimpleBackdrop";
import "./Order.css";

const Order = () => {
  const navigate = useNavigate();

  const [order, setOrder] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [params] = useSearchParams();
  const orderId = params.get("id");

  useEffect(() => {
    const fetchOrder = async () => {
      const { data } = await getOrder(orderId);
      setOrder(data);
      setLoading(false);
    };

    fetchOrder();
  }, [orderId]);

  return (
    <div className="orders-order">
      {isLoading ? (
        <SimpleBackdrop />
      ) : (
        <>
          <div className="orders-order-prods">
            {order.cart.products.map((product, idx) => (
              <div
                className="orders-order-prods-prod"
                key={idx}
                onClick={() => navigate(`/product?id=${product.product._id}`)}
              >
                <h3>{product.product.title}</h3>
                <img src={product.product.image} alt="" />
                <p>{product.product.description}</p>
                <p>Price : {product.product.price}$</p>
                <p>Quantity : {product.qte}</p>
                <p>Total Price : {product.totalPrice}$</p>
              </div>
            ))}
          </div>
          <div className="orders-order-bottom">
            <p>Total Quantity : {order.cart.totalQte}</p>
            <p>Total price : {order.cart.totalPrice}$</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Order;
