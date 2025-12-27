
//@ts-check
import mongoose from "mongoose";
import { baseSchema } from "../../common/base/base.model.js";

const voucherSchema = new mongoose.Schema({
    ...baseSchema,
    type: { type: String, required: true, default: "percentage" },
    value: { type: Number, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    status: { type: String, required: true, default: "active" },
    minimumOrder: { type: Number, required: true, default: 0 },
    maximumDiscount: { type: Number }
})

voucherSchema.set("toObject", { virtuals: true });
voucherSchema.set("toJSON", { virtuals: true });    

export const voucher = mongoose.model('vouchers', voucherSchema);