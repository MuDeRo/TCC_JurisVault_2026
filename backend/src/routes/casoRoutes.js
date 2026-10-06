import {Router} from 'express';
import CasosController from '../controllers/casosController.js';

const casoRoutes = Router();

casoRoutes.get('/:id', CasosController.buscarPorId);
casoRoutes.get('/', CasosController.listarTodosCasos);
casoRoutes.post('/', CasosController.criar);
casoRoutes.put('/:id', CasosController.atualizar);
casoRoutes.delete('/:id', CasosController.deletar);


export default casoRoutes;