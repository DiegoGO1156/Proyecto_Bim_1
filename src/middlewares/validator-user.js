import { existUsername, isAdmin, notUserExist, rolValido } from "../helpers/db-validator.js";
import { tieneRole } from "./tiene-role.js";
import { validarCampos } from "./validar-campos.js";
import { valueJWT } from "./value-jwt.js";
import { body, param } from "express-validator"




export const validatorUpdateDataUser = [
    valueJWT,
    param("id").custom(notUserExist),
    param("id", "Ingrese un ID valido").isMongoId(),
    body("name", "Llene el campo de name").notEmpty(),
    body("username", "Llene el campo de username").notEmpty(),
    body("username").custom(existUsername),
    validarCampos
]

export const validatorUpdatePasswordUser = [
    valueJWT,
    param("id").custom(notUserExist),
    param("id", "Ingrese un ID valido").isMongoId(),
    body("oldPassword", "Ingrese la contraseña actual").notEmpty(),
    body("newPassword", "Ingrese su nueva contraseña").notEmpty(),
    body("newPassword", "La nueva contraseña debe tener un minimo de 8 caracteres").isLength({min: 8}),
    validarCampos
]

export const validatorUpdateRole = [
    valueJWT,
    tieneRole("ADMIN"),
    param("id").custom(notUserExist),
    param("id", "Ingrese un ID valido").isMongoId(),
    param("id").custom(notUserExist),
    param("id", "Ingrese un ID valido").isMongoId(),
    validarCampos
]

export const validatorDeleteUser = [
    valueJWT,
    param("id").custom(notUserExist),
    param("id").custom(isAdmin),
    param("id", "Ingrese un ID valido").isMongoId(),
    body("password", "Ingrese su contraseña, para eliminar su perfil").notEmpty(),
    validarCampos
]