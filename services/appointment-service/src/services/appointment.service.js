import mongoose from "mongoose";
import { AppointmentModel, TimeSlotModel } from "../../../../models/index.js";

export const AppointMentService = {
    getAll: async (user_id) => {

        let searchPipeline = [
            {
                $lookup: {
                    from: 'users',
                    localField: 'patient_id',
                    foreignField: '_id',
                    as: 'patient'
                }
            },
            {
                $unwind: '$patient'
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'doctor_id',
                    foreignField: '_id',
                    as: 'doctor'
                }
            },
            {
                $unwind: '$doctor'
            },
            {
                $project: {
                    'patient_id': 0,
                    'doctor_id': 0,
                    'patient.password': 0,
                    'doctor.password': 0,
                }
            }
        ];

        if (user_id) {
            searchPipeline.unshift({
                $match: {
                    $or: [{ patient_id: new mongoose.Types.ObjectId(user_id) }, { doctor_id: new mongoose.Types.ObjectId(user_id) }]
                }
            })
        };

        return await AppointmentModel.aggregate(searchPipeline);
    },

    getById: async (id) => {
        const appointment = await AppointmentModel.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(id) }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'patient_id',
                    foreignField: '_id',
                    as: 'patient'
                }
            },
            {
                $unwind: '$patient'
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'doctor_id',
                    foreignField: '_id',
                    as: 'doctor'
                }
            },
            {
                $unwind: '$doctor'
            },
            {
                $project: {
                    'patient_id': 0,
                    'doctor_id': 0,
                    'patient.password': 0,
                    'doctor.password': 0,
                }
            }
        ]);
        return appointment?.[0];
    },

    create: async (body) => {
        
        const { doctor_id, patient_id, slot_id } = body;
        const timeSlot = await TimeSlotModel.findOne({ _id: slot_id, doctor_id });

        if (!timeSlot) { throw new Error('Time slot not found'); };

        if (timeSlot.status !== 'available') { throw new Error('Time slot is not available') };

        const appointment = await AppointmentModel.create({
            doctor_id : doctor_id,
            patient_id : patient_id,
            date: timeSlot.date,
            time: timeSlot.time,
            status: 'pending',
        });

        timeSlot.status = 'booked';
        timeSlot.patient_id = patient_id;
        await timeSlot.save();

        return appointment;
    },

    updateSlot: async (id, body) => {
        const { slot_id } = body;
        const appointment = await AppointmentModel.findById(id);
        if (!appointment) {
            throw new Error("Appointment not found");
        };

        if (appointment.status === "completed") {
            throw new Error("you cannot update now, because doctor accepted the appointment you need to cancel your appointment");
        };

        const currentSlot = await TimeSlotModel.findOne({
            doctor_id: appointment.doctor_id,
            date: appointment.date,
            time: appointment.time,
        });
        const newSlot = await TimeSlotModel.findById(slot_id);

        if (!newSlot || newSlot.status !== 'available') {
            throw new Error('time slot is not available');
        };

        appointment.date = newSlot.date;
        appointment.time = newSlot.time;
        await appointment?.save();

        currentSlot.status = 'available';
        currentSlot.patient_id = null;
        await currentSlot.save();

        newSlot.status = 'booked';
        newSlot.patient_id = appointment.patient_id;
        await newSlot.save();

        return appointment;

    },

    updateStatus: async (id, body) => {
        return await AppointmentModel.findByIdAndUpdate(id, body);
    },

    delete: async (id) => {
        return await AppointmentModel.findByIdAndUpdate(id, { status: 'cancelled' });
    },
};