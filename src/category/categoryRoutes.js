import { Router } from "express";
import { deleteCategory, editCategory, getCategories, newCategory } from "./categoryController.js";
import { deleteValidatorCategory, validatorEditCategory, validatorRegisterCategory } from "../middlewares/validator-category.js";



const router = Router()

router.post(
    "/newCategory",
    validatorRegisterCategory,
    newCategory
)

router.get(
    "/listCategory",
    getCategories
)

router.put(
    "/editCategory/:id",
    validatorEditCategory,
    editCategory
)

router.delete(
    "/deleteCategory/:id",
    deleteValidatorCategory,
    deleteCategory
)

export default router