//@ts-check
import mongoose from "mongoose";
import { baseSchema } from "../../common/base/base.model.js";

const materialSchema = new mongoose.Schema({
    ...baseSchema,
})
materialSchema.set("toObject", { virtuals: true });
materialSchema.set("toJSON", { virtuals: true });
export const material = mongoose.model("material", materialSchema);