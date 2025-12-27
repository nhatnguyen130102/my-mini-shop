//@ts-check

import mongoose from "mongoose";
import { baseSchema } from "../../common/base/base.model.js";

const employeeSchema = new mongoose.Schema({
    ...baseSchema,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    isManager: { type: Boolean, default: false }
})

employeeSchema.virtual("user", { ref: "user", localField: "userId", foreignField: "_id", justOne: true });

employeeSchema.set("toObject", { virtuals: true });
employeeSchema.set("toJSON", { virtuals: true });
export const employee = mongoose.model("employee", employeeSchema)