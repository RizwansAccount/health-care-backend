import express from "express";
import { UserController } from "../controllers/index.js";
import { validate } from "../middleware/index.js";
import { UserValidation } from "../validations/user.validation.js";

const router = express.Router();

router.get('/', UserController.getAll);

router.get('/:id', validate(UserValidation.id.paramsSchema, 'params'), UserController.getById);

router.post('/register', validate(UserValidation.create.bodySchema), UserController.create);

router.put('/:id', validate(UserValidation.update.bodySchema), UserController.update);

router.delete('/:id', validate(UserValidation.id.paramsSchema, 'params'), UserController.delete);

router.post('/login', validate(UserValidation.login.bodySchema), UserController.login);

router.post('/change-password', validate(UserValidation.changePassword.bodySchema), UserController.changePassword);

router.post('/forgot-password', validate(UserValidation.email.bodySchema), UserController.forgotPassword);

router.post('/resend-code', validate(UserValidation.email.bodySchema), UserController.resendCode);

router.post('/verify-code', validate(UserValidation.verifyCode.bodySchema), UserController.verifyCode);

router.post('/new-password', validate(UserValidation.newPassword.bodySchema), UserController.newPassword);

export default router;