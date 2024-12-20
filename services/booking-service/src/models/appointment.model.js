import mongoose from "mongoose";

const schemaStructure = {
    doctor_id: { type: mongoose.Schema.Types.ObjectId, ref : 'User', required: true, immutable : true },
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref : 'User', required: true, immutable : true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: { type: String, enum: ['pending', 'completed', 'cancelled'], required: true }
};

const schema = new mongoose.Schema(schemaStructure, { timestamps: true });
const model = mongoose.model('Appointment', schema);

export const AppointmentModel = model;