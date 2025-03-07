import { Router } from "express";
import { editPurchase, getHistorial, purchaseCart } from "./purchaseController.js";
import { valueJWT } from "../middlewares/value-jwt.js";




const router = Router()

router.post(
    "/purchaseCart",
    [
        valueJWT
    ],
    purchaseCart
)

router.get(
    "/historyPurchase",
    [
        valueJWT
    ],
    getHistorial
)

router.put(
    "/editPurchase/:id",
    [
        valueJWT
    ],
    editPurchase
)

export default router