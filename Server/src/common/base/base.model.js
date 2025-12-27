export const baseSchema = {
    name: { type: String, required: true, trim: true, maxlength: 160 },
    code: { type: String, required: true, trim: true, maxlength: 160 },
    createdAt: {type: String, default: () => new Date().toISOString()},
    updatedAt: {type: String, default: () => new Date().toISOString()},
    createdBy: { type: String },
    updatedBy: { type: String },
    description: { type: String },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true }
};
