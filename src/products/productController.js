import Category from "../category/categoryModel.js"
import Producto from "./productModel.js"


export const newProduct = async(req, res) =>{
    try {
        const data = req.body

        const categoryFind = await Category.findOne({nameCategory: data.category})

        const productCreate = await Producto.create({
            name: data.name,
            description: data.description,
            precio: data.precio,
            stock: data.stock,
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

        const products = await Producto.find(filter).sort(order).populate("category", "nameCategory")

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

export const editProductData = async(req, res) =>{
    try {
        const {id} = req.params
        const {name, description, category}  = req.body

        const findCategory = await Category.findOne({nameCategory: category})

        const editNewProduct = await Producto.findByIdAndUpdate(id, {name: name, description: description, category: findCategory._id}, {new: true}).populate("category", "nameCategory")

        return res.status(200).json({
            success: true,
            msg: "PRODUCTO EDITADO CON EXITO!!!",
            editNewProduct
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al editar el producto",
            error: err.message
        })
    }
}

export const editStock = async (req, res) =>{
    try {
        
        const {id} = req.params
        const {stock} = req.body

        const stockUpdate = await Producto.findByIdAndUpdate(id, {stock: stock}, {new: true})

        return res.status(200).json({
            success: true, 
            msg: "STOCK ACTUALIZADO CON EXITO",
            stockUpdate
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al editar el stock del producto",
            error: err.message
        })
    }
}
export const editPrice = async (req, res) =>{
    try {
        
        const {id} = req.params
        const {precio} = req.body

        const priceUpdate = await Producto.findByIdAndUpdate(id, {precio: precio}, {new: true})

        return res.status(200).json({
            success: true, 
            msg: "PRECIO ACTUALIZADO CON EXITO",
            priceUpdate
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al editar el precio del producto",
            error: err.message
        })
    }
}

export const deleteProduct = async (req, res) =>{
    try {

        const {id} = req.params

        const deleteProduct = await Producto.findByIdAndUpdate(id, {stock: stock}, {new: true})

        return res.status(200).json({
            success: true,
            msg: "PRODUCTO ELIMINADO CON EXITO!!!",
            deleteProduct
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al eliminar el producto",
            error: err.message
        })
    }
}

export const getOutStock = async(req, res) =>{
    try {
        const notStock = await Producto.find({ stock: 0 });

        return res.status(200).json({
            success: true,
            notStock
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al listar productos sin Stock",
            error: err.message
        })
    }
}