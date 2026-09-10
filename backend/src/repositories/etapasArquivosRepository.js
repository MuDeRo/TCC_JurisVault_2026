import { db } from "../config/Database.js";

const etapasArquivosRepository = {
    criar: async (etapaArquivo) => {
        const sql = 'INSERT INTO etapas_arquivos (id_etapa, id_arquivo) VALUES (?, ?)';
        const values = [etapaArquivo.id_etapa_fk, etapaArquivo.id_arquivo_fk];
        const [rows] = await db.execute(sql, values);
        return rows;
    },

    editar: async (etapaArquivo) => {
        const sql = 'UPDATE etapas_arquivos SET id_etapa = ?, id_arquivo = ? WHERE id = ?';
        const values = [etapaArquivo.id_etapa_fk, etapaArquivo.id_arquivo_fk, etapaArquivo.id];
        const [rows] = await db.execute(sql, values);
        return rows;
    },

    deletar: async (id) => {
        const sql = 'DELETE FROM etapas_arquivos WHERE id = ?';
        const [rows] = await db.execute(sql, [id]);
        return rows;
    },

    selecionar: async () => {
        const sql = 'SELECT * FROM etapas_arquivos';
        const [rows] = await db.execute(sql);
        return rows;
    },

    selecionarPorId: async (id) => {
        const sql = 'SELECT * FROM etapas_arquivos WHERE id = ?';
        const [rows] = await db.execute(sql, [id]);
        return rows[0];
    }
}

export default etapasArquivosRepository