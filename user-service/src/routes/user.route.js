import express from "express";
import { UserController } from "../controllers/user.controller.js";

const router = express.Router();

router.get('/', UserController.getAll);

router.get('/:id', UserController.getById);

router.post('/', UserController.create);

router.put('/:id', UserController.update);

router.delete('/:id', UserController.delete);

router.post('/login', UserController.login);

router.post('/change-password', UserController.changePassword);

router.post('/forgot-password', UserController.forgotPassword);

router.post('/resend-code', UserController.resendCode);

router.post('/verify-code', UserController.verifyCode);

router.post('/new-password', UserController.newPassword);

export default router;