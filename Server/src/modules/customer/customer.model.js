//@ts-check

import mongoose from "mongoose";
import { baseSchema } from "../../common/base/base.model.js";

const customerSchema = new mongoose.Schema({
    ...baseSchema,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    customerTypeId: { type: mongoose.Schema.Types.ObjectId, ref: "customerType", required: true },
})

customerSchema.virtual("user", { ref: "user", localField: "userId", foreignField: "_id", justOne: true });
customerSchema.virtual("customerType", { ref: "customerType", localField: "customerTypeId", foreignField: "_id", justOne: true });

customerSchema.set("toObject", { virtuals: true });
customerSchema.set("toJSON", { virtuals: true });
export const customer = mongoose.model("customer", customerSchema)