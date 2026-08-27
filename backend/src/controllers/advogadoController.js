import advogadoRepository from '../repositories/advogadoRepository.js';
import { Advogado } from '../models/Advogado.js';
import bcrypt from 'bcrypt';

const advogadoController = {
    
    cadastrar: async (req, res) => {
        try {
            let { 
                nome_advogado, 
                email_advogado, 
                senha_advogado, 
                cpf_advogado, 
                registro_oab, 
                telefone_advogado, 
                status_advogado,
                uf_oab 
            } = req.body;

            const advogadoInstancia = Advogado.criar(
                nome_advogado,
                email_advogado,
                senha_advogado,
                null, 
                'validando', 
                cpf_advogado,
                registro_oab,
                telefone_advogado,
                uf_oab
            );

            const salt = await bcrypt.genSalt(10);
            const hashSenha = await bcrypt.hash(advogadoInstancia.senha_advogado, salt);
            
            const dadosParaBanco = {
                id: advogadoInstancia.id,
                nome_advogado: advogadoInstancia.nome_advogado,
                email_advogado: advogadoInstancia.email_advogado,
                senha_advogado: hashSenha,
                cpf_advogado: advogadoInstancia.cpf_advogado,
                registro_oab: advogadoInstancia.registro_oab,
                telefone_advogado: advogadoInstancia.telefone_advogado,
                status_advogado: advogadoInstancia.status_advogado,
                uf_oab: advogadoInstancia.uf_oab
            };

            const resultado = await advogadoRepository.criar(dadosParaBanco);

            return res.status(201).json({ message: 'Cadastro solicitado com sucesso', resultado });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Erro no server', error: error.message });
        }
    },

    editar: async (req, res) => {
        try {
            const id = Number(req.params.id);
            let { 
                nome_advogado, 
                email_advogado, 
                senha_advogado, 
                cpf_advogado, 
                registro_oab, 
                telefone_advogado, 
                uf_oab 
            } = req.body;

            const advogadoInstancia = Advogado.criar(
                nome_advogado, email_advogado, senha_advogado, id, 'ativo', cpf_advogado, registro_oab, telefone_advogado, uf_oab
            );

            const salt = await bcrypt.genSalt(10);
            const hashSenha = await bcrypt.hash(advogadoInstancia.senha_advogado, salt);

            const dadosAtualizados = {
                id: advogadoInstancia.id,
                nome_advogado: advogadoInstancia.nome_advogado,
                email_advogado: advogadoInstancia.email_advogado,
                senha_advogado: hashSenha,
                cpf_advogado: advogadoInstancia.cpf_advogado,
                registro_oab: advogadoInstancia.registro_oab,
                telefone_advogado: advogadoInstancia.telefone_advogado,
                uf_oab: advogadoInstancia.uf_oab
            };

            const resultado = await advogadoRepository.editar(dadosAtualizados);

            return res.status(200).json({ message: 'Perfil atualizado com sucesso', resultado });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Erro no server', error: error.message });
        }
    },

    selecionar: async (req, res) => {
        try {
            const resultado = await advogadoRepository.selecionar();

            return res.status(200).json({ resultado });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Erro no server', error: error.message });
        }
    },

    selecionarPendentes: async (req, res) => {
        try {
            const resultado = await advogadoRepository.selecionarPendentes();

            return res.status(200).json({ resultado });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Erro no server', error: error.message });
        }
    },


    aprovar: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const resultado = await advogadoRepository.aprovar(id);

            return res.status(200).json({ message: 'Advogado aprovado com sucesso', resultado });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Erro no server', error: error.message });
        }
    },

    negar: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const resultado = await advogadoRepository.negar(id);

            return res.status(200).json({ message: 'Cadastro rejeitado e marcado como negado', resultado });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Erro no server', error: error.message });
        }
    },

    deletar: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const resultado = await advogadoRepository.deletar(id);

            return res.status(200).json({ message: 'Registro do advogado excluído com sucesso', resultado });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Erro no server', error: error.message });
        }
    }
};

export default advogadoController;