import express from "express";
import appointmentRoute from './appointment.router.js';
import timeslotRoute from './timeslot.router.js';

const protectedRouter = express.Router();

protectedRouter.use('/appointments', appointmentRoute);
protectedRouter.use('/timeslots', timeslotRoute);

export { protectedRouter };