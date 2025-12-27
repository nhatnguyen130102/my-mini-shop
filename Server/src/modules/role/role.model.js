
//@ts-check
import mongoose from "mongoose";
import { baseSchema } from "../../common/base/base.model.js";

const roleSchema = new mongoose.Schema({
    ...baseSchema,
    permission: { type: mongoose.Schema.Types.Mixed }
})
roleSchema.set("toObject", { virtuals: true });
roleSchema.set("toJSON", { virtuals: true });
export const role = mongoose.model('role', roleSchema);