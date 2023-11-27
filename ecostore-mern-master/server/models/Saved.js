import mongoose from "mongoose";

const savedSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    products: [
      {
        type: mongoose.Types.ObjectId,
        ref: "products",
      },
    ],
  },
  { timestamps: true }
);

const Saved = mongoose.model("saves", savedSchema);
export default Saved;
