import express from "express";
import { AppointmentController } from "../controllers/index.js";

const router = express.Router();

router.post('/create', AppointmentController.create);

router.patch('/:id',AppointmentController.update);

router.get('/', AppointmentController.getAll);

router.get('/:id', AppointmentController.getById);

export default router;