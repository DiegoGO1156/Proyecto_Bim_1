import { Schema, model } from "mongoose";

const purchaseSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    products: [
        {
            product: { 
                type: Schema.Types.ObjectId, 
                ref: "Producto", 
                required: true 
            
            },
            quantity: {
                 type: Number, 
                required: true 
            },
            precio: {
                 type: Number, 
                required: true 
            }, 
        }
    ],
    total: {
         type: Number, 
        required: true 
    },
    date: {
         type: Date, 
        default: Date.now 

    }
},
    { 
        timestamps: true,
        versionKey: false
    }
);

export default model("PurchaseHistory", purchaseSchema);
