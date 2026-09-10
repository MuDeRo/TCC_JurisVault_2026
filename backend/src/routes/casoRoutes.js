import {Router} from 'express';
import casoController from '../controllers/casosController.js';

const casoRoutes = Router();

casoRoutes.get('/', casoController.buscarCasos);
casoRoutes.post('/', casoController.criar);
casoRoutes.put('/:id', casoController.editar);
casoRoutes.delete('/:id', casoController.deletar);

export default casoRoutes;