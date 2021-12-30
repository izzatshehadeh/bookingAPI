import express, {  Router } from "express";
import JWT from "../middlewares/JWT";
import UserController from "../controllers/user"

const router = Router();

router.get('/user', [JWT.authenticateJWT, UserController.getUser]);

export default router;

