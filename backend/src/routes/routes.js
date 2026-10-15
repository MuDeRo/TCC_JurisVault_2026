import { Router } from "express";

import etapasArquivosRoutes from "./etapasArquivoRoutes.js";
import advogadosCasosRoutes from "./advogadosCasosRoutes.js";

import administradorRoutes from "./administradorRoutes.js";
import advogadoRoutes from "./advogadoRoutes.js";
import authRoutes from "./authRoutes.js";

import casoRoutes from "./casoRoutes.js";
import etapasRoutes from "./etapasRoutes.js";
import tarefasRoutes from "./tarefasRoutes.js";
import arquivosRoutes from "./arquivosRoutes.js";

const router = Router();


router.use('/auth', authRoutes);
router.use('/advogado', advogadoRoutes);
router.use('/administrador', administradorRoutes);
router.use('/etapasArquivos', etapasArquivosRoutes);
router.use('/advogadosCasos', advogadosCasosRoutes);
router.use('/casos', casoRoutes);
router.use('/etapas', etapasRoutes);
router.use('/tarefas', tarefasRoutes);
router.use('/arquivos', arquivosRoutes);


export default router;