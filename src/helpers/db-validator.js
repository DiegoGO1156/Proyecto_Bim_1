import Role from "../role/role.model.js"
import User from "../user/user.model.js"


export const roleValido = async (role = "") =>{
    const roleExist = Role.findOne({role: role})
    if(!roleExist){
        throw new Error (`El rol ${role}, existe en la base de Datos`)
    }
}

export const correoExiste = async (email = '') =>{
    const correoExist = await User.findOne({email})
    
    if(correoExist){
        throw new Error (`El correo ${email} ya está en uso`)
    }
}

export const notUserExist = async (id = "") =>{
    const user = await User.findById(id)
    if(!user){
        throw new Error (`El ID ${id} no pertenece a ningun usuario`)
    }
}