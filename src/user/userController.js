import { verify, hash } from "argon2"
import User from "./user.model.js"


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
        
        const updateUs = await User.findByIdAndUpdate(id, {name: name, username: username}, {new: true})

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

export const updatePassword = async (req, res) =>{
    try {
        const {id} = req.params
        const {oldPassword, newPassword} = req.body
        
        const user = await User.findById(id)

        if(oldPassword === newPassword){
            return res.status(409).json({
                success: false,
                msg: "La contraseña nueva no puede ser igual a la anterior"
            })
        }
        
        const validPass = await verify(user.password, oldPassword)

        if(!validPass){
            return res.status(401).json({
                msg: "Verifique la contraseña actual"
            })
        }

        const upPass = await hash(newPassword)
        user.password = upPass
        await user.save()

        return res.status(200).json({
            success: true,
            msg: "CONTRASEÑA ACTUALIZADA CON EXITO!!!",
            user
        })

    } catch (err) {
        return res.status(500).json({
            success: false, 
            msg: "Error al actualizar contraseña",
            error: err.message
        })
    }
}

export const updateRoleAdmin = async(req, res) =>{
    try {
        const {id} = req.params

        const {role} = req.body

        const user = await User.findByIdAndUpdate(id, {role: role}, {new: true})

        return res.status(200).json({
            success: true,
            msg: "CAMBIO DE ROL REALIZADO CON EXITO!!!",
            user
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al intentar cambiar de Rol al usuario escogido",
            error: err.message
        })
    }
}

export const deleteUserProfile = async (req, res) =>{
    try {
        
        const {id} = req.params
        const {password} = req.body
        
        const userFind = await User.findById(id)

        const validPassword = await verify(userFind.password, password)

        if(!validPassword){
            return res.status(401).json({
                success: false,
                msg: "Contraseña Incorrecta"
            })
        }

        const deleteProfile = await User.findByIdAndUpdate(id, {status: false}, {new: true})

        return res.status(200).json({
            success: true,
            msg: "PERFIL ELIMINADO CON EXITO",
            deleteProfile
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al intentar eliminar el perfil",
            error: err.message
        })
    }
}