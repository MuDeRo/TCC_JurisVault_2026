import {db} from '../config/Database.js'

const tarefasRepository = {

    verTarefas: async () => {
        const sql = 'SELECT * FROM tarefas;';
        const [rows] = await db.execute(sql);
        return rows;
    },

    criarTarefa: async (tarefas) => {
        const sql = 'INSERT INTO tarefas(id_etapa, tarefa, descricao_tarefa, status) VALUES (?,?,?,?);';

        const values = [tarefas.id_etapa, tarefas.tarefa, tarefas.descricao_tarefa, tarefas.status];
        const [rows] = await db.execute(sql, values);
        return rows;
    },

    editar: async (tarefas) => {
        const sql = 'UPDATE tarefas SET id_etapa=?, tarefa=?, descricao_tarefa=?, status=? WHERE id=?;';

        const values = [tarefas.id_etapa, tarefas.tarefa, tarefas.descricao_tarefa, tarefas.status, tarefas.id];

        const [rows] = await db.execute(sql, values);
        return rows;
    },

    deletar: async (id) => {
        const sql = 'DELETE FROM tarefas WHERE id=?;';
        const value = [id];
        const [rows] = await db.execute(sql, value);
        return rows;
    },

    buscarTarefasPorEtapa: async (idEtapa) => {
        const sql = 'SELECT * FROM tarefas WHERE id_etapa = ?;';
        const values = [idEtapa];
        const [rows] = await db.execute(sql, values);
        return rows;
    },

    atualizarStatus: async (id, status) => {
        const sql = 'UPDATE tarefas SET status = ? WHERE id = ?;';
        const values = [status, id];
        const [rows] = await db.execute(sql, values);
        return rows;
    }
};

export default tarefasRepository;