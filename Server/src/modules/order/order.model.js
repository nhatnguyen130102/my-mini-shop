//@ts-check

import mongoose from "mongoose";
import { baseSchema } from "../../common/base/base.model.js";

const orderSchema = new mongoose.Schema({
    ...baseSchema,
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "customer", required: true },
    orderItem: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
        quantity: { type: Number, default: 0, required: true },
        price: { type: Number, default: 0, required: true },
        total: { type: Number, default: 0, required: true },
    }],
    orderMethodId: { type: mongoose.Schema.Types.ObjectId, ref: "orderMethod", required: true },
    paymentMethodId: { type: mongoose.Schema.Types.ObjectId, ref: "paymentMethod", required: true },
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "employee", required: true },
    voucherId: { type: mongoose.Schema.Types.ObjectId, ref: "voucher", required: false },
})

orderSchema.virtual("voucher", { ref: "voucher", localField: "voucherId", foreignField: "_id", justOne: true });
orderSchema.virtual("customer", { ref: "customer", localField: "customerId", foreignField: "_id", justOne: true });
orderSchema.virtual("orderMethod", { ref: "orderMethod", localField: "orderMethodId", foreignField: "_id", justOne: true });
orderSchema.virtual("paymentMethod", { ref: "paymentMethod", localField: "paymentMethodId", foreignField: "_id", justOne: true });
orderSchema.virtual("employee", { ref: "employee", localField: "employeeId", foreignField: "_id", justOne: true });
orderSchema.virtual("product", { ref: "product", localField: "productId", foreignField: "_id", justOne: true });

orderSchema.set("toObject", { virtuals: true });
orderSchema.set("toJSON", { virtuals: true });
export const order = mongoose.model("order", orderSchema)