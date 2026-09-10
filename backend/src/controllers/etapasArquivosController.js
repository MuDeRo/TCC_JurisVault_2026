import { EtapasArquivos } from "../models/EtapasArquivos.js";
import etapasArquivosRepository from "../repositories/etapasArquivosRepository.js";

const etapasArquivosController = {

    criar: async (req, res) => {
        try {

            const { id_etapa_fk, id_arquivo_fk } = req.body;

            const etapaArquivo = EtapasArquivos.criarEtapasArquivos({
                id_etapa_fk,
                id_arquivo_fk
            });

            const result = await etapasArquivosRepository.criar(etapaArquivo);

            res.status(201).json({
                message: 'Registro criado com sucesso ✅',
                data: result
            });
            
        } catch (error) {

            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor ❌',
                errorMessage: error.message
            })
        }
    },

    editar: async (req, res) => {
        try {

            const {id} = req.params;

            const { id_etapa_fk, id_arquivo_fk } = req.body;

            const etapaArquivo = EtapasArquivos.editarEtapasArquivos({
                id,
                id_etapa_fk,
                id_arquivo_fk
            });

            const result = await etapasArquivosRepository.editar(etapaArquivo);

            res.status(200).json({
                message: 'Registro atualizado com sucesso ✅',
                data: result
            });
            
        } catch (error) {

            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor ❌',
                errorMessage: error.message
            })
        }
        
    },

    deletar: async (req, res) => {
        try {

            const {id} = req.params;

            const result = await etapasArquivosRepository.deletar(id);

            res.status(200).json({
                message: 'Registro deletado com sucesso ✅',
                data: result
            });
            
        } catch (error) {

            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor ❌',
                errorMessage: error.message
            })
        }
    },

    selecionarPorId: async (req, res) => {
        try {

            const {id} = req.params;

            const result = await etapasArquivosRepository.selecionarPorId(id);

            res.status(200).json({
                message: 'Registro selecionado com sucesso ✅',
                data: result
            });
            
        } catch (error) {

            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor ❌',
                errorMessage: error.message
            })
        }
    },

    selecionar: async (req, res) => {
        try {

            const result = await etapasArquivosRepository.selecionar();

            res.status(200).json({
                message: 'Registros selecionados com sucesso ✅',
                data: result
            });
            
        } catch (error) {

            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor ❌',
                errorMessage: error.message
            })
        }
    }
}

export default etapasArquivosController;
