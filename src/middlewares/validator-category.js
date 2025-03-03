import { body, param } from "express-validator";
import { valueJWT } from "./value-jwt.js";
import { existCategory, nullCategory } from "../helpers/db-validator.js";
import { validarCampos } from "./validar-campos.js";
import { tieneRole } from "./tiene-role.js";



export const validatorRegisterCategory = [
    valueJWT,
    tieneRole("ADMIN"),
    body("nameCategory", "Ingrese un nombre para la categoria").notEmpty(),
    body("nameCategory").custom(existCategory),
    validarCampos
]

export const validatorEditCategory = [
    valueJWT,
    tieneRole("ADMIN"),
    param("id", "Ingrese un Id valido").notEmpty(),
    param("id").custom(nullCategory),
    body("name", "Ingrese un nombre para la categoria").notEmpty(),
    body("name").custom(existCategory),
    validarCampos
]

export const deleteValidatorCategory = [
    valueJWT,
    tieneRole("ADMIN"),
    param("id", "Ingrese un Id valido").notEmpty(),
    param("id").custom(nullCategory),
    validarCampos
]