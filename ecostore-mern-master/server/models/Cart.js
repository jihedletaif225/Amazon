import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
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
  { timestamps: true }
);

const Cart = mongoose.model("carts", cartSchema);
export default Cart;
