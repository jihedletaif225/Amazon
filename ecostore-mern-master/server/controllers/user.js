import customError from "../Handlers/customError.js";
import User from "../models/User.js";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Saved from "../models/Saved.js";

// Get a user
export const getUser = async (req, res, next) => {
  const uid = req.user.uid;
  try {
    const user = await User.findById(uid, { password: 0 });

    if (!user) throw customError("No user was found!", 401);

    const saved = await Saved.findOne({ owner: user.id }).populate("products");
    const cart = await Cart.findOne({ owner: user.id }).populate(
      "products.product"
    );
    const orders = await Order.find({ owner: user.id }).populate(
      "cart.products.product"
    );
    res.status(200).send({ user, saved, cart, orders });
  } catch (e) {
    next(e);
  }
};

// Delete a user
export const deleteUser = async (req, res, next) => {
  const uid = req.user.uid;
  try {
    await User.findByIdAndDelete(uid);
    await Cart.deleteMany({ owner: uid });
    await Order.deleteMany({ owner: uid });
    await Saved.deleteMany({ owner: uid });

    res.clearCookie("jwt");
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
};
