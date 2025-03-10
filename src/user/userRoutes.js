import { Router } from "express";
import { valueJWT } from "../middlewares/value-jwt.js";
import { deleteUserProfile, updatePassword, updateRoleAdmin, updateUser } from "./userController.js";
import { check } from "express-validator";
import { notUserExist } from "../helpers/db-validator.js";
import { tieneRole } from "../middlewares/tiene-role.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validatorDeleteUser, validatorUpdateDataUser, validatorUpdatePasswordUser, validatorUpdateRole } from "../middlewares/validator-user.js";



const router = Router()


router.put(
    "/updateUser/:id",
    validatorUpdateDataUser,
    updateUser
)

router.put(
    "/updatePassword/:id",
    validatorUpdatePasswordUser,
    updatePassword
)

router.put(
    "/updateRole/:id",
    validatorUpdateRole,
    updateRoleAdmin
)

router.delete(
    "/deleteUser/:id",
    validatorDeleteUser,
    deleteUserProfile
)


export default router