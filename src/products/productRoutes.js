import { Router } from "express";
import { editDataProductValidator, editPriceProductValidator, editStockProductValidator, getValidatorProductId, validatorRegisterProduct } from "../middlewares/validator-product.js";
import { editPrice, editProductData, editStock, filterProducts, findAllProducts, findProductById, newProduct } from "./productController.js";


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

export default router