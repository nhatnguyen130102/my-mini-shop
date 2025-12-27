//@ts-check

import mongoose from "mongoose";
import { baseSchema } from "../../common/base/base.model.js";

const iconSchema = new mongoose.Schema({
    ...baseSchema,
    iconName: { type: String, required: true }
})
iconSchema.set("toObject", { virtuals: true });
iconSchema.set("toJSON", { virtuals: true });
export const icon = mongoose.model("icon", iconSchema)