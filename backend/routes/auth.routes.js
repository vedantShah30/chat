import { Router } from "express";
import { Signup } from "../controllers/auth/signUp.js";
import { Login } from "../controllers/auth/login.js";
import { LogOut } from "../controllers/auth/logout.js";

const router = Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", LogOut);


export default router;
