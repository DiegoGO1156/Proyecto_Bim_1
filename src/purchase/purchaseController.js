import Carro from "../carrito/cartModel.js"
import PurchaseHistory from "../purchase/purchaseModel.js";
import Producto from "../products/productModel.js"

export const purchaseCart = async (req, res) => {
    try {
        const userId = req.user._id 
        const carrito = await Carro.findOne({ email: userId }).populate("products.product")

        
        if (!carrito || carrito.products.length === 0) {
            return res.status(400).json({
                success: false,
                msg: "El carrito está vacío."
            });
        }
        
        let totalCompra = 0
        let purchaseItems = []
        
        for (let item of carrito.products) {
            let producto = item.product
            
            console.log(carrito)
            if (!producto) {
                return res.status(404).json({
                    success: false,
                    msg: `El producto con ID ${item.product} no existe.`
                })
            }

            let cantidadComprada = item.quantity;

            if (producto.stock < cantidadComprada) {
                return res.status(400).json({
                    success: false,
                    msg: `No hay suficiente stock para el producto: ${producto.name}`
                })
            }

            producto.stock -= cantidadComprada;
            producto.venta += cantidadComprada;
            totalCompra += producto.precio * cantidadComprada

            purchaseItems.push({
                product: producto._id,
                quantity: cantidadComprada,
                precio: producto.precio
            })

            await producto.save()
        }

        const nuevaCompra = new PurchaseHistory({
            user: userId,
            products: purchaseItems,
            total: totalCompra,
        })

        await nuevaCompra.save()

        carrito.products = []
        await carrito.save()

        return res.status(200).json({
            success: true,
            msg: "Compra realizada con éxito.",
            total: totalCompra,
            historial: nuevaCompra
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al procesar la compra.",
            error: err.message
        })
    }
}

export const getHistorial = async(req,res) =>{
    try {

        const userId = req.user._id

        const historialUser = await PurchaseHistory.find({user: userId}).populate("products.product")

        return res.status(200).json({
            success: true,
            historialUser
        })
        
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al buscar el historial de compras",
            error: err.message
        })
    }
}

export const editPurchase = async (req, res) => {
    try {
        const { productName, newQuantity } = req.body;
        const {id} = req.params
        const userId = req.user._id;

        const producto = await Producto.findOne({ name: productName });

        if (!producto) {
            return res.status(404).json({
                success: false,
                msg: "Producto no encontrado en la base de datos."
            });
        }

        const factura = await PurchaseHistory.findOne({_id: id, user:userId});

        if (!factura) {
            return res.status(404).json({
                success: false,
                msg: "Factura no encontrada para este usuario con el producto especificado."
            });
        }

        const item = factura.products.find(p => p.product.toString() === producto._id.toString());

        if (!item) {
            return res.status(404).json({
                success: false,
                msg: "Producto no encontrado en la factura."
            });
        }

        const cantidadDiferencia = newQuantity - item.quantity;

        if (cantidadDiferencia > 0 && producto.stock < cantidadDiferencia) {
            return res.status(400).json({
                success: false,
                msg: `Stock insuficiente para el producto: ${producto.name}`
            });
        }

        producto.stock -= cantidadDiferencia;  
        producto.venta += cantidadDiferencia; 

        if (producto.stock < 0) {
            producto.stock = 0;
        }

        item.quantity = newQuantity;

        factura.total = factura.products.reduce((acc, prod) => {
            const prodDB = prod.product.toString() === producto._id.toString() ? producto : prod;
            return acc + (prod.quantity * prodDB.precio);
        }, 0);
        
        await producto.save(); 
        await factura.save(); 

        return res.status(200).json({
            success: true,
            msg: "Factura actualizada con éxito.",
            factura,
            productoActualizado: {
                stock: producto.stock,
                ventas: producto.ventas
            }
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al actualizar la factura.",
            error: err.message
        });
    }
};
