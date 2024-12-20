import mongoose from "mongoose";

const schemaStructure = {
    email: { type: String, required: true, },
    verification_code: { type: String, required: true },
    status: { type: String, required: true, enum: ['verified', 'not-verified'] },
};

const schema = new mongoose.Schema(schemaStructure, { timestamps: true });
const model = mongoose.model('Code', schema);

export const CodeServiceModel = model;