import { db } from '../config/Database.js';

const casosRepository = {

    buscarTodosCasos: async () => {
        const sqlCasos = 'SELECT * FROM casos;';
        const [rowsCasos] = await db.execute(sqlCasos);
        return rowsCasos;
    },

    criar: async (caso) => {
        const sql = 'INSERT INTO casos(descricao_caso, numero_cnj) VALUES (?,?);';
        const values = [caso.descricao_caso, caso.numero_cnj];
        const [rows] = await db.execute(sql, values);
        return rows;
    },

    editar: async (caso) => {
        const sql = 'UPDATE casos SET descricao_caso=?, numero_cnj=? WHERE id=?';
        const values = [caso.descricao_caso, caso.numero_cnj, caso.id];
        const [rows] = await db.execute(sql, values);
        return rows;
    },

    deletar: async (id) => {
        const sql = 'DELETE FROM casos WHERE id=?;';
        const values = [id];
        const [rows] = await db.execute(sql, values);
        return rows;
    }
};

export default casosRepository;