import Users from "../controller/UserController.js";
import { Router } from "express";


const router = Router();

router.post("/register", Users.register);
router.post("/login", Users.login);

export default router;