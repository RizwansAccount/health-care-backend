import express from "express";
import { TimeSlotController } from "../controllers/index.js";

const router = express.Router();

router.post('/:doctorId/create', TimeSlotController.create);

router.get('/', TimeSlotController.getAll);

router.get('/:id', TimeSlotController.getById);

router.get('/doctor-timeslots/:doctorId', TimeSlotController.getDoctorSlots);

router.patch('/:id', TimeSlotController.update);

router.delete('/:id', TimeSlotController.delete);

export default router;