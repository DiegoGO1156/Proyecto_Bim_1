import { model, Schema } from "mongoose";


export const userModel = Schema({
    name:{
        type: String,
        required: [true, "El nombre es requerido"]
    },
    username: {
        type: String,
        required: [true, "El username es requerido"]
    },
    email:{
        type: String,
        required: [true, "El email es requerido"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "La contraseña es requerida"]
    },
    role:{
        type: String,
        required: true,
        enum: ["ADMIN", "CLIENT"],
        default: "CLIENT"
    },
    status:{
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true,
        versionKey: false
    }
)

export default model ("User", userModel)