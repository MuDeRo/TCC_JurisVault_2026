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
            const { tarefa, descricao_tarefa, id_etapa, status } = req.body;

            const tarefas = Tarefas.criar({ tarefa, descricao_tarefa, id_etapa, status });

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
            const { tarefa, descricao_tarefa, id_etapa, status } = req.body;

            const tarefas = Tarefas.editar({ id, tarefa, descricao_tarefa, id_etapa, status });
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
    },

    buscarTarefasPorEtapa: async (req, res) => {
        try {
            const { idEtapa } = req.params;
            const result = await tarefasRepository.buscarTarefasPorEtapa(idEtapa);
            res.status(200).json({
                message: 'Tarefas encontradas:',
                data: result
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor', errorMessage: error.message
            });
        }
    },

    atualizarStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const result = await tarefasRepository.atualizarStatus(id, status);
            res.status(200).json({
                message: 'Status da tarefa atualizado com sucesso',
                data: result
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor', errorMessage: error.message
            });
        }
    }
}

export default tarefasController;