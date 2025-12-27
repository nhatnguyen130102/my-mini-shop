//@ts-check

import mongoose from "mongoose";
import { baseSchema } from "../../common/base/base.model.js";

const colorSchema = new mongoose.Schema({
    ...baseSchema,
    colorCode: { type: String, require: true }
})
colorSchema.set("toObject", { virtuals: true });
colorSchema.set("toJSON", { virtuals: true });
export const color = mongoose.model("color", colorSchema)