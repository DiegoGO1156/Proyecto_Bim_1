import { Router } from "express";
import { minusProductCart, newCart } from "./cartController.js";
import { validatorCarNew, validatorEditCar } from "../middlewares/validator-cart.js";


const router = Router()

router.post(
    "/productos",
    validatorCarNew,
    newCart
)

router.post(
    "/editProductsCar",
    validatorEditCar,
    minusProductCart
)

export default router