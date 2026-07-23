import { db } from '../config/Database.js';
import { Advogado } from '../models/Advogado.js';

const advogadoRepository = {

    criar: async (advogado) => {
        const conn = await db.getConnection();

        try {

            await conn.beginTransaction();

            const sqlAdv = 'INSERT INTO advogados (nome_advogado, email_advogado, senha_advogado, cpf_advogado, registro_oab, telefone_advogado, status_advogado, uf_oab) VALUES (?, ?, ?, ?, ?, ?, ?, ?);';

            const valuesAdv = [
                advogado.nome_advogado,    
                advogado.email_advogado,   
                advogado.senha_advogado,   
                advogado.cpf_advogado,     
                advogado.registro_oab,
                advogado.telefone_advogado,
                advogado.status_advogado,
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
        
        const conn = await db.getConnection(); 

        try {
            await conn.beginTransaction();

            const sqlAdv = 'UPDATE advogados SET nome_advogados=?, email_advogado=?, senha_advogado=?, cpf_advogado=?, registro_oab=?, telefone_advogado=?, uf_oab=? WHERE id=?;';

            const valuesAdv = [advogado.nome, advogado.email, advogado.senha, advogado.cpf, advogado.registro_oab, advogado.telefone, advogado.uf_oab, advogado.id];

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
        const conn = await db.getConnection();

        const sql = 'SELECT * FROM advogados;';
        const [rows] = await conn.execute(sql);

        return rows;
    },

    selecionarPendentes: async () => {

        const conn = await db.getConnection();

        const sql = 'SELECT * FROM advogados WHERE status_advogado = "validando";';

        const [rows] = await conn.execute(sql);

        return rows;
    },

    aprovar: async (id) => {
        const conn = await db.getConnection();
        
        const sql = 'UPDATE advogados SET status_advogado = "aprovado" WHERE id=?;';
        const [rows] = await conn.execute(sql, [id]);
        return rows;
    },

    negar: async (id) => {
        const conn = await db.getConnection();
        
        const sql = 'UPDATE advogados SET status_advogado = "negado" WHERE id=?;';
        const [rows] = await conn.execute(sql, [id]);
        return rows;
    },

    deletar: async (id) => {

        const conn = await db.getConnection();

        const sql = 'DELETE FROM advogados WHERE id=?;';

        const [rows] = await conn.execute(sql, [id]);

        return rows;
    }
};

export default advogadoRepository;