import { TimeSlotModel, UserModel } from "../../../../models/index.js";
import moment from "moment";

export const TimeSlotService = {
    getAll: async () => {
        return await TimeSlotModel.find();
    },

    getById: async (id) => {
        return await TimeSlotModel.findOne({ _id: id });
    },

    create: async (doctorId, body) => {
        const { startDate, endDate, startTime, endTime, slotDuration } = body;

        const isDoctor = await UserModel.findOne({_id : doctorId, role : 'doctor'});

        if(!isDoctor) {
            throw new Error("sorry! you don't have permission to create slots");
        }

        const overlappingSlots = await TimeSlotModel.find({ doctor_id : doctorId, date: { $gte: startDate, $lte: endDate } });

        if (overlappingSlots?.length > 0) {
            throw new Error('Time slots already exist in this specific date range');
        };

        const startDateMoment = moment(startDate, 'YYYY-MM-DD');
        const endDateMoment = moment(endDate, 'YYYY-MM-DD');

        if (!startDateMoment.isValid() || !endDateMoment.isValid() || startDateMoment.isAfter(endDateMoment)) {
            throw new Error('Invalid date range');
        }

        const duration = parseInt(slotDuration, 10);

        const allSlots = [];

        for (let currentDate = startDateMoment; currentDate.isSameOrBefore(endDateMoment); currentDate.add(1, 'days')) {
            const start = moment(startTime, 'hh:mm A');
            const end = moment(endTime, 'hh:mm A');

            if (!start.isValid() || !end.isValid() || start.isSameOrAfter(end)) {
                throw new Error(`Invalid time range for ${currentDate.format('YYYY-MM-DD')}`);
            }

            let currentTime = start;
            while (currentTime.isBefore(end)) {
                const slot = { doctor_id: doctorId, date: currentDate.format('YYYY-MM-DD'), time: currentTime.format('hh:mm A'), status: 'available' };
                allSlots.push(slot);
                currentTime.add(duration, 'minutes');
            }
        };

        return await TimeSlotModel.insertMany(allSlots);
    },

    update: async (id, body) => {
        return await TimeSlotModel.findByIdAndUpdate(id, body);
    },

    delete: async (id) => {
        return await TimeSlotModel.findByIdAndDelete(id);
    },
    getDoctorSlots: async (doctorId, status, date) => {
        let searchQuery = { doctor_id: doctorId };
        if (status) {
            searchQuery = { ...searchQuery, status }
        }
        if (date) {
            searchQuery = { ...searchQuery, date }
        }
        return await TimeSlotModel.find(searchQuery);
    },
};