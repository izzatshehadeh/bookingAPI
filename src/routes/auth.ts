import { Application, Request, Response , Router } from "express";
import AuthController from "../controllers/auth";

const router = Router();

router.post('/login', AuthController.login);
router.post('/signup', AuthController.signup);

export default router;
