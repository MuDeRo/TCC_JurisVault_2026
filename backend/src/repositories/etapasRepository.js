import {db} from '../config/Database.js'

const etapasRepository = {

    buscarAsEtapas: async () => {
        const sql = 'SELECT * FROM etapas;';
        const [rows] = await db.execute(sql);
        return rows;
    },

    criar: async (etapas) => {
        const sql = 'INSERT INTO etapas(id_caso_fk, etapa, descricao) VALUES (?,?,?);';

        const values = [etapas.id_caso_fk, etapas.etapa, etapas.descricao];
        const [rows] = await db.execute(sql, values);
        return rows;
    },

    editar: async (etapas) => {
        const sql = 'UPDATE etapas SET id_caso_fk=?, etapa=?, descricao=? WHERE id=?;';

        const values = [etapas.id_caso_fk, etapas.etapa, etapas.descricao, etapas.id];

        const [rows] = await db.execute(sql, values)
        return rows;
    },

    deletar: async (id) => {
        const sql = 'DELETE FROM etapas WHERE id=?;';
        const value = [id];
        const [rows] = await db.execute(sql, value);
        return rows;
    }
};

export default etapasRepository;