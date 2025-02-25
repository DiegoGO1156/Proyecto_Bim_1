import { valueJWT } from "./value-jwt";
import {body} from "express-validator"

export const updateValdator =[
    valueJWT,
    body("name", "El nombre es requerido").not().isEmpty(),
    body("username", "El username es requerido").not().isEmpty()
]