//@ts-check

import mongoose from "mongoose";
import { baseSchema } from "../../common/base/base.model.js";

const customerTypeSchema = new mongoose.Schema({
    ...baseSchema,
})

customerTypeSchema.set("toObject", { virtuals: true });
customerTypeSchema.set("toJSON", { virtuals: true });
export const customerType = mongoose.model("customerType", customerTypeSchema)