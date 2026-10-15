import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken'; 
import 'dotenv/config';

import advogadoRepository from '../repositories/advogadoRepository.js';
import administradorRepository from '../repositories/administradorRepository.js';

const authController = {

    loginAdvogado: async (req, res) => {
        try {
            const { email, senha } = req.body;
            const advogado = await advogadoRepository.buscarPorEmail(email);
            
            if (!advogado) {
                return res.status(404).json({
                    message: 'Advogado não encontrado'
                });
            }

            const senhaValida = await bcrypt.compare(senha, advogado.senha_advogado);

            if (!senhaValida) {
                return res.status(401).json({
                    message: 'Senha inválida'
                });
            }

            
            if (advogado.status_advogado !== 'aprovado') {
                if (advogado.status_advogado === 'validando') {
                    return res.status(403).json({
                        message: 'Seu cadastro ainda está em análise pelo administrador.'
                    });
                }
                
                if (advogado.status_advogado === 'negado') {
                    return res.status(403).json({
                        message: 'Acesso recusado. Seu cadastro foi negado pelo administrador.'
                    });
                }

                return res.status(403).json({
                    message: 'Acesso não permitido. O seu cadastro não está ativo.'
                });
            }

            const token = jwt.sign(
                {
                    id: advogado.id_advogado || advogado.id,
                    type: 'advogado',
                    status: advogado.status_advogado
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '8h' // Ajustado para um tempo mais prático que 1m
                }
            );

            return res.status(200).json({
                message: 'Login realizado com sucesso',
                token
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },

    loginAdmin: async (req, res) => {
        try {
            const { email, senha } = req.body;

            const admin = await administradorRepository.buscarPorEmail(email);
            if (!admin) {
                return res.status(404).json({
                    message: 'Administrador não encontrado'
                });
            }

            const senhaValida = await bcrypt.compare(
                senha,
                admin.senha_admin
            );

            if (!senhaValida) {
                return res.status(401).json({
                    message: 'Senha inválida'
                });
            }

            const token = jwt.sign(
                {
                    id: admin.id_admin || admin.id,
                    type: 'admin'
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '8h'
                }
            );

            return res.status(200).json({
                message: 'Login admin realizado com sucesso',
                token
            });

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                message: 'Erro no login admin'
            });
        }
    }

};

export default authController;