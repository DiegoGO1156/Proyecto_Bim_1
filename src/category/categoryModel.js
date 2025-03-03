import { model, Schema } from "mongoose";



export const categoryModel = Schema({
    nameCategory:{
        type: String,
        required: true
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

export default model("Category", categoryModel)