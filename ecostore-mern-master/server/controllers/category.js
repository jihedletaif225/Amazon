import Category from "../models/Category.js";
import Product from "../models/Product.js";

// Get all categories
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).send(categories);
  } catch (e) {
    next(e);
  }
};

// Get a single category
export const getCategory = async (req, res, next) => {
  const { cid } = req.params;
  try {
    const category = await Category.findById(cid, { image: 0 }).populate(
      "products"
    );
    res.status(200).send(category);
  } catch (e) {
    next(e);
  }
};

// Get a single product
export const getProduct = async (req, res, next) => {
  const { pid } = req.params;
  try {
    const product = await Product.findById(pid);
    res.status(200).send(product);
  } catch (e) {
    next(e);
  }
};

// Search for products
export const getSearchProducts = async (req, res, next) => {
  const { search } = req.query;
  try {
    const products = await Product.find({
      $or: [
        {
          title: { $regex: search, $options: "i" },
        },
        {
          description: { $regex: search, $options: "i" },
        },
        {
          "category.title": { $regex: search, $options: "i" },
        },
      ],
    }).populate("category");
    res.status(200).send(products);
  } catch (e) {
    next(e);
  }
};
