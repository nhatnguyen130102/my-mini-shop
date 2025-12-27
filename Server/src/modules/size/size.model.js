
//@ts-check
import mongoose from "mongoose";
import { baseSchema } from "../../common/base/base.model.js";

const sizeSchema = new mongoose.Schema({
    ...baseSchema,
})
sizeSchema.set("toObject", { virtuals: true });
sizeSchema.set("toJSON", { virtuals: true });
export const size = mongoose.model('size', sizeSchema);