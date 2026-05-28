import { Router } from "express";
import authController from "../controllers/authController.js";

const authRoutes = Router();


authRoutes.post('/login', authController.login);
authRoutes.post('/register', authController.register);


authRoutes.get('/users', authToken, authController.users);

export default authRoutes;