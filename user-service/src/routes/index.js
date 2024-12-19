import express from "express";
import userRoute from './user.route.js'

// routes

const protectedRouter = express.Router();
const unProtectedRouter = express.Router();

// Protected Routes
// protectedRouter.use();

// Un-Protected Routes
unProtectedRouter.use(userRoute);

export { protectedRouter, unProtectedRouter };