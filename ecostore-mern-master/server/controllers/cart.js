import mongoose from "mongoose";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// add a product to a user cart
export const addToCart = async (req, res, next) => {
  const { uid } = req.user;
  const { pid } = req.params;
  try {
    const productExist = await Cart.findOne({
      owner: uid,
      products: {
        $elemMatch: {
          product: pid,
        },
      },
    });

    const product = await Product.findById(pid);
    if (productExist) {
      const updatedCart = await Cart.findOneAndUpdate(
        { owner: uid, "products.product": pid },
        {
          $inc: {
            "products.$.qte": 1,
            "products.$.totalPrice": product.price,
            totalPrice: product.price,
            totalQte: 1,
          },
        },
        { new: true }
      ).populate("products.product");
      return res.status(200).send(updatedCart);
    }

    const updatedCart = await Cart.findOneAndUpdate(
      { owner: uid },
      {
        $push: {
          products: {
            product: mongoose.Types.ObjectId(pid),
            qte: 1,
            totalPrice: product.price,
          },
        },
        $inc: {
          totalPrice: product.price,
          totalQte: 1,
        },
      },
      { new: true }
    ).populate("products.product");
    res.status(200).send(updatedCart);
  } catch (e) {
    next(e);
  }
};

// remove a product to a user cart
export const removeFromCart = async (req, res, next) => {
  const { uid } = req.user;
  const { pid } = req.params;
  try {
    const productExist = await Cart.findOne({
      owner: uid,
      products: {
        $elemMatch: {
          product: pid,
        },
      },
    });

    if (productExist) {
      const itemToRemove = productExist.products.find((item, idx) => {
        if (item.product.toString() == pid) {
          return item;
        }
      });

      const updatedCart = await Cart.findOneAndUpdate(
        { owner: uid },
        {
          $pull: {
            products: { product: pid },
          },
          $inc: {
            totalPrice: -itemToRemove.totalPrice,
            totalQte: -itemToRemove.qte,
          },
        },
        { new: true }
      ).populate("products.product");

      return res.status(200).send(updatedCart);
    }
    const cart = await Cart.findOne({ owner: uid }).populate(
      "products.product"
    );
    res.status(200).send(cart);
  } catch (e) {
    next(e);
  }
};

// increment the quantity of a product on a user cart
export const incQte = async (req, res, next) => {
  const { uid } = req.user;
  const { pid } = req.params;
  try {
    const product = await Product.findById(pid);
    const updatedCart = await Cart.findOneAndUpdate(
      {
        owner: uid,
        "products.product": pid,
      },
      {
        $inc: {
          "products.$.qte": 1,
          "products.$.totalPrice": product.price,
          totalPrice: product.price,
          totalQte: 1,
        },
      },
      { new: true }
    ).populate("products.product");

    res.status(200).send(updatedCart);
  } catch (e) {
    next(e);
  }
};

// decrement the quantity of a product on a user cart
export const decQte = async (req, res, next) => {
  const { uid } = req.user;
  const { pid } = req.params;
  try {
    const product = await Product.findById(pid);

    const productExist = await Cart.findOne({
      owner: uid,
      products: {
        $elemMatch: { product: pid },
      },
    });

    const existedElement = productExist.products.find((item, idx) => {
      if (item.product.toString() == pid) {
        return item;
      }
    });

    if (existedElement.qte > 1) {
      const updatedCart = await Cart.findOneAndUpdate(
        {
          owner: uid,
          "products.product": pid,
        },
        {
          $inc: {
            "products.$.qte": -1,
            "products.$.totalPrice": -product.price,
            totalPrice: -product.price,
            totalQte: -1,
          },
        },
        { new: true }
      ).populate("products.product");
      return res.status(200).send(updatedCart);
    }
    const cart = await Cart.findOne({ owner: uid }).populate(
      "products.product"
    );
    res.status(200).send(cart);
  } catch (e) {
    next(e);
  }
};
