import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Folder, UserRound, FileText } from 'lucide-react';
import './PainelAdministrativo.css';
import api from '../../services/api.js';

export default function PainelAdministrativo() {
  const navigate = useNavigate();

  const [metricas, setMetricas] = useState({
    processosAtivos: 0,
    prazosSemana: 0,
    clientesAtendidos: 0,
    documentosEmitidos: 0,
  });

  const [processosRecentes, setProcessosRecentes] = useState([]);
  const [proximosPrazos, setProximosPrazos] = useState([]);
  const [loading, setLoading] = useState(true);

  const nomeAdvogado =
    localStorage.getItem('nome_advogado') || 'Advogado';

  useEffect(() => {
    async function carregarDadosDashboard() {
      try {
        setLoading(true);

        const [resCasos, resTarefas] = await Promise.all([
          api.get('/casos/'),
          api.get('/tarefas/'),
        ]);

        const casos = Array.isArray(resCasos.data)
          ? resCasos.data
          : [];

        const tarefas = Array.isArray(resTarefas.data)
          ? resTarefas.data
          : [];

        setMetricas({
          processosAtivos: casos.length,
          prazosSemana: tarefas.length,
          clientesAtendidos: 0,
          documentosEmitidos: 0,
        });

        setProcessosRecentes(casos.slice(0, 5));
        setProximosPrazos(tarefas.slice(0, 3));
      } catch (error) {
        console.error('Erro ao buscar dados do painel:', error);
      } finally {
        setLoading(false);
      }
    }

    carregarDadosDashboard();
  }, []);

  return (
    <div className="dashboard-content">
      {/* Boas-vindas */}
      <div className="welcome-card">
        <div>
          <h1>Olá, {nomeAdvogado}! 👋</h1>

          <p>
            Aqui está o resumo das atividades jurídicas
            do seu escritório.
          </p>
        </div>

        <button
          type="button"
          className="btn-primary"
          onClick={() => navigate('/processos/novo')}
        >
          + Novo Processo
        </button>
      </div>

      {/* Cards de estatísticas */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-top">
            <span className="metric-label">
              Processos Ativos
            </span>

            <Folder
              size={20}
              color="#3b82f6"
              className="metric-icon"
            />
          </div>

          <div className="metric-value">
            {loading ? '...' : metricas.processosAtivos}
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-top">
            <span className="metric-label">
              Prazos Registrados
            </span>

            <Clock
              size={20}
              color="#d97706"
              className="metric-icon"
            />
          </div>

          <div className="metric-value">
            {loading ? '...' : metricas.prazosSemana}
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-top">
            <span className="metric-label">
              Clientes Atendidos
            </span>

            <UserRound
              size={20}
              color="#16a34a"
              className="metric-icon"
            />
          </div>

          <div className="metric-value">
            {metricas.clientesAtendidos}
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-top">
            <span className="metric-label">
              Documentos Emitidos
            </span>

            <FileText
              size={20}
              color="#6b7280"
              className="metric-icon"
            />
          </div>

          <div className="metric-value">
            {metricas.documentosEmitidos}
          </div>
        </div>
      </div>

      {/* Processos recentes e próximos prazos */}
      <div className="dash-content-grid">
        <div className="section-box">
          <div className="section-title">
            <span>Processos Recentes</span>

            <span
              style={{
                fontSize: '0.8rem',
                color: '#3b82f6',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/processos')}
            >
              Ver Todos →
            </span>
          </div>

          {loading ? (
            <p>Carregando processos...</p>
          ) : (
            <table className="custom-table">
              <thead>
                <tr>
                  <th>PROCESSO</th>
                  <th>CLIENTE</th>
                  <th>ÁREA</th>
                  <th>STATUS</th>
                </tr>
              </thead>

              <tbody>
                {processosRecentes.length > 0 ? (
                  processosRecentes.map((item, idx) => (
                    <tr key={item.id || idx}>
                      <td>
                        {item.numero_cnj ||
                          item.numeroProcesso ||
                          item.id ||
                          '-'}
                      </td>

                      <td>
                        {item.cliente ||
                          item.requerente?.nome ||
                          item.requerenteNome ||
                          item.nome_requerente ||
                          '-'}
                      </td>

                      <td>
                        {item.area || item.tipo || '-'}
                      </td>

                      <td>
                        <span
                          className={`status-badge ${
                            item.status === 'Urgente'
                              ? 'status-urgente'
                              : item.status === 'Concluído'
                                ? 'status-concluido'
                                : 'status-andamento'
                          }`}
                        >
                          {item.status || 'Em andamento'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">
                      Nenhum processo encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Próximos prazos */}
        <div className="deadlines-card">
          <div className="card-header-flex">
            <h3>Próximos Prazos</h3>

            <span className="urgentes-label">
              Prazos
            </span>
          </div>

          {loading ? (
            <p>Carregando prazos...</p>
          ) : proximosPrazos.length > 0 ? (
            <ul className="deadlines-list">
              {proximosPrazos.map((tarefa, idx) => (
                <li key={tarefa.id || idx}>
                  <span className="dot orange"></span>

                  <div>
                    <strong>
                      {tarefa.titulo ||
                        tarefa.descricao ||
                        tarefa.nome ||
                        'Tarefa jurídica'}
                    </strong>

                    <p>
                      {tarefa.data_prazo ||
                        tarefa.data ||
                        tarefa.prazo ||
                        'Data não informada'}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum prazo encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
}