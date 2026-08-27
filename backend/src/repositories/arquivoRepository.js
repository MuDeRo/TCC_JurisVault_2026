import { db } from "../config/Database.js";

const arquivoRepository = {

    criar: async (arquivo) => {
        const sql = 'INSERT INTO arquivos(vinculo_arquivo, descricao_arquivo) VALUES (?, ?);';
        const values = [arquivo.vinculo_arquivo, arquivo.descricao_arquivo];
        const [rows] = await db.execute(sql, values);
        return rows;
    },

    editar: async (arquivo, id) => {
        const sql = 'UPDATE arquivos SET vinculo_arquivo = ?, descricao_arquivo = ? WHERE id = ?';
        const values = [arquivo.vinculo_arquivo, arquivo.descricao_arquivo, id];
        const [rows] = await db.execute(sql, values);
        return rows;
    },

    deletar: async (id) => {
        const sql = 'DELETE FROM arquivos WHERE id = ?';
        const values = [id];
        const [rows] = await db.execute(sql, values);
        return rows;
    },

    selecionarPorId: async (id) => {
        const sql = 'SELECT * FROM arquivos WHERE id = ?';
        const values = [id];
        const [rows] = await db.execute(sql, values);
        return rows[0];
    },

    selecionarTodos: async () => {
        const sql = 'SELECT * FROM arquivos';
        const [rows] = await db.execute(sql);
        return rows;
    }

}

export default arquivoRepository;