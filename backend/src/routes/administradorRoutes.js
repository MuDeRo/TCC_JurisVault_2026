import { Router } from 'express';

import adminController from '../controllers/adminController.js';

import authAdmin from '../middlewares/authAdmin.js';
import authMiddleware from '../middlewares/authToken.js';

const adminRoutes = Router();


// listar advogados pendentes
adminRoutes.get('/pendentes', authMiddleware, authAdmin, adminController.listarPendentes);
//listar advogados aprovados
adminRoutes.get('/aprovados', authMiddleware, authAdmin, adminController.selecionarAprovados);
// aprovar advogado
adminRoutes.patch('/aprovar/:id', authMiddleware, authAdmin, adminController.aprovarAdvogado);
// negar advogado
adminRoutes.patch('/negar/:id', authMiddleware, authAdmin, adminController.negarAdvogado);
export default adminRoutes;