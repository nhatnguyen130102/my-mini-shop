
//@ts-check
import mongoose from "mongoose";
import { baseSchema } from "../../common/base/base.model.js";

const paymentMethodSchema = new mongoose.Schema({
    ...baseSchema,
})
paymentMethodSchema.set("toObject", { virtuals: true });
paymentMethodSchema.set("toJSON", { virtuals: true });
export const paymentMethod = mongoose.model('paymentMethod', paymentMethodSchema);