import { Router } from "express";
import authRouter from "./auth";
import usersRouter from "./user";
import serviceprovierRouter from "./serviceprovier";

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/auth', authRouter);
routes.use('/services', serviceprovierRouter);



export default routes;

