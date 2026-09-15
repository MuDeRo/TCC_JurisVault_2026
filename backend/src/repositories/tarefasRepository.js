import {db} from '../config/Database.js'

const tarefasRepository = {

    verTarefas: async () => {
        const sql = 'SELECT * FROM tarefas;';
        const [rows] = await db.execute(sql);
        return rows;
    },

    criarTarefa: async (tarefas) => {
        const sql = 'INSERT INTO tarefas(id_etapa, tarefa, descricao_tarefa) VALUES (?,?,?);';

        const values = [tarefas.id_etapa, tarefas.tarefa, tarefas.descricao_tarefa];
        const [rows] = await db.execute(sql, values);
        return rows;
    },

    editar: async (tarefas) => {
        const sql = 'UPDATE tarefas SET id_etapa=?, tarefa=?, descricao_tarefa=? WHERE id=?;';

        const values = [tarefas.id_etapa, tarefas.tarefa, tarefas.descricao_tarefa, tarefas.id];

        const [rows] = await db.execute(sql, values);
        return rows;
    },

    deletar: async (id) => {
        const sql = 'DELETE FROM tarefas WHERE id=?;';
        const value = [id];
        const [rows] = await db.execute(sql, value);
        return rows;
    }
};

export default tarefasRepository;