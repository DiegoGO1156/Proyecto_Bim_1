import { Router } from "express";
import { valueJWT } from "../middlewares/value-jwt.js";
import { updatePassword, updateRoleAdmin, updateUser } from "./userController.js";
import { check } from "express-validator";
import { notUserExist } from "../helpers/db-validator.js";
import { tieneRole } from "../middlewares/tiene-role.js";
import { validarCampos } from "../middlewares/validar-campos.js";



const router = Router()


router.put(
    "/updateUser/:id",
    [
        valueJWT,
        check("id", "El ID No es valido").isMongoId(),
        check("id").custom(notUserExist),
        validarCampos
    ],
    updateUser
)

router.put(
    "/updatePassword/:id",
    [
        valueJWT,
        check("id", "El ID No es valido").isMongoId(),
        check("id").custom(notUserExist),
        validarCampos
    ],
    updatePassword
)

router.put(
    "/updateRole/:id",
    [
        valueJWT,
        tieneRole("ADMIN"),
        check("id", "El ID No es valido").isMongoId(),
        check("id").custom(notUserExist),
        validarCampos
    ],
    updateRoleAdmin
)


export default router