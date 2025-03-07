import { Router } from "express";
import { editDataProductValidator, editPriceProductValidator, editStockProductValidator, getValidatorProductId, validatorRegisterProduct } from "../middlewares/validator-product.js";
import { deleteProduct, editPrice, editProductData, editStock, filterProducts, findAllProducts, findProductById, getOutStock, newProduct } from "./productController.js";
import { check } from "express-validator";


const router = Router()

router.post(
    "/newProduct",
    validatorRegisterProduct,
    newProduct
)

router.get(
    "/findProduct/:id",
    getValidatorProductId,
    findProductById
)

router.get(
    "/allProducts",
    findAllProducts
)

router.get(
    "/filter",
    filterProducts  
)

router.put(
    "/editData/:id",
    editDataProductValidator,
    editProductData
)

router.put(
    "/editStock/:id",
    editStockProductValidator,
    editStock
)

router.put(
    "/editPrice/:id",
    editPriceProductValidator,
    editPrice
)

router.get(
    "/getOutStock",
    getOutStock
)

router.delete(
    "/deleteProduct/:id",
    [
        check("id", "ingrese un ID validao").isMongoId(),
        check("id", "ingrese un ID").notEmpty()
    ],
    deleteProduct
)

export default router