import { body } from "express-validator";
import { validarCampos } from "./validar-campos.js";
import { correoExiste } from "../helpers/db-validator.js";


export const registerValidator =[
    body("name", "El nombre es requerido").not().isEmpty(),
    body("username", "El username es requerido").not().isEmpty(),
    body("email", "Ingrese un correo valido").isEmail(),
    body("email").custom(correoExiste),
    body("password", "La contraseña debe tener minimo 8 caracteres").isLength({min: 8}),
    validarCampos
]

export const loginValidator =[
    body("email").optional().isEmail().withMessage("Ingresa una direccion de correo valida"),
    body("username").optional().isString().withMessage("Ingrese un username valido"),
    body("password", "La contraseña debe tener minimo 8 caracteres").isLength({min:8}),
    validarCampos
]