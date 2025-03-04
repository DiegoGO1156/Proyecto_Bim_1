import { Router } from "express";
import { minusProductCart, newCart } from "./cartController.js";


const router = Router()

router.post(
    "/productos",
    newCart
)

router.post(
    "/minusProductos",
    minusProductCart
)

export default router