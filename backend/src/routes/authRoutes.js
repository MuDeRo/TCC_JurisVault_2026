import {Router} from 'express';
import authController from '../controllers/authController.js';

const router = Router();

router.post('/login/advogado', authController.loginAdvogado);
router.post('/login/admin', authController.loginAdmin);


export default router;