import { Router } from "express";
import {
  getCategories,
  getCategory,
  getProduct,
  getSearchProducts,
} from "../controllers/category.js";

const router = Router();

router.get("/categories", getCategories);
router.get("/category/:cid", getCategory);
router.get("/product/:pid", getProduct);
router.get("/search", getSearchProducts);

export default router;
