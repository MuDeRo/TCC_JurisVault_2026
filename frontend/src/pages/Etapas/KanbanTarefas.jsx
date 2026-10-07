import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import axios from 'axios';
import './EtapasCasos.css';
import './Kanban.css';

// Estrutura inicial das nossas colunas
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

  useEffect(() => {
    async function carregarTarefas() {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        // 1. ROTA DO BACKEND: Buscar as tarefas vinculadas a esta etapa
        const response = await axios.get(`http://localhost:8080/tarefas/etapa/${idEtapa}`, { headers });
        const tarefasDoBanco = response.data;

        // 2. Distribuir as tarefas pelas colunas corretas consoante o estado
        const colunasAtualizadas = {
          'nao_iniciado': { ...colunasIniciais['nao_iniciado'], tarefas: [] },
          'em_andamento': { ...colunasIniciais['em_andamento'], tarefas: [] },
          'finalizado': { ...colunasIniciais['finalizado'], tarefas: [] }
        };

        tarefasDoBanco.forEach(tarefa => {
          const status = tarefa.status || 'nao_iniciado'; // Fallback de segurança
          if (colunasAtualizadas[status]) {
            colunasAtualizadas[status].tarefas.push(tarefa);
          }
        });

        setColunas(colunasAtualizadas);
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
      } finally {
        setLoading(false);
      }
    }
    carregarTarefas();
  }, [idEtapa]);

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    // Se o utilizador largou o cartão fora de uma zona válida, ignorar
    if (!destination) return;

    // Se largou no exato mesmo sítio de onde tirou, ignorar
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    // Fazer cópias das colunas para não alterar o estado diretamente
    const colunaOrigem = colunas[source.droppableId];
    const colunaDestino = colunas[destination.droppableId];
    const tarefasOrigem = Array.from(colunaOrigem.tarefas);
    const tarefasDestino = Array.from(colunaDestino.tarefas);

    // 1. Remover a tarefa da lista de origem
    const [tarefaMovida] = tarefasOrigem.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      // Movimento dentro da MESMA coluna (apenas reordenação)
      tarefasOrigem.splice(destination.index, 0, tarefaMovida);
      setColunas({
        ...colunas,
        [source.droppableId]: { ...colunaOrigem, tarefas: tarefasOrigem }
      });
    } else {
      // Movimento para uma coluna DIFERENTE
      // Atualizar o status localmente para refletir na interface
      tarefaMovida.status = destination.droppableId;
      tarefasDestino.splice(destination.index, 0, tarefaMovida);
      
      setColunas({
        ...colunas,
        [source.droppableId]: { ...colunaOrigem, tarefas: tarefasOrigem },
        [destination.droppableId]: { ...colunaDestino, tarefas: tarefasDestino }
      });

      // 2. ROTA DO BACKEND: Atualizar o status da tarefa no banco de dados
      try {
        const token = localStorage.getItem('token');
        await axios.put(
          `http://localhost:8080/tarefas/${draggableId}/status`, 
          { status: destination.droppableId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error('Erro ao atualizar status da tarefa no backend:', error);
        alert('Erro ao guardar a alteração. Por favor, atualize a página.');
      }
    }
  };

  return (
    <div className="processos-container">
      <div className="processos-header">
        <div>
          <h1>Kanban da Etapa</h1>
          <p>Arraste os cartões para atualizar o progresso das tarefas.</p>
        </div>
        <button className="btn-novo-caso" style={{ backgroundColor: '#64748b' }} onClick={() => navigate(`/etapas/caso/${idCaso}`)}>
          🡨 Voltar às Etapas
        </button>
      </div>

      <div className="processos-card">
        {loading ? (
          <p>A carregar o quadro...</p>
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
                                <strong>{tarefa.titulo_tarefa || 'Tarefa sem título'}</strong>
                                <p>{tarefa.descricao_tarefa || '...'}</p>
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