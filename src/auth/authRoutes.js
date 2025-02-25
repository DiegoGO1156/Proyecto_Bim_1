import { Router } from "express";
import { loginUser, registerUser } from "./authController.js";
import { loginValidator, registerValidator } from "../middlewares/validator-auth.js";



const router = Router()

router.post(
    "/register",
    registerValidator,
    registerUser
)

router.post(
    "/login",
    loginValidator,
    loginUser
)

export default router;