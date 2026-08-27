import { Router } from 'express';
import advogadosCasosController from '../controllers/advogadosCasosController.js';

const advogadosCasosRoutes = Router();

advogadosCasosRoutes.get('/', advogadosCasosController.buscarAdvogadosCasos);
advogadosCasosRoutes.post('/', advogadosCasosController.criar);
advogadosCasosRoutes.put('/:id', advogadosCasosController.editar);
advogadosCasosRoutes.delete('/:id', advogadosCasosController.deletar);

export default advogadosCasosRoutes;