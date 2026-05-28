import { Router } from 'express';

import adminController from '../controllers/adminController.js';

import authAdmin from '../middlewares/authAdmin.js';

const adminRoutes = Router();


// listar advogados pendentes
adminRoutes.get('/pendentes', authToken, authAdmin, adminController.listarPendentes);
// aprovar advogado
adminRoutes.patch('/aprovar/:id', authToken, authAdmin, adminController.aprovarAdvogado);
// negar advogado
adminRoutes.patch('/negar/:id', authToken, authAdmin, adminController.negarAdvogado);

export default adminRoutes;
