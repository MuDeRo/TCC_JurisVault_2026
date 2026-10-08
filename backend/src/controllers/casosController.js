import CasoRepository from '../repositories/casoRepository.js';

const CasosController = {
    
    
    async criar(req, res) {
        try {

            
            // O frontend deve enviar um JSON com essas 4 chaves
            const { caso, requerente, requerido, advogadoCaso } = req.body;

            // Validação básica para evitar estourar erro no banco
            if (!caso || !requerente || !requerido || !advogadoCaso) {
                return res.status(400).json({ 
                    erro: "Dados incompletos. Certifique-se de enviar caso, requerente, requerido e advogadoCaso." 
                });
            }

            
            const resultado = await CasoRepository.criarCasoCompleto(caso, requerente, requerido, advogadoCaso);
            
            return res.status(201).json({
                mensagem: "Caso cadastrado com sucesso!",
                dados: resultado
            });

        } catch (error) {
            console.error("Erro no CasosController.criar:", error);
            return res.status(500).json({ erro: error.message });
        }
    },

    
    async buscarPorId(req, res) {
        try {
            const { id } = req.params; // Pega o ID da URL

            const dadosCaso = await CasoRepository.buscarCasoPorId(id);

            if (!dadosCaso) {
                return res.status(404).json({ erro: "Caso não encontrado." });
            }

            return res.status(200).json(dadosCaso);

        } catch (error) {
            console.error("Erro no CasosController.buscarPorId:", error);
            return res.status(500).json({ erro: error.message });
        }
    },

    
    async listarPorAdvogado(req, res) {
        try {
            const { idAdvogado } = req.params;

            const listaCasos = await CasoRepository.listarCasosPorAdvogado(idAdvogado);

            return res.status(200).json(listaCasos);

        } catch (error) {
            console.error("Erro no CasosController.listarPorAdvogado:", error);
            return res.status(500).json({ erro: error.message });
        }
    },

    
    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { caso, requerente, requerido, advogadoCaso } = req.body;

            if (!caso || !requerente || !requerido || !advogadoCaso) {
                return res.status(400).json({ 
                    erro: "Dados incompletos para atualização." 
                });
            }

            const resultado = await CasoRepository.atualizarCasoCompleto(id, caso, requerente, requerido, advogadoCaso);

            return res.status(200).json(resultado);

        } catch (error) {
            console.error("Erro no CasosController.atualizar:", error);
            return res.status(500).json({ erro: error.message });
        }
    },

    
    async deletar(req, res) {
        try {
            const { id } = req.params;

            const resultado = await CasoRepository.deletarCasoCompleto(id);

            return res.status(200).json(resultado);

        } catch (error) {
            console.error("Erro no CasosController.deletar:", error);
            return res.status(500).json({ erro: error.message });
        }
    },

    async listarTodosCasos(req, res) {
        try {
            const listaCasos = await CasoRepository.selecionarTodosCasos();
            return res.status(200).json(listaCasos);
        } catch (error) {
            console.error("Erro no CasosController.listarTodosCasos:", error);
            return res.status(500).json({ erro: error.message });
        }
    }
};

export default CasosController;