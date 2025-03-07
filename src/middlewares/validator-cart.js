import { validarCampos } from "./validar-campos.js";
import { valueJWT } from "./value-jwt.js";
import { body } from "express-validator"



export const validatorCarNew = [
    valueJWT,
    body("quantity", "Ingrese la cantidad de productos que desea").notEmpty().isFloat({gt: 0}).withMessage("La cantidad debe ser mayor a 0"),
    validarCampos
]

export const validatorEditCar = [
    valueJWT,
    body("quantity", "Ingrese la cantidad de productos que desea").notEmpty(),
    validarCampos
]