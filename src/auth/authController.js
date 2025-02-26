import { hash, verify } from "argon2"
import User from '../user/user.model.js'
import { generarJWT } from "../helpers/generar-JWT.js"


export const registerUser = async(req, res) =>{
    try {
        const {name, username, email, password} = req.body
        
        const encryptPass = await hash(password)
        
        const user = await User.create({
            name: name,
            username: username,
            email: email,
            password: encryptPass
        })

        return res.status(201).json({
            success: true,
            msg: "USUARIO REGISTRADO CON EXITO!!!",
            user
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al registrarse",
            error: err.message
        })
    }
}

export const loginUser = async (req, res) =>{
    try {
        const {email, username, password} = req.body

        const lowerEmail = email ? email.toLowerCase() : null
        const lowerUsername = username ? username.toLowerCase() : null

        const user = await User.findOne({
            $or: [{email: lowerEmail}, {username: lowerUsername}]
        })

        if(!user){
            return res.status(404).json({
                success: false,
                msg: "Credenciales incorrectas"
            })
        }

        if(!user.status){
            return res.status(400).json({
                success:false,
                msg: "El usuario fue eliminado | status: false"
            })
        }

        const validPass = await verify(user.password, password)

        if(!validPass){
            return res.status(401).json({
                success:false,
                msg: "Contraseña incorrecta"
            })
        }

        const token = await generarJWT(user.id)
        const saludo = user.username

        return res.status(200).json({
            success: true,
            msg: `BIENVENIDO ${saludo}`,
            token: token
        })


    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al intentar hacer login",
            error: err.message
        })
    }
}