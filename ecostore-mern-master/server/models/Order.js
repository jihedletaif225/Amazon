import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    cart: {
      products: [
        {
          product: {
            type: mongoose.Types.ObjectId,
            ref: "products",
          },
          qte: Number,
          totalPrice: Number,
        },
      ],
      totalQte: Number,
      totalPrice: Number,
    },
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    street: {
      type: String,
      required: true,
    },

    cityCode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("orders", orderSchema);
export default Order;
