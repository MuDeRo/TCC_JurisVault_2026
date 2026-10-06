import {db} from '../config/Database.js';

const CasoRepository = {
    
    // 1. CREATE (Já havíamos feito)
    criarCasoCompleto: async (caso, requerente, requerido, advogadoCaso) => {
        const conn = await db.getConnection();
        try {
            await conn.beginTransaction();

            const sqlCaso = 'INSERT INTO casos (descricao_caso, numero_cnj) VALUES (?, ?)';
            const [resultCaso] = await conn.execute(sqlCaso, [caso.descricao_caso, caso.numero_cnj]);
            const idCaso = resultCaso.insertId;

            const sqlRequerente = 'INSERT INTO requerentes (id_caso, nome, idade_anos, cpf) VALUES (?, ?, ?, ?)';
            await conn.execute(sqlRequerente, [idCaso, requerente.nome, requerente.idade_anos, requerente.cpf]);

            const sqlRequerido = 'INSERT INTO requiridos (id_caso, nome, idade_anos, cpf) VALUES (?, ?, ?, ?)';
            await conn.execute(sqlRequerido, [idCaso, requerido.nome, requerido.idade_anos, requerido.cpf]);

            const sqlAdvogadoCaso = 'INSERT INTO advogados_casos (id_advogado_fk, id_caso_fk, cep_caso, rua_caso) VALUES (?, ?, ?, ?)';
            await conn.execute(sqlAdvogadoCaso, [advogadoCaso.id_advogado, idCaso, advogadoCaso.cep, advogadoCaso.rua]);

            await conn.commit();
            return { sucesso: true, idCasoGerado: idCaso };
        } catch (error) {
            await conn.rollback();
            throw new Error(`Erro ao criar caso: ${error.message}`);
        } finally {
            conn.release();
        }
    },

    // 2. READ - Buscar um caso específico pelo ID com todos os detalhes
    buscarCasoPorId: async (idCaso) => {
        const conn = await db.getConnection();
        try {
            // Busca os dados separadamente e monta um objeto completo
            const [casos] = await conn.execute('SELECT * FROM casos WHERE id = ?', [idCaso]);
            if (casos.length === 0) return null; // Caso não encontrado

            const [requerentes] = await conn.execute('SELECT * FROM requerentes WHERE id_caso = ?', [idCaso]);
            const [requiridos] = await conn.execute('SELECT * FROM requiridos WHERE id_caso = ?', [idCaso]);
            const [advogadosCasos] = await conn.execute('SELECT * FROM advogados_casos WHERE id_caso_fk = ?', [idCaso]);

            return {
                caso: casos[0],
                requerentes: requerentes, // Retorna array caso futuramente haja mais de um
                requiridos: requiridos,
                dadosAdvogado: advogadosCasos[0]
            };
        } catch (error) {
            throw new Error(`Erro ao buscar caso: ${error.message}`);
        } finally {
            conn.release();
        }
    },

    // 2.1 READ - Listar todos os casos de um Advogado específico
    listarCasosPorAdvogado: async (idAdvogado) => {
        const conn = await db.getConnection();
        try {
            // Um INNER JOIN para trazer todos os casos vinculados a um advogado
            const sql = `
                SELECT c.id, c.descricao_caso, c.numero_cnj, ac.cep_caso, ac.rua_caso
                FROM casos c
                INNER JOIN advogados_casos ac ON c.id = ac.id_caso_fk
                WHERE ac.id_advogado_fk = ?
            `;
            const [casos] = await conn.execute(sql, [idAdvogado]);
            return casos;
        } catch (error) {
            throw new Error(`Erro ao listar casos: ${error.message}`);
        } finally {
            conn.release();
        }
    },

    // 3. UPDATE - Atualizar dados do caso e das tabelas vinculadas
    atualizarCasoCompleto: async (idCaso, caso, requerente, requerido, advogadoCaso) => {
        const conn = await db.getConnection();
        try {
            await conn.beginTransaction();

            // Atualiza tabela Casos
            const sqlCaso = 'UPDATE casos SET descricao_caso = ?, numero_cnj = ? WHERE id = ?';
            await conn.execute(sqlCaso, [caso.descricao_caso, caso.numero_cnj, idCaso]);

            // Atualiza tabela Requerentes
            const sqlReq = 'UPDATE requerentes SET nome = ?, idade_anos = ?, cpf = ? WHERE id_caso = ?';
            await conn.execute(sqlReq, [requerente.nome, requerente.idade_anos, requerente.cpf, idCaso]);

            // Atualiza tabela Requiridos
            const sqlReqd = 'UPDATE requiridos SET nome = ?, idade_anos = ?, cpf = ? WHERE id_caso = ?';
            await conn.execute(sqlReqd, [requerido.nome, requerido.idade_anos, requerido.cpf, idCaso]);

            // Atualiza tabela Advogados_Casos (endereço)
            const sqlAdv = 'UPDATE advogados_casos SET cep_caso = ?, rua_caso = ? WHERE id_caso_fk = ?';
            await conn.execute(sqlAdv, [advogadoCaso.cep, advogadoCaso.rua, idCaso]);

            await conn.commit();
            return { sucesso: true, mensagem: "Caso atualizado com sucesso" };
        } catch (error) {
            await conn.rollback();
            throw new Error(`Erro ao atualizar caso: ${error.message}`);
        } finally {
            conn.release();
        }
    },

    // 4. DELETE - Excluir o caso e seus vínculos
    deletarCasoCompleto: async (idCaso) => {
        const conn = await db.getConnection();
        try {
            await conn.beginTransaction();

            // É OBRIGATÓRIO deletar os "filhos" (tabelas com Foreign Key) ANTES do "pai" (tabela casos)
            // para não dar erro de restrição de chave estrangeira (a menos que use ON DELETE CASCADE no banco)
            await conn.execute('DELETE FROM requerentes WHERE id_caso = ?', [idCaso]);
            await conn.execute('DELETE FROM requiridos WHERE id_caso = ?', [idCaso]);
            await conn.execute('DELETE FROM etapas WHERE id_caso_fk = ?', [idCaso]); 
            await conn.execute('DELETE FROM advogados_casos WHERE id_caso_fk = ?', [idCaso]);
            
            
            await conn.execute('DELETE FROM casos WHERE id = ?', [idCaso]);

            await conn.commit();
            return { sucesso: true, mensagem: "Caso deletado com sucesso" };
        } catch (error) {
            await conn.rollback();
            throw new Error(`Erro ao deletar caso: ${error.message}`);
        } finally {
            conn.release();
        }
    },

    selecionarTodosCasos: async () => {
        const conn = await db.getConnection();
        try {
            const [casos] = await conn.execute('SELECT * FROM casos');
            return casos;
        } catch (error) {
            throw new Error(`Erro ao selecionar todos os casos: ${error.message}`);
        } finally {
            conn.release();
        }
    }
};

export default CasoRepository;