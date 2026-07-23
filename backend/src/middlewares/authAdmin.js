import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

async function verificaAdmin(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {

        return res.status(401).json({
            message: 'Token não inserido'
        });
    }

    const token = authHeader.split(' ')[1];

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // verifica se o usuário é administrador
        if (decoded.type !== 'admin') {

            return res.status(403).json({
                message: 'Acesso permitido apenas para administradores'
            });
        }

        req.user = decoded; // Armazena as informações do usuário decodificado na requisição

        next();

    } catch (error) {

        console.error(error);

        return res.status(401).json({
            message: 'Token inválido'
        });
    }
}

export default verificaAdmin;