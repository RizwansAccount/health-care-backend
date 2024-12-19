import express from "express";
import { AppointmentController } from "../controllers/index.js";

const router = express.Router();

router.post('/create', AppointmentController.create);

router.get('/', AppointmentController.getAll);

export default router;