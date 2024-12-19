import { TimeSlotModel } from "../models/index.js";

export const TimeSlotService = {
    getAll: async () => {
        return await TimeSlotModel.find();
    },

    getById: async (id) => {
        return await TimeSlotModel.findOne({ _id: id });
    },

    create: async (body) => {
        return await TimeSlotModel.create(body);
    },

    update: async (id, body) => {
        return await TimeSlotModel.findByIdAndUpdate(id, body);
    },

    delete: async (id) => {
        return await TimeSlotModel.findByIdAndDelete(id);
    },
};