import { Router } from "express";
import {
  addToCart,
  decQte,
  incQte,
  removeFromCart,
} from "../controllers/cart.js";
import auth from "../middlewares/auth.js";
const router = Router();

router.patch("/add/:pid", auth, addToCart);
router.delete("/remove/:pid", auth, removeFromCart);
router.patch("/increment/:pid", auth, incQte);
router.patch("/decrement/:pid", auth, decQte);

export default router;
