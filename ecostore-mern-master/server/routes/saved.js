import { Router } from "express";
import auth from "../middlewares/auth.js";
import { addToSaved, removeFromSaved } from "../controllers/saved.js";
const router = Router();

router.patch("/add/:pid", auth, addToSaved);
router.delete("/remove/:pid", auth, removeFromSaved);

export default router;
