import { Schema, model } from "mongoose";

const cartSchema = new Schema(
  {
    email: {
      type: Schema.Types.ObjectId,
      ref: "User", 
      required: true,
      unique: true
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Producto", 
          required: true,
        },
        quantity: {
          type: Number,
          required: true
        },
      },
    ],
    status: {
      type: Boolean,
      default: true
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default model("Carro", cartSchema);
