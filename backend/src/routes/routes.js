import { Router } from "express";
import authRoutes from "./authRoutes.js";
import advogadoRoutes from "./advogadoRoutes.js";
import administradorRoutes from "./administradorRoutes.js";
import advogadosCasosRoutes from "./advogadosCasosRoutes.js";
import casoRoutes from "./casoRoutes.js";
const router = Router();


router.use('/auth', authRoutes);
router.use('/advogado', advogadoRoutes);
router.use('/administrador', administradorRoutes);
router.use('/advogadosCasos', advogadosCasosRoutes);
router.use('/casos', casoRoutes);


export default router;