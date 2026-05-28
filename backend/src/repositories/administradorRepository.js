import { connetion } from '../configs/Database.js';
import { Administrador } from '../models/Administrador.js';

const administradorRepository = {

    criar: async (administrador) => {
        const conn = await connetion.getConnection();

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
        const conn = await connetion.getConnection();

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

        const sql = 'SELECT * FROM administradores;';
        const [rows] = await connetion.execute(sql);

        return rows;
    },

    selecionarPorId: async (id) => {

        const sql = 'SELECT * FROM administradores WHERE id=?;';

        const [rows] = await connetion.execute(sql, [id]);

        return rows;
    },

    deletar: async (id) => {

        const sql = 'DELETE FROM administradores WHERE id=?;';

        const [rows] = await connetion.execute(sql, [id]);

        return rows;
    }
};

export default administradorRepository;