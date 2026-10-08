import { Casos } from "../models/Casos.js";
import casosRepository from '../repositories/casoRepository.js'

const casoController = {

    buscarCasos: async (req, res) => {
        try {
            const result = await casosRepository.buscarTodosCasos();
            res.status(200).json({
                message: 'Casos encontrados com sucesso',
                data: result
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            })
        }
    },

    buscarPrazoProximo: async (req, res) => {
        try {
            const prazos = await casosRepository.buscarPrazosProximos();

            return res.status(200).json(prazos);
        } catch (error) {
            return res.status(500).json({
                mensagem: 'Erro ao buscar prazos próximos.'
            });
        }
    },

    criar: async (req, res) => {
        try {
            const { descricao_caso, numero_cnj } = req.body;

            const caso = Casos.criarCaso({ descricao_caso, numero_cnj });
            const result = await casosRepository.criar(caso);
            res.status(201).json({
                message: 'Caso criado com sucesso',
                data: result
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            })
        }
    },

    editar: async (req, res) => {
        try {
            const { id } = req.params;
            const { descricao_caso, numero_cnj } = req.body;

            const caso = Casos.editarCaso({ id, descricao_caso, numero_cnj });
            const result = await casosRepository.editar(caso);
            res.status(200).json({
                message: 'Caso editado com sucesso',
                data: result
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            })
        }
    },

    deletar: async (req, res) => {
        try {
            const { id } = req.params;

            const result = await casosRepository.deletar(id);
            res.status(200).json({
                message: 'Caso deletado com sucesso',
                data: result
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            })
        }
    }
};

export default casoController;