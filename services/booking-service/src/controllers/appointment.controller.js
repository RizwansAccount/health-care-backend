import { AppointMentService } from "../services/index.js";
import { httpResponse } from "../../../../utils/index.js";

export const AppointmentController = {
    getAll: async (req, res) => {
        try {
            const user_id = req.query.user_id;
            const data = await AppointMentService.getAll(user_id);
            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, {}, (error.message || error));
        }
    },
    getById: async (req, res) => {
        try {
            const id = req.params.id;
            const data = await AppointMentService.getById(id);
            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, {}, (error.message || error));
        }
    },
    create: async (req, res) => {
        try {
            const body = req.body;
            const data = await AppointMentService.create(body);
            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, {}, (error));
        }
    },
    updateSlot: async (req, res) => {
        try {
            const id = req.params.id;
            const body = req.body;
            const data = await AppointMentService.updateSlot(id, body);
            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, {}, (error.message || error));
        }
    },
    updateStatus: async (req, res) => {
        try {
            const id = req.params.id;
            const body = req.body;
            const data = await AppointMentService.updateStatus(id, body);
            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, {}, (error.message || error));
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const data = await AppointMentService.delete(id);
            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, {}, (error.message || error));
        }
    },

};