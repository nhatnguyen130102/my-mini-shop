//@ts-check

import mongoose from "mongoose";
import { baseSchema } from "../../common/base/base.model.js";

const cartSchema = new mongoose.Schema({
    ...baseSchema,
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "customer", required: true },
    cartItem: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
        quantity: { type: Number, default: 0, required: true },
        price: { type: Number, default: 0, required: true },
        total: { type: Number, default: 0, required: true },
    }]
})

cartSchema.virtual("customer", { ref: "customer", localField: "customerId", foreignField: "_id", justOne: true });
cartSchema.virtual("product", { ref: "product", localField: "productId", foreignField: "_id", justOne: true });

cartSchema.set("toObject", { virtuals: true });
cartSchema.set("toJSON", { virtuals: true });
export const cart = mongoose.model("cart", cartSchema)