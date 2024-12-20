import express from "express";
import timeSlotRoute from './timeslot.router.js'

const protectedRouter = express.Router();

protectedRouter.use(timeSlotRoute);

export { protectedRouter };