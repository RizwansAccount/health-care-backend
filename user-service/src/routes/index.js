import express from "express";
import userRoute from './user.route.js'

const unProtectedRouter = express.Router();

unProtectedRouter.use(userRoute);

export { unProtectedRouter };