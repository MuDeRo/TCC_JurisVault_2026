import { db } from '../config/Database.js';

const advogadosCasosRepository = {

    buscarTodosAdvogadosCasos: async () => {
        const sql = 'SELECT * FROM advogados_casos;';
        const [rows] = await db.execute(sql);
        return rows;
    },

    criar: async (advogadoCaso) => {
        const sql = `
            INSERT INTO advogados_casos(id_advogado_fk, id_caso_fk, cep_caso, rua_caso) VALUES (?, ?, ?, ?);
        `;

        const values = [advogadoCaso.id_advogado_fk, advogadoCaso.id_caso_fk, advogadoCaso.cep_caso, advogadoCaso.rua_caso];

        const [rows] = await db.execute(sql, values);
        return rows;
    },

    editar: async (advogadoCaso) => {
        const sql = `
            UPDATE advogados_casos
            SET id_advogado_fk = ?,
                id_caso_fk = ?,
                cep_caso = ?,
                rua_caso = ?
            WHERE id = ?;
        `;

        const values = [
            advogadoCaso.id_advogado_fk,
            advogadoCaso.id_caso_fk,
            advogadoCaso.cep_caso,
            advogadoCaso.rua_caso,
            advogadoCaso.id
        ];

        const [rows] = await db.execute(sql, values);
        return rows;
    },

    deletar: async (id) => {
        const sql = 'DELETE FROM advogados_casos WHERE id = ?;';
        const [rows] = await db.execute(sql, [id]);
        return rows;
    }

};

export default advogadosCasosRepository;