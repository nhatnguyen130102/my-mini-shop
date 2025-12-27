//@ts-check
import mongoose from "mongoose";
import { baseSchema } from "../../common/base/base.model.js";

const sidebarSchema = new mongoose.Schema({
    ...baseSchema,
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: "sidebar", default: null },
    path: { type: String, required: true },
    sort: { type: Number, required: true },
    level: { type: Number, required: true },
    iconId: { type: mongoose.Schema.Types.ObjectId, ref: "icon", required: true }
})

sidebarSchema.virtual("sidebar", { ref: "sidebar", localField: "parentId", foreignField: "_id", justOne: true });
sidebarSchema.virtual("icon", { ref: "icon", localField: "iconId", foreignField: "_id", justOne: true });

sidebarSchema.set("toObject", { virtuals: true });
sidebarSchema.set("toJSON", { virtuals: true });
export const sidebar = mongoose.model('sidebar', sidebarSchema);