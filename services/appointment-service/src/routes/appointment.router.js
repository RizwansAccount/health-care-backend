import express from "express";
import { AppointmentController } from "../controllers/index.js";

const router = express.Router();

router.post('/create', AppointmentController.create);

router.patch('/update-slot/:id',AppointmentController.updateSlot);

router.patch('/update-status/:id',AppointmentController.updateStatus);

router.get('/', AppointmentController.getAll);

router.get('/:id', AppointmentController.getById);

router.delete('/:id', AppointmentController.delete);

export default router;