import {Router} from 'express';
import tarefasController from '../controllers/tarefasController.js'

const tarefasRoutes = Router();

tarefasRoutes.get('/', tarefasController.buscarTarefas)
tarefasRoutes.post('/', tarefasController.criar)
tarefasRoutes.put('/:id', tarefasController.editarTarefas)
tarefasRoutes.delete('/:id', tarefasController.deletarTarefas)

export default tarefasRoutes;