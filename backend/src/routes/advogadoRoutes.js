import { Router } from 'express';
import advogadoController from '../controllers/advogadoController.js';
import authToken from '../middlewares/authToken.js';

const advogadoRoutes = Router();

// Rota Pública: Permite que um novo advogado solicite a criação de conta
advogadoRoutes.post('/cadastro', advogadoController.cadastrar);

// Rotas Privadas: Exigem token JWT para manipulação dos próprios dados
advogadoRoutes.get('/perfil', authToken, advogadoController.selecionar);
advogadoRoutes.put('/atualizar/:id', authToken, advogadoController.editar);
export default advogadoRoutes;