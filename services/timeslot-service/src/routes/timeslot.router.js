import express from "express";
import { TimeSlotContainer } from "../controllers/index.js";

const router = express.Router();

router.post('/create', TimeSlotContainer.create);

router.get('/', TimeSlotContainer.getAll);

export default router;