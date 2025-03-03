import Category from "../category/categoryModel.js"
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

export const existCategory = async (nameCategory = "") =>{
    const existCateg = await Category.findOne({nameCategory})
    if(existCateg){
        throw new Error (`La categoria ${nameCategory} ya existe`)
    }
}

export const nullCategory = async(id = "") =>{
    const category = await Category.findById(id)
    if(!category){
        throw new Error (`El ID ${id} no pertenece a ninguna categoria`)
    }
}