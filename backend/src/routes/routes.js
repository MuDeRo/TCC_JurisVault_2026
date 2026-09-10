import { Router } from "express";

import authRoutes from "./authRoutes.js";
import advogadoRoutes from "./advogadoRoutes.js";
import administradorRoutes from "./administradorRoutes.js";
import advogadosCasosRoutes from "./advogadosCasosRoutes.js";
import casoRoutes from "./casoRoutes.js";
import arquivoRoutes from "./arquivoRoutes.js";
import etapasArquivosRoutes from "./etapasArquivosRoutes.js";

const router = Router();


router.use('/etapasArquivos', etapasArquivosRoutes);
router.use('/advogadosCasos', advogadosCasosRoutes);
router.use('/advogado', advogadoRoutes);
router.use('/administrador', administradorRoutes);
router.use('/casos', casoRoutes);
router.use('/arquivo', arquivoRoutes);
router.use('/auth', authRoutes);


export default router;