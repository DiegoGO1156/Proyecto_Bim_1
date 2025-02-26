import { Router } from "express";
import { valueJWT } from "../middlewares/value-jwt.js";
import { updateUser } from "./userController.js";
import { check } from "express-validator";
import { notUserExist } from "../helpers/db-validator.js";



const router = Router()


router.put(
    "/updateUser/:id",
    [
        valueJWT,
        check("id", "El ID No es valido").isMongoId(),
        check("id").custom(notUserExist)
    ],
    updateUser
)

export default router