import { db } from '../config/Database.js';
import { Administrador } from '../models/Administrador.js';

const administradorRepository = {
    
    criar: async (administrador) => {
        const conn = await db.getConnection();

        try {

            await conn.beginTransaction();

            const sqlAdm = 'INSERT INTO administradores (nome_admin, email_admin, senha_admin) VALUES (?, ?, ?);';

            const valuesAdm = [
                administrador.nome_admin,
                administrador.email_admin,
                administrador.senha_admin
            ];

            const [rowsAdm] = await conn.execute(sqlAdm, valuesAdm);

            await conn.commit();

            return rowsAdm;

        } catch (error) {

            await conn.rollback();
            throw error;

        } finally {

            conn.release();

        }
    },

    editar: async (administrador) => {
        const conn = await db.getConnection();

        try {

            await conn.beginTransaction();

            const sqlAdm = 'UPDATE administradores SET nome_admin=?, email_admin=?, senha_admin=? WHERE id=?;';

            const valuesAdm = [
                administrador.nome_admin,
                administrador.email_admin,
                administrador.senha_admin,
                administrador.id
            ];

            const [rowsAdm] = await conn.execute(sqlAdm, valuesAdm);

            await conn.commit();

            return rowsAdm;

        } catch (error) {

            await conn.rollback();
            throw error;

        } finally {

            conn.release();

        }
    },

    selecionar: async () => {
        const conn = await db.getConnection();

        const sql = 'SELECT * FROM administradores;';
        const [rows] = await conn.execute(sql);

        return rows;
    },

    buscarPorEmail: async (email) => {
        const conn = await db.getConnection();

        const sql = 'SELECT * FROM administradores WHERE email_admin=?;';
        const [rows] = await conn.execute(sql, [email]);

        // Retorna apenas o objeto do admin, ou undefined se não achar nada
        return rows[0]; 
    },

    selecionarPorId: async (id) => {
        const conn = await db.getConnection();

        const sql = 'SELECT * FROM administradores WHERE id=?;';
        const [rows] = await conn.execute(sql, [id]);

        
        return rows[0];
    },

    deletar: async (id) => {

        const conn = await db.getConnection();

        const sql = 'DELETE FROM administradores WHERE id=?;';

        const [rows] = await conn.execute(sql, [id]);

        return rows;
    }
};

export default administradorRepository;