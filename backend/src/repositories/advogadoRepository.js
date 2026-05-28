import { connetion } from '../configs/Database.js';
import { Advogado } from '../models/Advogado.js';

const advogadoRepository = {

    criar: async (advogado) => {
        const conn = await connetion.getConnection();

        try {

            await conn.beginTransaction();

            const sqlAdv = 'INSERT INTO advogados (nome, email, senha, cpf, registro_oab, telefone, uf_oab) VALUES (?, ?, ?, ?, ?, ?, ?);';

            const valuesAdv = [
                advogado.nome,
                advogado.email,
                advogado.senha,
                advogado.cpf,
                advogado.registro_oab,
                advogado.telefone,
                advogado.uf_oab
            ];

            const [rowsAdv] = await conn.execute(sqlAdv, valuesAdv);

            await conn.commit();

            return rowsAdv;

        } catch (error) {

            await conn.rollback();
            throw error;

        } finally {

            conn.release();

        }
    },

    editar: async (advogado) => {
        const conn = await connetion.getConnection();

        try {

            await conn.beginTransaction();

            const sqlAdv = 'UPDATE advogados SET nome_advogados=?, email_advogado=?, senha_advogado=?, cpf_advogado=?, registro_oab=?, telefone_advogado=?, uf_oab=? WHERE id=?;';

            const valuesAdv = [advogado.nome,advogado.email,advogado.senha,advogado.cpf,advogado.registro_oab,advogado.telefone,advogado.uf_oab, advogado.id
            ];

            const [rowsAdv] = await conn.execute(sqlAdv, valuesAdv);

            await conn.commit();

            return rowsAdv;

        } catch (error) {

            await conn.rollback();
            throw error;

        } finally {

            conn.release();

        }
    },

    selecionar: async () => {

        const sql = 'SELECT * FROM advogados;';
        const [rows] = await connetion.execute(sql);

        return rows;
    },

    selecionarPendentes: async () => {

        const sql = 'SELECT * FROM advogados WHERE status = "PENDENTE";';

        const [rows] = await connetion.execute(sql);

        return rows;
    },

    aprovar: async (id) => {

        const sql = 'UPDATE advogados SET status = "APROVADO" WHERE id=?;';

        const [rows] = await connetion.execute(sql, [id]);

        return rows;
    },

    negar: async (id) => {

        const sql = 'UPDATE advogados SET status = "NEGADO" WHERE id=?;';

        const [rows] = await connetion.execute(sql, [id]);

        return rows;
    },

    deletar: async (id) => {

        const sql = 'DELETE FROM advogados WHERE id=?;';

        const [rows] = await connetion.execute(sql, [id]);

        return rows;
    }
};

export default advogadoRepository;