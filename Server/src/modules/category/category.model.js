//@ts-check

import mongoose from "mongoose";
import { baseSchema } from "../../common/base/base.model.js";

const categorySchema = new mongoose.Schema({
    ...baseSchema,
})
categorySchema.set("toObject", { virtuals: true });
categorySchema.set("toJSON", { virtuals: true });
export const category = mongoose.model("category", categorySchema)