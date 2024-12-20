import mongoose, { Schema } from "mongoose";

const schemaStructure = {
    doctor_id: { type: mongoose.Schema.Types.ObjectId, ref : 'User', required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: { type: String, enum: ['available', 'booked', 'cancelled'], required: true }
};

const schema = new mongoose.Schema(schemaStructure, { timestamps: true });
const model = mongoose.model('TimeSlot', schema);

export const TimeSlotModel = model;