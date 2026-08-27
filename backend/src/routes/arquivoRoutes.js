import { Router } from "express";
import arquivoController from "../controllers/arquivoController.js";
import uploadFiles from "../middlewares/uploadFiles.js";

const arquivoRoutes = Router();

arquivoRoutes.get('/', arquivoController.selecionarTodos);
arquivoRoutes.post('/', uploadFiles, arquivoController.criar);
arquivoRoutes.get('/:id', arquivoController.selecionarPorId);
arquivoRoutes.put('/:id', uploadFiles, arquivoController.editar);
arquivoRoutes.delete('/:id', arquivoController.deletar);

export default arquivoRoutes;