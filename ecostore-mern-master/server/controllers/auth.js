import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
import Saved from "../models/Saved.js";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";

dotenv.config();
// Define vars
const JWT_SECRET = process.env.JWT_SECRET;
const cookieOpts = {
  maxAge: 1000 * 999999,
};

// Create a token
export const newToken = (uid) => {
  const token = jwt.sign({ uid }, JWT_SECRET);
  return token;
};

// Signup a user
export const signup = async (req, res, next) => {
  const body = req.body;
  try {
    const user = await User.signup(body);

    const saved = await Saved.findOne({ owner: user._id }).populate("products");

    const cart = await Cart.findOne({ owner: user._id }).populate(
      "products.product"
    );

    const orders = await Order.find({ owner: user._id }).populate(
      "cart.products.product"
    );

    const token = newToken(user._id);
    req.session.jwt = token;
    res.status(201).send({ user, saved, cart, orders });
  } catch (e) {
    next(e);
  }
};

// Signin a user
export const signin = async (req, res, next) => {
  const body = req.body;
  try {
    const user = await User.signin(body);

    const saved = await Saved.findOne({ owner: user._id }).populate("products");
    const cart = await Cart.findOne({ owner: user._id }).populate(
      "products.product"
    );
    const orders = await Order.find({ owner: user._id }).populate(
      "cart.products.product"
    );

    const token = newToken(user._id);
    req.session.jwt = token;
    res.status(200).send({ user, saved, cart, orders });
  } catch (e) {
    next(e);
  }
};

// Logout a user
export const logout = async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        res.status(401).send({ error: "You cannot logout!" });
      }
    });
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
};
