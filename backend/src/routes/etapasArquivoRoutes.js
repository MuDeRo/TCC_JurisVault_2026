import {Router} from 'express';
import etapasArquivosController from '../controllers/etapasArquivosController.js';

const etapasArquivosRoutes = Router();

etapasArquivosRoutes.post('/', etapasArquivosController.criar);
etapasArquivosRoutes.put('/:id', etapasArquivosController.editar);
etapasArquivosRoutes.delete('/:id', etapasArquivosController.deletar);
etapasArquivosRoutes.get('/', etapasArquivosController.selecionar);
etapasArquivosRoutes.get('/:id', etapasArquivosController.selecionarPorId);

export default etapasArquivosRoutes;