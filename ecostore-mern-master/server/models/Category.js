import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  products: [
    {
      type: mongoose.Types.ObjectId,
      ref: "products",
    },
  ],
});

const Category = mongoose.model("categories", categorySchema);
export default Category;
