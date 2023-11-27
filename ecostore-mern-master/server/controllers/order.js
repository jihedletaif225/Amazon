import Cart from "../models/Cart.js";
import Order from "../models/Order.js";

// add an order
export const addOrder = async (req, res, next) => {
  const { uid } = req.user;
  const body = req.body;
  try {
    const cart = await Cart.findOne({ owner: uid });

    const updatedCart = await Cart.findOneAndUpdate(
      { owner: uid },
      {
        products: [],
        totalPrice: 0,
        totalQte: 0,
      },
      { new: true }
    );

    const { products, totalQte, totalPrice } = cart;

    body.cart = { products, totalQte, totalPrice };
    body.owner = uid;

    await Order.create(body);

    const orders = await Order.find({ owner: uid }).populate(
      "cart.products.product"
    );

    res.status(200).send({ cart: updatedCart, orders });
  } catch (e) {
    next(e);
  }
};

// add an order
export const getOrders = async (req, res, next) => {
  const { uid } = req.user;
  try {
    const orders = await Order.find({ owner: uid }).populate(
      "cart.products.product"
    );
    res.status(200).send(orders);
  } catch (e) {
    next(e);
  }
};

// add an order
export const getOrder = async (req, res, next) => {
  const { oid } = req.params;
  try {
    const order = await Order.findById(oid).populate("cart.products.product");
    res.status(200).send(order);
  } catch (e) {
    next(e);
  }
};
