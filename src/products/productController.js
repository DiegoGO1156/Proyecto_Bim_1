import Category from "../category/categoryModel"
import Producto from "./productModel"


export const newProduct = async(req, res) =>{
    try {
        const data = req.body

        const categoryFind = await Category.findOne({nameCategory: data.category})

        const productCreate = await Producto.create({
            name: data.name,
            description: data.description,
            precio: data.precio,
            stock: data.stock,
            venta: data.venta,
            category: categoryFind._id
        })

        return res.status(201).json({
            success: true,
            msg: "PRODUCTO CREADO CON EXITO!!!",
            productCreate
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al crear el producto",
            error: err.message
        })
    }
}

export const findProductById = async(req, res) =>{
    try {
        const {id} = req.params
        const findProduct = await Producto.findById(id)

        return res.status(200).json({
            success: true,
            findProduct
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al buscar el producto por ID",
            error: err.message
        })
    }
}

export const findAllProducts = async (req, res) =>{
    try {
        const{limite = 10, desde = 0} = req.query
        const query = {status: true}

        const [total, productos] = await Promise.all([
            Producto.countDocuments(query),
            Producto.find(query).skip(Number(desde)).limit(Number(limite))
        ])

        return res.status(200).json({
            success: true,
            total,
            productos
        })

    } catch (err) {
        return res.status(500).json({
            success: false, 
            msg: "Erro al Buscar todos los productos",
            error: err.message
        })
    }
}

export const filterProducts = async (req, res) =>{
    try {
        let {name, precio, stock, venta, category, sort} = req.query

        let filter = {}
        if(name) filter.name = {$regex: name, $options: "i"}
        if(precio) filter.precio = Number(precio)
        if(stock) filter.stock = Number(stock)
        if(venta) filter.venta = Number(venta)
        if(category) filter.category = category

        let order = {}
        if(sort === "asc") order.name = 1
        if(sort === "desc") order.name = -1

        order.precio = 1
        order.stock = 1
        order.vent = 1
        order.category = 1

        const products = await Producto.find(filter).sort(order).poputale("category", "nameCategory")

        return res.status(200).json({
            success: true,
            products
        })

    } catch (err) {
        return res.status(500).json({
            success: false, 
            msg: "Error al filtrar los productos",
            error: err.message
        })
    }
}