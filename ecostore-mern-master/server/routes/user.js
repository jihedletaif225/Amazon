import { Router } from "express";
import { getUser, deleteUser } from "../controllers/user.js";
import auth from "../middlewares/auth.js";
const router = Router();

router.get("/user", auth, getUser);
router.delete("/user", auth, deleteUser);

export default router;
