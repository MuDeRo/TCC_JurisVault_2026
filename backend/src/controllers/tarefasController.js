import { Tarefas } from '../models/Tarefas.js'
import tarefasRepository from '../repositories/tarefasRepository.js'

const tarefasController = {

    buscarTarefas: async (req, res) => {
        try {
            const result = await tarefasRepository.verTarefas();
            res.status(200).json({
                message: 'Tarefas encontradas:',
                data: result
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorre um erro no servidor', errorMessage: error.message
            })
        }
    },

    criar: async (req, res) => {
        try {
            const { tarefa, descricao_tarefa, id_etapa } = req.body;

            const tarefas = Tarefas.criar({ tarefa, descricao_tarefa, id_etapa });

            const result = await tarefasRepository.criarTarefa(tarefas);
            res.status(200).json({
                message: 'Tarefa criada com sucesso:',
                data: result
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorre um erro no servidor', errorMessage: error.message
            })
        }
    },

    editarTarefas: async (req, res) => {
        try {
            const { id } = req.params;
            const { tarefa, descricao_tarefa, id_etapa } = req.body;

            const tarefas = Tarefas.editar({ id, tarefa, descricao_tarefa, id_etapa });
            const result = await tarefasRepository.editar(tarefas);
            res.status(200).json({
                message: 'Tarefa editada com sucesso',
                data: result
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor', errorMessage: error.message
            })
        }
    },

    deletarTarefas: async (req, res) => {
        try {
            const { id } = req.params;

            const result = await tarefasRepository.deletar(id);
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

export default tarefasController;