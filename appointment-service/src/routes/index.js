import express from "express";
import appointmentRoute from './appointment.router.js'

const protectedRouter = express.Router();

protectedRouter.use(appointmentRoute);

export { protectedRouter };