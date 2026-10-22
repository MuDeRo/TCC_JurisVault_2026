import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  Folder,
  UserRound,
  FileText,
  Search,
} from 'lucide-react';

import './PainelAdministrativo.css';
import api from '../../services/api.js';
import BotaoTema from '../../components/BotaoTema/BotaoTema.jsx';

// Componente reutilizável para o carregamento
function Skeleton({ largura = '100%' }) {
  return (
    <div
      className="skeleton"
      style={{ width: largura }}
      aria-hidden="true"
    />
  );
}

// Componente reutilizável para os indicadores
function CardMetrica({ titulo, valor, icone: Icone, cor, loading }) {
  return (
    <div className="metric-card">
      <div className="metric-top">
        <span className="metric-label">{titulo}</span>
        <Icone size={20} color={cor} />
      </div>

      <div className="metric-value">
        {loading ? <Skeleton largura="65px" /> : valor}
      </div>
    </div>
  );
}

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
  const [pesquisa, setPesquisa] = useState('');
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

  // Filtra os processos conforme o usuário digita
  const processosFiltrados = processosRecentes.filter((item) => {
    const numero =
      item.numero_cnj || item.numeroProcesso || item.id || '';

    const cliente =
      item.cliente ||
      item.requerente?.nome ||
      item.requerenteNome ||
      item.nome_requerente ||
      '';

    const area = item.area || item.tipo || '';

    const texto = `${numero} ${cliente} ${area} ${item.status || ''}`;

    return texto.toLowerCase().includes(pesquisa.toLowerCase());
  });

  return (
    <div className="dashboard-content">
      <div className="welcome-card">
        <div>
          <h1>Olá, {nomeAdvogado}! 👋</h1>
          <p>
            Aqui está o resumo das atividades jurídicas
            do seu escritório.
          </p>
        </div>

        <div className="welcome-actions">
          <BotaoTema />

          <button
            type="button"
            className="btn-primary"
            onClick={() => navigate('/processos/novo')}
          >
            + Novo Processo
          </button>
        </div>
      </div>

      <div className="metrics-grid">
        <CardMetrica
          titulo="Processos Ativos"
          valor={metricas.processosAtivos}
          icone={Folder}
          cor="#3b82f6"
          loading={loading}
        />

        <CardMetrica
          titulo="Prazos Registrados"
          valor={metricas.prazosSemana}
          icone={Clock}
          cor="#d97706"
          loading={loading}
        />

        <CardMetrica
          titulo="Clientes Atendidos"
          valor={metricas.clientesAtendidos}
          icone={UserRound}
          cor="#16a34a"
          loading={loading}
        />

        <CardMetrica
          titulo="Documentos Emitidos"
          valor={metricas.documentosEmitidos}
          icone={FileText}
          cor="#6b7280"
          loading={loading}
        />
      </div>

      <div className="dash-content-grid">
        <div className="section-box">
          <div className="section-title">
            <span>Processos Recentes</span>

            <button
              type="button"
              className="link-processos"
              onClick={() => navigate('/processos')}
            >
              Ver Todos →
            </button>
          </div>

          <div className="pesquisa-processos">
            <Search size={18} />

            <input
              type="text"
              placeholder="Pesquisar processo, cliente ou área..."
              value={pesquisa}
              onChange={(event) => setPesquisa(event.target.value)}
              aria-label="Pesquisar processos"
            />
          </div>

          {loading ? (
            <div className="skeleton-list" aria-label="Carregando processos">
              {Array.from({ length: 4 }).map((_, index) => (
                <div className="skeleton-row" key={index}>
                  <Skeleton largura="80%" />
                  <Skeleton largura="60%" />
                  <Skeleton largura="70%" />
                  <Skeleton largura="55%" />
                </div>
              ))}
            </div>
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
                {processosFiltrados.length > 0 ? (
                  processosFiltrados.map((item, idx) => (
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

                      <td>{item.area || item.tipo || '-'}</td>

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
                      {pesquisa
                        ? 'Nenhum processo corresponde à pesquisa.'
                        : 'Nenhum processo encontrado.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        <div className="deadlines-card">
          <div className="card-header-flex">
            <h3>Próximos Prazos</h3>
            <span className="urgentes-label">Prazos</span>
          </div>

          {loading ? (
            <div className="skeleton-list">
              {Array.from({ length: 3 }).map((_, index) => (
                <div className="skeleton-deadline" key={index}>
                  <Skeleton largura="90%" />
                  <Skeleton largura="55%" />
                </div>
              ))}
            </div>
          ) : proximosPrazos.length > 0 ? (
            <ul className="deadlines-list">
              {proximosPrazos.map((tarefa, idx) => (
                <li key={tarefa.id || idx}>
                  <span className="dot orange" />

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