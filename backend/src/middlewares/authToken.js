import jwt from 'jsonwebtoken';
import 'dotenv/config';

async function authMIddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) 
        return res.status(401).json({ message: 'Token não informado' });

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }    
}

export default authMIddleware;