import { model, Schema } from "mongoose";


export const productoModel = Schema({
    name:{
        type:String,
        require: true,
        unique: true
    },
    description:{
        type:String,
        require: true
    },
    precio:{
        type: Number,
        require: true
    },
    stock:{
        type: Number,
        require: true
    },
    venta:{
        type: Number, 
        default: 0
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: "Category",
        require: true
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

export default model("Producto  ", productoModel)