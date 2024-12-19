import { AppointmentModel } from "../models/index.js";

export const AppointMentService = {
    getAll: async () => {
        return await AppointmentModel.find();
    },

    getById: async (id) => {
        return await AppointmentModel.findOne({ _id: id });
    },

    create: async (body) => {
        return await AppointmentModel.create(body);
    },

    update: async (id, body) => {
        return await AppointmentModel.findByIdAndUpdate(id, body);
    },

    delete: async (id) => {
        return await AppointmentModel.findByIdAndDelete(id);
    },
};