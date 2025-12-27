
//@ts-check
import mongoose from "mongoose";
import { baseSchema } from "../../common/base/base.model.js";

const userRoleSchema = new mongoose.Schema({
    ...baseSchema,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'roles', required: true }
})

userRoleSchema.virtual("user", { ref: "user", localField: "userId", foreignField: "_id", justOne: true });
userRoleSchema.virtual("role", { ref: "role", localField: "roleId", foreignField: "_id", justOne: true });

userRoleSchema.set("toObject", { virtuals: true });
userRoleSchema.set("toJSON", { virtuals: true });
export const userRole = mongoose.model('userRole', userRoleSchema);