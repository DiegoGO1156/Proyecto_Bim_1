import { verify } from "argon2"
import User from "./user.model"


export const updateUser = async(req, res) =>{
    try {
        const {id} = req.params
        const {name, username} = req.body

        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({
                success: false, 
                msg: "El usuario no existe"
            })
        }

        if (!name || !username) {
            return res.status(400).json({
                success: false,
                msg: "Llene todos los campos solicitados"
            })
        }
        
        const updateUs = await User.findByIdAndUpdate(id, {name: name}, {username: username}, {new: true})

        return res.status(200).json({
            success: true,
            msg: "DATOS ACTUALIZADOS CON EXITO!!!",
            updateUs
        })


    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al intentar actualizar los datos",
            error: err.message
        })
    }
}