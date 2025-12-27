
//@ts-check
import mongoose from "mongoose";
import { baseSchema } from "../../common/base/base.model.js";

const orderMethodSchema = new mongoose.Schema({
    ...baseSchema,
})
orderMethodSchema.set("toObject", { virtuals: true });
orderMethodSchema.set("toJSON", { virtuals: true });
export const orderMethod = mongoose.model('orderMethod', orderMethodSchema);