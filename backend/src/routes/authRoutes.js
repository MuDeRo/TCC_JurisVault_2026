import {Routes} from 'express';
import authController from '../controllers/authController.js';

const router = Routes();

router.post('/login/advogado', authController.loginAdvogado);
router.post('/login/admin', authController.loginAdmin);

export default router;