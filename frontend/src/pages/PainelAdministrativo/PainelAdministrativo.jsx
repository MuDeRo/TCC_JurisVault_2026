import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PainelAdministrativo.css';
import api from '../../services/api.js';


export default function PainelAdministrativo() {
  const navigate = useNavigate();

  // Estados preparados para receber os dados do Backend
  const [usuario, setUsuario] = useState({ nome: '', registroOab: '' });
  const [metricas, setMetricas] = useState({
    processosAtivos: 0,
    prazosSemana: 0,
    clientesAtendidos: 0,
    documentosEmitidos: 0,
  });
  const [processosRecentes, setProcessosRecentes] = useState([]);
  const [proximosPrazos, setProximosPrazos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Carregar dados do usuário autenticado no localStorage
    const userStored = localStorage.getItem('user');
    if (userStored) {
      setUsuario(JSON.parse(userStored));
    }

    // 2. Função para buscar os dados do Backend (API)
    async function carregarDadosDashboard() {
      try {
        setLoading(true);

        // Busca os Casos e as Tarefas do advogado logado
        const [resCasos, resTarefas] = await Promise.all([
          api.get('/casos/'),
          api.get('/tarefas/')
        ]);

        const casos = resCasos.data;
        const tarefas = resTarefas.data;

        // Calcula as métricas no Frontend
        const processosAtivos = casos.length; 
        const prazosNaSemana = tarefas.length; 

        setMetricas({
          processosAtivos: processosAtivos,
          prazosNaSemana: prazosNaSemana,
          documentosEmitidos: 0, // Como não tem rota de histórico, você pode deixar 0 ou buscar de /arquivos/
          taxaSucesso: '0%' // Backend não forneceu essa métrica nas rotas
        });

        // Pega apenas os últimos 5 casos para mostrar na tabela
        setProcessosRecentes(casos.slice(0, 5));

        // Pega as primeiras tarefas para o card lateral
        setProximosPrazos(tarefas.slice(0, 3));

      } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error);
      } finally {
        setLoading(false);
      }
    }

    carregarDadosDashboard();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Banner Superior de Boas-Vindas */}
      <div className="welcome-card">
        <div>
          <h2>Olá, {usuario.nome || 'Advogado'}! 👋</h2>
          <p>Aqui está o resumo das atividades jurídicas do seu escritório.</p>
        </div>
      </div>

      {/* Grid de Cards de Estatísticas */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-top">
            <span className="metric-label">Processos Ativos</span>
            <div className="metric-icon" style={{ background: '#eff6ff', color: '#3b82f6' }}>📂</div>
          </div>
          <div className="metric-value">{metricas.processosAtivos}</div>
          <span className="metric-trend">Carregado do banco</span>
        </div>

        <div className="metric-card">
          <div className="metric-top">
            <span className="metric-label">Prazos na Semana</span>
            <div className="metric-icon" style={{ background: '#fef3c7', color: '#d97706' }}>⏰</div>
          </div>
          <div className="metric-value" style={{ color: '#d97706' }}>{metricas.prazosSemana}</div>
          <span className="metric-trend" style={{ color: '#ef4444' }}>Urgentes</span>
        </div>

        <div className="metric-card">
          <div className="metric-top">
            <span className="metric-label">Clientes Atendidos</span>
            <div className="metric-icon" style={{ background: '#f0fdf4', color: '#10b981' }}>👥</div>
          </div>
          <div className="metric-value">{metricas.clientesAtendidos}</div>
          <span className="metric-trend">Ativos</span>
        </div>

        <div className="metric-card">
          <div className="metric-top">
            <span className="metric-label">Documentos Emitidos</span>
            <div className="metric-icon" style={{ background: '#f3e8ff', color: '#a855f7' }}>📄</div>
          </div>
          <div className="metric-value">{metricas.documentosEmitidos}</div>
          <span className="metric-trend">Sincronizado</span>
        </div>
      </div>

      {/* Grid Inferior: Tabela + Próximos Prazos */}
      <div className="dash-content-grid">
        {/* Tabela de Processos Recentes */}
        <div className="section-box">
          <div className="section-title">
            <span>Processos Recentes</span>
            <span
              style={{ fontSize: '0.8rem', color: '#3b82f6', cursor: 'pointer' }}
              onClick={() => navigate('/processos')}
            >
              Ver Todos →
            </span>
          </div>

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
                  <tr key={idx}>
                    <td style={{ fontWeight: '700' }}>{item.numeroProcesso || item.id}</td>
                    <td>{item.cliente}</td>
                    <td>{item.area || item.tipo}</td>
                    <td>
                      <span className={`status-badge ${item.status === 'Urgente' ? 'status-urgente' :
                          item.status === 'Concluído' ? 'status-concluido' : 'status-andamento'
                        }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '24px', color: '#94a3b8' }}>
                    {loading ? 'A carregar processos...' : 'Nenhum processo cadastrado no banco de dados.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Painel Lateral de Prazos Urgentes */}
        <div className="section-box">
          <div className="section-title">
            <span>Próximos Prazos</span>
            <span style={{ fontSize: '0.8rem', color: '#d97706', fontWeight: 'bold' }}>Urgentes</span>
          </div>

          <div className="deadline-list">
            {proximosPrazos.length > 0 ? (
              proximosPrazos.map((prazo, idx) => (
                <div className="deadline-item" key={idx}>
                  <div className={`deadline-dot ${prazo.urgente ? 'dot-red' : 'dot-amber'}`}></div>
                  <div className="deadline-info">
                    <h4>{prazo.descricao}</h4>
                    <p>Proc. {prazo.numeroProcesso} • <strong>{prazo.vencimento}</strong></p>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center', padding: '20px 0', color: '#94a3b8', fontSize: '0.85rem' }}>
                {loading ? 'A carregar prazos...' : 'Sem prazos pendentes no momento.'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}