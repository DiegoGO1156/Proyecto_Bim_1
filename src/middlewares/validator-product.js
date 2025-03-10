import { existProduct, notExistCategory, nullProduct } from "../helpers/db-validator.js";
import { tieneRole } from "./tiene-role.js";
import { validarCampos } from "./validar-campos.js";
import { valueJWT } from "./value-jwt.js";
import {body, param} from "express-validator"


export const validatorRegisterProduct = [
    valueJWT,
    tieneRole("ADMIN"),
    body("name", "Ingrese un nombre para el producto").notEmpty(),
    body("name").custom(existProduct),
    body("description", "Ingrese una descripcion para el producto").notEmpty(),
    body("description", "El minimo de descripcion es de 30 caracteres").isLength({min: 20}),
    body("precio", "Ingrese el precio para el producto").notEmpty().isFloat({ gt: 0 }).withMessage("El precio debe ser mayor que cero"),
    body("stock", "Ingrese una catidad de productos existentes").notEmpty().isFloat({ gt: 0 }).withMessage("El stock debe ser mayor que cero"),
    body("category", "Ingrese un categoria para el producto").notEmpty(),
    body("category").custom(notExistCategory),
    validarCampos
]

export const getValidatorProductId = [
    param("id", "Ingrese un ID valido para la peticion").isMongoId(),
    param("id").custom(nullProduct),
    validarCampos
]

export const editDataProductValidator = [
    valueJWT,
    tieneRole("ADMIN"),
    body("name", "Ingrese el nuevo nombre del producto").notEmpty(),
    body("name").custom(existProduct),
    body("description", "Ingrese una descripcion para el producto").notEmpty(),
    body("description", "El minimo de descripcion es de 30 caracteres").isLength({min: 30}),
    body("category", "Ingrese la categoria nueva").notEmpty(),
    body("category").custom(notExistCategory),
    validarCampos
]

export const editStockProductValidator = [
    valueJWT,
    tieneRole("ADMIN"),
    param("id", "Ingrese un ID valido").isMongoId(),
    param("id").custom(nullProduct),
    body("stock", "Ingrese una catidad de productos existentes").notEmpty().isFloat({ gt: 0 }).withMessage("El stock debe ser mayor que cero"),
    validarCampos
]

export const editPriceProductValidator = [
    valueJWT,
    tieneRole("ADMIN"),
    param("id", "Ingrese un ID valido").isMongoId(),
    param("id").custom(nullProduct),
    body("precio", "Ingrese el nuevo precio").notEmpty().isFloat({ gt: 0 }).withMessage("El precio debe ser mayor que cero"),
    validarCampos
]