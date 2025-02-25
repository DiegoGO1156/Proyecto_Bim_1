import { model, Schema } from "mongoose";


export const roleModel = Schema({
    role:{
        type: String,
        required: [true, "El rol es requerido"]
    }
})

export default model("Role", roleModel)