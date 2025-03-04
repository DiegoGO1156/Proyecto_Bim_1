import Producto from "../products/productModel.js";
import User from "../user/user.model.js"
import Carro from "./cartModel.js"

export const newCart = async (req, res) => {
    try {
        const { user, productos, quantity } = req.body;

        const findEmail = await User.findOne({ email: user });
        const findProduct = await Producto.findOne({ name: productos });

        let carrito = await Carro.findOne({ email: findEmail._id });

        if (!carrito) {
            carrito = new Carro({ email: findEmail._id, products: [] });
        }

        const addProduct = carrito.products.findIndex(p => p.product.equals(findProduct._id));

        if (addProduct !== -1) {
            carrito.products[addProduct].quantity += quantity;
        } else {
            carrito.products.push({ product: findProduct._id, quantity });
        }

        await carrito.save();

        return res.status(201).json({
            success: true,
            msg: "PRODUCTOS AÑADIDOS CON ÉXITO!",
            carrito
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al cargar el carrito con productos",
            error: err.message
        });
    }
};


export const minusProductCart = async(req, res) =>{
    try {
        
        const { user, productos, quantity } = req.body;

        const findEmail = await User.findOne({ email: user });
        const findProduct = await Producto.findOne({ name: productos });

        let carrito = await Carro.findOne({ email: findEmail._id });

        if (!carrito) {
            return res.status(404).json({
                msg:"El carrito esta vacio"
            })
        }

        const minusProduct = carrito.products.findIndex(p => p.product.equals(findProduct._id));

        if (minusProduct === -1) {
            return res.status(404).json({
                success: false,
                msg: "El producto no está en el carrito",
            });
        }

        if(quantity === 0){
            carrito.products.splice(minusProduct, 1);
        }else{
            carrito.products[minusProduct].quantity = quantity;
        }

        await carrito.save()

        return res.status(200).json({
            success: true,
            msg: "CARRITO ACTUALIZADO CON EXITO!!!",
            carrito
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al restar un producto del carrito de compras",
            error: err.message
        })
    }
}
