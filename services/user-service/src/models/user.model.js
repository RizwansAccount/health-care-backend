import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    phone: { type: Number, required: true },
    address: { type: String, required: true },
}, { _id: false });

const schemaStructure = {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['patient', 'doctor'], immutable: true },
    specialization: { type: String },
    contact_details: { type: contactSchema, required: true },
};

const schema = new mongoose.Schema(schemaStructure, { timestamps: true });
const model = mongoose.model('User', schema);

export const UserModel = model;