import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import axios from 'axios';
import './EtapasCasos.css';
import './Kanban.css';

// Estrutura padrão das colunas do Kanban
const colunasIniciais = {
  'nao_iniciado': { id: 'nao_iniciado', titulo: 'Não Iniciado', tarefas: [] },
  'em_andamento': { id: 'em_andamento', titulo: 'Em Andamento', tarefas: [] },
  'finalizado': { id: 'finalizado', titulo: 'Finalizado', tarefas: [] }
};

export default function KanbanTarefas() {
  const { idCaso, idEtapa } = useParams();
  const navigate = useNavigate();

  const [colunas, setColunas] = useState(colunasIniciais);
  const [loading, setLoading] = useState(true);

  // Estados para criação de nova tarefa
  const [mostrarFormTarefa, setMostrarFormTarefa] = useState(false);
  const [tituloNovaTarefa, setTituloNovaTarefa] = useState('');
  const [descricaoNovaTarefa, setDescricaoNovaTarefa] = useState('');

  // 1. Função isolada para buscar e organizar as tarefas do banco nas colunas
  async function carregarTarefas() {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.get(`http://localhost:8080/tarefas/etapa/${idEtapa}`, { headers });

      console.log('RESPOSTA DO BACKEND:', response.data);

      const tarefasDoBanco = response.data.data;

      // Reseta a estrutura das colunas
      const colunasAtualizadas = {
        'nao_iniciado': { ...colunasIniciais['nao_iniciado'], tarefas: [] },
        'em_andamento': { ...colunasIniciais['em_andamento'], tarefas: [] },
        'finalizado': { ...colunasIniciais['finalizado'], tarefas: [] }
      };

      // Distribui as tarefas recebidas pelas colunas de acordo com o status
      if (Array.isArray(tarefasDoBanco)) {
        tarefasDoBanco.forEach(tarefa => {
          const status = tarefa.status || 'nao_iniciado';
          if (colunasAtualizadas[status]) {
            colunasAtualizadas[status].tarefas.push(tarefa);
          } else {
            colunasAtualizadas['nao_iniciado'].tarefas.push(tarefa);
          }
        });
      }

      setColunas(colunasAtualizadas);
    } catch (error) {
      console.error('Erro ao carregar tarefas do backend:', error);
    } finally {
      setLoading(false);
    }
  }

  // 2. Busca inicial assim que a tela abre
  useEffect(() => {
    carregarTarefas();
  }, [idEtapa]);

  // 3. Função para cadastrar nova tarefa
  const handleCriarTarefa = async () => {
    if (!tituloNovaTarefa.trim()) return alert('Digite o título da tarefa!');

    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const payload = {
        id_etapa: idEtapa,
        tarefa: tituloNovaTarefa,
        descricao_tarefa: descricaoNovaTarefa,
        status: 'nao_iniciado' // Nova tarefa entra por padrão na 1ª coluna
      };

      await axios.post('http://localhost:8080/tarefas', payload, { headers });

      // Recarrega o quadro do banco com os dados e IDs oficiais
      await carregarTarefas();

      // Limpa os campos e esconde o formulário
      setMostrarFormTarefa(false);
      setTituloNovaTarefa('');
      setDescricaoNovaTarefa('');
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      alert('Erro ao criar a tarefa.');
    }
  };

  // 4. Lógica do Drag and Drop (Arrastar e Soltar)
  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const colunaOrigem = colunas[source.droppableId];
    const colunaDestino = colunas[destination.droppableId];
    const tarefasOrigem = Array.from(colunaOrigem.tarefas);
    const tarefasDestino = Array.from(colunaDestino.tarefas);

    const [tarefaMovida] = tarefasOrigem.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      // Movimento dentro da mesma coluna
      tarefasOrigem.splice(destination.index, 0, tarefaMovida);
      setColunas({
        ...colunas,
        [source.droppableId]: { ...colunaOrigem, tarefas: tarefasOrigem }
      });
    } else {
      // Movimento para outra coluna
      tarefaMovida.status = destination.droppableId;
      tarefasDestino.splice(destination.index, 0, tarefaMovida);

      setColunas({
        ...colunas,
        [source.droppableId]: { ...colunaOrigem, tarefas: tarefasOrigem },
        [destination.droppableId]: { ...colunaDestino, tarefas: tarefasDestino }
      });

      // Atualiza o status no banco de dados
      try {
        const token = localStorage.getItem('token');
        await axios.put(
          `http://localhost:8080/tarefas/${draggableId}/status`,
          { status: destination.droppableId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error('Erro ao atualizar status no backend:', error);
        alert('Erro ao salvar alteração. Atualize a página.');
      }
    }
  };

  return (
    <div className="processos-container">
      {/* Cabeçalho com Botões de Ação */}
      <div className="processos-header">
        <div>
          <h1>Kanban da Etapa</h1>
          <p>Arraste os cartões para atualizar o progresso das tarefas.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-novo-caso" style={{ backgroundColor: '#64748b' }} onClick={() => navigate(`/etapas/caso/${idCaso}`)}>
            🡨 Voltar
          </button>
          <button className="btn-novo-caso" onClick={() => setMostrarFormTarefa(!mostrarFormTarefa)}>
            {mostrarFormTarefa ? 'Cancelar' : '+ Nova Tarefa'}
          </button>
        </div>
      </div>

      {/* Formulário Condicional de Nova Tarefa */}
      {mostrarFormTarefa && (
        <div style={{ padding: '15px', backgroundColor: '#f8fafc', borderRadius: '8px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              placeholder="Título da tarefa (Ex: Redigir réplica)"
              value={tituloNovaTarefa}
              onChange={(e) => setTituloNovaTarefa(e.target.value)}
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', flex: 1 }}
            />
            <input
              type="text"
              placeholder="Descrição ou observações (Opcional)..."
              value={descricaoNovaTarefa}
              onChange={(e) => setDescricaoNovaTarefa(e.target.value)}
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', flex: 2 }}
            />
            <button className="btn-novo-caso" onClick={handleCriarTarefa}>
              Guardar Tarefa
            </button>
          </div>
        </div>
      )}

      {/* Quadro Kanban */}
      <div className="processos-card">
        {loading ? (
          <p style={{ textAlign: 'center', padding: '20px' }}>Carregando tarefas...</p>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="kanban-container">
              {Object.entries(colunas).map(([colunaId, coluna]) => (
                <div key={colunaId} className="kanban-coluna">
                  <h3>{coluna.titulo} ({coluna.tarefas.length})</h3>

                  <Droppable droppableId={colunaId}>
                    {(provided) => (
                      <div
                        className="kanban-lista"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {coluna.tarefas.map((tarefa, index) => (
                          <Draggable key={String(tarefa.id)} draggableId={String(tarefa.id)} index={index}>
                            {(provided) => (
                              <div
                                className="kanban-cartao"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <strong>
                                  {tarefa.titulo_tarefa || tarefa.titulo || tarefa.tarefa || 'Tarefa sem título'}
                                </strong>
                                <p>
                                  {tarefa.descricao_tarefa || tarefa.descricao || 'Sem descrição'}
                                </p>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </DragDropContext>
        )}
      </div>
    </div>
  );
}