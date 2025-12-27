//@ts-check

import mongoose from "mongoose";
import { baseSchema } from "../../common/base/base.model.js";

const userSchema = new mongoose.Schema({
    ...baseSchema,
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    fullname: { type: String },
    address: {
        street: { type: String },
        ward: { type: String },
        city: { type: String },
    }
})

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

export const user = mongoose.model("user", userSchema);