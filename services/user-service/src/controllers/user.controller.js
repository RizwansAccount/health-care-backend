import { UserService } from "../services/index.js";
import { httpResponse } from "../../../../utils/index.js";

export const UserController = {
    getAll: async (req, res) => {
        try {
            const data = await UserService.getAll();
            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, {}, (error.message || error));
        }
    },
    getById: async (req, res) => {
        try {
            const id = req.params.id;
            const data = await UserService.getById(id);
            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, {}, (error.message || error));
        }
    },
    create: async (req, res) => {
        try {
            const body = req.body;
            const data = await UserService.create(body);
            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, {}, (error.message || error));
        }
    },
    login: async (req, res) => {
        try {
            const body = req.body;
            const data = await UserService.login(body);
            return httpResponse.SUCCESS(res, data, 'logged in successfully!');
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, {}, (error.message || error));
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id;
            const body = req.body;
            const data = await UserService.update(id, body);
            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, {}, (error.message || error));
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const data = await UserService.delete(id);
            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, {}, (error.message || error));
        }
    },
    changePassword: async (req, res) => {
        try {
            const body = req.body;
            const data = await UserService.changePassword(body);
            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, {}, (error.message || error));
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const body = req.body;
            const data = await UserService.forgotPassword(body);
            return httpResponse.SUCCESS(res, data, "Please check your email for the verification code we just sent you.");
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, {}, (error.message || error));
        }
    },
    resendCode: async (req, res) => {
        try {
            const body = req.body;
            const data = await UserService.resendCode(body);
            return httpResponse.SUCCESS(res, data, "Please check your email for the verification code we just sent you.");
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, {}, (error.message || error));
        }
    },
    verifyCode: async (req, res) => {
        try {
            const body = req.body;
            const data = await UserService.verifyCode(body);
            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, {}, (error.message || error));
        }
    },
    newPassword: async (req, res) => {
        try {
            const body = req.body;
            const data = await UserService.newPassword(body);
            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, {}, (error.message || error));
        }
    },

};