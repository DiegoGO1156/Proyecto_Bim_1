import Category from "../category/categoryModel.js"
import Producto from "../products/productModel.js"
import Role from "../role/role.model.js"
import User from "../user/user.model.js"

export const rolValido = async (role = '') =>{
    const rolExistente = await Role.findOne({role})
    if(!rolExistente){
        throw new Error (`El rol ${role}, no existe en la base de datos`)
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

export const notExistCategory = async (nameCategory = "") =>{
    const existCateg = await Category.findOne({nameCategory})
    if(!existCateg){
        throw new Error (`La categoria ${nameCategory} no existe`)
    }
}

export const nullCategory = async(id = "") =>{
    const category = await Category.findById(id)
    if(!category){
        throw new Error (`El ID ${id} no pertenece a ninguna categoria`)
    }
}

export const nullProduct = async(id = "") =>{
    const productId = await Producto.findById(id)
    if(!productId){
        throw new Error (`El ID ${id} no pertenece a ningun producto`)
    }
}

export const existProduct = async (name = "") =>{
    const productExist = await Producto.findOne({name})
    if(productExist){
        throw new Error (`El nombre ${name} ya pertenece a otro producto`)
    }
}

export const existUsername = async(username = "") =>{
    const userExist = await User.findOne({username})
    if(userExist){
        throw new Error (`El username: ${username} pertenece a otro usuario`)
    }
}

export const isAdmin = async(id = "")=>{
    const admin = await User.findById(id)
    if(admin.email === "admin@gmail.com"){
        throw new Error(`El Administrador no puede eliminar su cuenta`)
    }
}

export const isDefaultCategory = async (id = "") =>{
    const isCategory = await Category.findById(id)
    if(isCategory.nameCategory === "Uncategorized"){
        throw new Error (`No se puede eliminar la categoria por defecto`)
    }
}