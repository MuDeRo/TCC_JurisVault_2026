import { AdvogadosCasos } from "../models/AdvogadosCasos.js";
import advogadosCasosRepository from "../repositories/advogadosCasosRepository.js";

const advogadosCasosController = {

    buscarAdvogadosCasos: async (req, res) => {
        try {
            const result = await advogadosCasosRepository.buscarTodosAdvogadosCasos();

            res.status(200).json({
                message: 'Registros encontrados com sucesso',
                data: result
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });

        }
    },

    criar: async (req, res) => {
        try {

            const {
                id_advogado_fk,
                id_caso_fk,
                cep_caso,
                rua_caso
            } = req.body;

            const advogadoCaso = AdvogadosCasos.criarAdvogadoCaso({
                id_advogado_fk,
                id_caso_fk,
                cep_caso,
                rua_caso
            });

            const result = await advogadosCasosRepository.criar(advogadoCaso);

            res.status(201).json({
                message: 'Registro criado com sucesso',
                data: result
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });

        }
    },

    editar: async (req, res) => {
        try {

            const { id } = req.params;

            const {
                id_advogado_fk,
                id_caso_fk,
                cep_caso,
                rua_caso
            } = req.body;

            const advogadoCaso = AdvogadosCasos.editarAdvogadoCaso({
                id,
                id_advogado_fk,
                id_caso_fk,
                cep_caso,
                rua_caso
            });

            const result = await advogadosCasosRepository.editar(advogadoCaso);

            res.status(200).json({
                message: 'Registro editado com sucesso',
                data: result
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });

        }
    },

    deletar: async (req, res) => {
        try {

            const { id } = req.params;

            const result = await advogadosCasosRepository.deletar(id);

            res.status(200).json({
                message: 'Registro deletado com sucesso',
                data: result
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });

        }
    }

};

export default advogadosCasosController;