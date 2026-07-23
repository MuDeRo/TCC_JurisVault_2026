import { Router } from "express";
import authRoutes from "./authRoutes.js";
import advogadoRoutes from "./advogadoRoutes.js";
import administradorRoutes from "./administradorRoutes.js";
const router = Router();


router.use('/auth', authRoutes);
router.use('/advogado', advogadoRoutes);
router.use('/administrador', administradorRoutes);

export default router;