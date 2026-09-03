import { Etapas } from "../models/Etapas";
import etapasRepository from "../repositories/etapasRepository";

const etapasController = {

    buscarEtapas: async (req, res) => {
        try {
            const result = await casosRepository.buscarTodosCasos();
            res.status(200).json({
                message: 'Etapas encontradas com sucesso:', data: result
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorre um erro no servidor', errorMessage: error.message
            })
        }
    },

    criar: async (req, res) => {
        try {
            const { etapa, descricao, id_caso_fk } = req.body;

            const etapas = Etapas.criar({ etapa, descricao, id_caso_fk });

            const result = await etapasRepository.criar(etapas);
            res.status(200).json({
                message: 'Etapa criada com sucesso:', data: result
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorre um erro no servidor', errorMessage: error.message
            })
        }
    },

    editarEtapas: async (req, res) => {
        try {
            const { id } = req.params;
            const { etapa, descricao, id_caso_fk } = req.body;

            const etapas = Etapas.editar({id, etapa, descricao, id_caso_fk});
            const result = await etapasRepository.editar(etapas);
            res.status(200).json({
                message: 'Caso editado com sucesso',
                data: result
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor', errorMessage: error.message
            })
        }
    },

    deletarEtapas: async (req, res) => {
        try {
            const { id } = req.params;

            const result = await etapasRepository.deletar(id);
            res.status(200).json({
                message: 'Etapa deletado com sucesso',
                data: result
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor', errorMessage: error.message
            })
        }
    }
}

export default etapasController;