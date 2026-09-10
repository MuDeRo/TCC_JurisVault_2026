import {Router} from 'express';
import etapasController from '../controllers/etapasController.js';

const etapasRoutes = Router();

etapasRoutes.get('/', etapasController.buscarEtapas);
etapasRoutes.post('/', etapasController.criar);
etapasRoutes.put('/:id', etapasController.editarEtapas);
etapasRoutes.delete('/:id', etapasController.deletarEtapas);

export default etapasRoutes;