import { Router } from "express";
import { signup, signin, logout } from "../controllers/auth.js";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.delete("/logout", logout);

export default router;
