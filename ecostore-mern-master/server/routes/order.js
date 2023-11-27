import { Router } from "express";
import { addOrder, getOrders, getOrder } from "../controllers/order.js";
import auth from "../middlewares/auth.js";
const router = Router();

router.post("/add", auth, addOrder);
router.get("/orders", auth, getOrders);
router.get("/order/:oid", auth, getOrder);

export default router;
