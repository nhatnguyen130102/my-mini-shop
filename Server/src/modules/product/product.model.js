//@ts-check
import mongoose from "mongoose";
import { baseSchema } from "../../common/base/base.model.js"
const productSchema = new mongoose.Schema({
    ...baseSchema,
    price: { type: Number, default: 0, require: true, },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "category", require: true },
    colorId: { type: mongoose.Schema.Types.ObjectId, ref: "color", require: true },
    sizeId: { type: mongoose.Schema.Types.ObjectId, ref: "size", require: true },
    materialId: { type: mongoose.Schema.Types.ObjectId, ref: "material", require: true },
})

productSchema.virtual("size", { ref: "size", localField: "sizeId", foreignField: "_id", justOne: true });
productSchema.virtual("color", { ref: "color", localField: "colorId", foreignField: "_id", justOne: true });
productSchema.virtual("material", { ref: "material", localField: "materialId", foreignField: "_id", justOne: true });
productSchema.virtual("category", { ref: "category", localField: "categoryId", foreignField: "_id", justOne: true });

productSchema.set("toObject", { virtuals: true });
productSchema.set("toJSON", { virtuals: true });

export const product = mongoose.model("product", productSchema)
