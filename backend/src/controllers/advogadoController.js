import advogadoRepository from '../repositories/advogadoRepository.js';
import { Advogado } from '../models/Advogado.js';
import bcrypt from 'bcrypt';


const advogadoController = {
    
    cadastrar: async (req, res) => {
        try {
            // Desestruturação com as chaves exatas que vêm do Frontend
            const { nome, email, senha, cpf, oab, telefone, uf } = req.body;
            
            
           
            const salt = await bcrypt.genSalt(10);
            const hashSenha = await bcrypt.hash(senha, salt);
            
            
            const advogadoInstancia = Advogado.criar(
                nome,
                email,
                hashSenha,
                null, 
                'validando', // Status inicial padronizado
                cpf,
                oab,
                telefone,
                uf
            );
            
            //Preparando o objeto com os nomes das colunas reais do banco
            const dadosParaBanco = {
                id: advogadoInstancia.id,
                nome_advogado: advogadoInstancia.nome_advogado,
                email_advogado: advogadoInstancia.email_advogado,
                senha_advogado: advogadoInstancia.senha_advogado,
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
            
            // Ajustado para receber o mesmo formato do frontend na edição
            const { nome, email, senha, cpf, oab, telefone, uf } = req.body;

            // Se a senha for enviada na edição, gera novo hash. Senão, mantém indefinida para tratar no repository
            let hashSenha = null;
            if (senha) {
                const salt = await bcrypt.genSalt(10);
                hashSenha = await bcrypt.hash(senha, salt);
            }

            const advogadoInstancia = Advogado.criar(
                nome, 
                email, 
                hashSenha, 
                id, 
                'aprovado', // Mantém o status ativo/aprovado na edição
                cpf, 
                oab, 
                telefone, 
                uf
            );

            const dadosAtualizados = {
                id: advogadoInstancia.id,
                nome_advogado: advogadoInstancia.nome_advogado,
                email_advogado: advogadoInstancia.email_advogado,
                cpf_advogado: advogadoInstancia.cpf_advogado,
                registro_oab: advogadoInstancia.registro_oab,
                telefone_advogado: advogadoInstancia.telefone_advogado,
                uf_oab: advogadoInstancia.uf_oab
            };

            // Só adiciona a senha no objeto de atualização se ela foi alterada
            if (hashSenha) {
                dadosAtualizados.senha_advogado = advogadoInstancia.senha_advogado;
            }

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