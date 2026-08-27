import { Arquivos } from "../models/Arquivos.js";
import arquivoRepository from "../repositories/arquivoRepository.js";



const arquivoController = {
    criar: async (req, res) => {
        try {

            const descricao_arquivo  = String(req.body.descricao_arquivo);
            const vinculo_arquivo = `/files/arquivos/${req.file.filename}`;

            const arquivo = Arquivos.criarArquivo({
                vinculo_arquivo,
                descricao_arquivo
            });

            

            const result = await arquivoRepository.criar(arquivo);

            res.status(200).json({
                message: 'Arquivo inserido com sucesso ✅',
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

            const id = Number(req.params.id)

            const result = await arquivoRepository.deletar(id);
            

            return res.status(200).json({
                message: 'Arquivo excluido com sucesso!'
            })

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

            const id = Number(req.params.id)
            const { descricao_arquivo } = req.body;
            const vinculo_arquivo = `/files/arquivos/${req.file.filename}`;

            const arquivo = Arquivos.editarArquivo({
                vinculo_arquivo,
                descricao_arquivo
            }, id
            );

            const result = await arquivoRepository.editar(arquivo);

            res.status(200).json({
                message: 'Arquivo editado com sucesso ✅',
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

    selecionarPorId: async (req, res) => {
        try {

            const id = Number(req.params.id);

            const result = await arquivoRepository.selecionarPorId(id);

            res.status(200).json({ result });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },

    selecionarTodos: async (req, res) => {
         try {
            const result = await arquivoRepository.selecionarTodos();

            res.status(200).json(result);

        } catch (error) {
            console.log(error);

            res.status(500).json({
                message: "Erro no servidor",
                errorMessage: error.message
            });
        }
    }
}

export default arquivoController;