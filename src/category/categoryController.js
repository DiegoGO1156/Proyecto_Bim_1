import Producto from "../products/productModel.js"
import Category from "./categoryModel.js"


export const newCategory = async (req, res) =>{
    try {
        
        const {nameCategory} = req.body

        const categoryNew = await Category.create({
            nameCategory: nameCategory
        })

        return res.status(201).json({
            success: true,
            msg: "CATEGORIA CREADA CON EXITO!!!",
            categoryNew
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al crear Categoria",
            error: err.message
        })
    }
}

export const getCategories = async (req, res) =>{
    try {
        const {limite = 10, desde = 0} = req.query
        const query = {status: true}

        const [total, categorias] = await Promise.all([
            Category.countDocuments(query),
            Category.find(query).skip(Number(desde)).limit(Number(limite))
        ])

        return res.status(200).json({
            success:true,
            total,
            categorias
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al listar las categorias",
            error: err.message
        })
    }
}

export const editCategory = async (req, res) =>{
    try {
        const {id} = req.params
        const {name} = req.body

        const editCateg = await Category.findByIdAndUpdate(id, {nameCategory: name}, {new: true})

        return res.status(201).json({
            success: true,
            msg: "CATEGORIA ACTUALIZADA CON EXITO!!!",
            editCateg
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al actualizar la categoria",
            error: err.message
        })
    }
}

export const deleteCategory = async (req, res) =>{
    try {
        const {id} = req.params

        const notDelete = await Category.findById(id)
        if(notDelete.nameCategory === "Uncategorized"){
            return res.status(401).json({
                success: false,
                msg: "No puedes eliminar esta categoria"
            })
        }

        const defaultCateg = await Category.findOne({ nameCategory: "Uncategorized" });


        await Category.findByIdAndUpdate(id, {status: false})
        await Producto.updateMany({category: id}, {category: defaultCateg._id})

        return res.status(200).json({
            success: true,
            msg: "CATEGORIA ELIMINADA CON EXITO!!!"
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al Eliminar categoria",
            error: err.message
        })
    }
}