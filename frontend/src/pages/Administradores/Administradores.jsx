import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Administradores.css';
import api from '../../services/api.js';

export default function Administradores() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [filtroStatus, setFiltroStatus] = useState('Todos');
  const [loading, setLoading] = useState(true);

  // 1. Carregar pendentes e aprovados ao iniciar
  useEffect(() => {
    async function carregarAdvogados() {
      try {
        setLoading(true);

        const [resPendentes, resAprovados] = await Promise.all([
          api.get('/administrador/pendentes'),
          api.get('/administrador/aprovados')
        ]);

        // Imprime no console para você inspecionar exatamente a estrutura que veio do backend
        console.log('Resposta Pendentes:', resPendentes.data);
        console.log('Resposta Aprovados:', resAprovados.data);

        // Função auxiliar para extrair o array com segurança
        const extrairArray = (resposta) => {
          if (Array.isArray(resposta)) return resposta; // Se já for array
          if (resposta && Array.isArray(resposta.content)) return resposta.content; // Padrão Spring Boot
          if (resposta && Array.isArray(resposta.data)) return resposta.data; // Padrão chave 'data'
          if (resposta && Array.isArray(resposta.advogados)) return resposta.advogados; // Padrão chave 'advogados'
          if (resposta && Array.isArray(resposta.resultado)) return resposta.resultado;
          return []; // Fallback se não encontrar array
        };

        const listaPendentes = extrairArray(resPendentes.data);
        const listaAprovados = extrairArray(resAprovados.data);

        const normalizarAdvogado = (adv, status) => ({
          ...adv,
          id: adv.id_advogado ?? adv.id,
          nome: adv.nome_advogado,
          email: adv.email_advogado,
          oab: adv.registro_oab,
          status
        });

        const pendentes = listaPendentes.map(adv =>
          normalizarAdvogado(adv, 'Validando')
        );

        const aprovados = listaAprovados.map(adv =>
          normalizarAdvogado(adv, 'Aprovado')
        );

        // Junta tudo num array só para exibir na tabela
        setUsuarios([...pendentes, ...aprovados]);
      } catch (error) {
        console.error('Erro ao carregar advogados:', error);
        alert('Erro ao carregar a lista de advogados.');
      } finally {
        setLoading(false);
      }
    }

    carregarAdvogados();
  }, []);

  // 2. Função para Aprovar
  const handleAprovar = async (id) => {
    try {
      await api.patch(`/administrador/aprovar/${id}`);

      // Atualiza o estado local para mover o status para Aprovado
      setUsuarios(prev => prev.map(u => (u.id === id ? { ...u, status: 'Aprovado' } : u)));
    } catch (error) {
      console.error(error);
      alert('Erro ao aprovar o advogado.');
    }
  };

  // 3. Função para Negar
  const handleNegar = async (id) => {
    try {
      await api.patch(`/administrador/negar/${id}`);
      setUsuarios(prev => prev.map(u => (u.id === id ? { ...u, status: 'Negado' } : u)));
    } catch (error) {
      console.error(error);
      alert('Erro ao negar o advogado.');
    }
  };

  // 4. Função para Consultar OAB
  const handleConsultarOAB = () => {
    window.open('https://www2.oabsp.org.br/asp/consultainscritos/consulta01.asp', '_blank');
  };


  const totalAdvogados = usuarios.length;
  const pendentesValidacao = usuarios.filter(u => u.status === 'Validando').length;
  const utilizadoresAtivos = usuarios.filter(u => u.status === 'Aprovado').length;

  const usuariosFiltrados = usuarios.filter(usuario => {
    if (filtroStatus === 'Todos') return true;
    return usuario.status === filtroStatus;
  });

  if (loading) {
    return <div className="admin-container"><p>A carregar dados...</p></div>;
  }

  return (
    <div className="admin-container">
      {/* Topo do Painel */}
      <header className="admin-header">
        <div className="header-top-flex">
          <div className="title-container">
            <button className="btn-voltar" onClick={() => navigate('/')}>
              ← Voltar
            </button>

            <div>
              <h1 className="admin-title">Painel do Administrador</h1>
              <p className="admin-subtitle">
                Controlo global do escritório, equipas jurídicas e validação de acessos.
              </p>
            </div>
          </div>

          {/* Botão de Validar OAB no canto superior direito */}
          <button
            className="btn-validar-oab-top"
            onClick={handleConsultarOAB}
            title="Consultar inscritos no site da OAB-SP"
          >
            Validar OAB ↗
          </button>
        </div>
      </header>

      {/* Cards de Métricas */}
      <div className="metrics-grid">
        <div className="metric-card">
          <span className="metric-label">ADVOGADOS CADASTRADOS</span>
          <h2 className="metric-value text-blue">{totalAdvogados}</h2>
        </div>

        <div className="metric-card">
          <span className="metric-label">PENDENTES DE VALIDAÇÃO</span>
          <h2 className="metric-value text-yellow">{pendentesValidacao}</h2>
        </div>

        <div className="metric-card">
          <span className="metric-label">UTILIZADORES ATIVOS</span>
          <h2 className="metric-value text-green">{utilizadoresAtivos}</h2>
        </div>
      </div>

      {/* Secção da Tabela */}
      <section className="table-card">
        <div className="table-header-flex">
          <h2 className="table-title">Gestão de Acessos da Equipa</h2>

          {/* Filtros de Estado */}
          <div className="filter-tabs">
            {['Todos', 'Validando', 'Aprovado', 'Negado'].map(st => (
              <button
                key={st}
                className={`filter-btn ${filtroStatus === st ? 'active' : ''}`}
                onClick={() => setFiltroStatus(st)}
              >
                {st === 'Validando' ? 'Em Validação' : st}
              </button>
            ))}
          </div>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>NOME</th>
              <th>E-MAIL</th>
              <th>OAB / CARGO</th>
              <th>PERFIL</th>
              <th>STATUS</th>
              <th className="text-right">AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                  Nenhum utilizador encontrado para este filtro.
                </td>
              </tr>
            ) : (
              usuariosFiltrados.map(usuario => (
                <tr key={usuario.id}>
                  <td className="user-name">{usuario.nome}</td>
                  <td className="user-email">{usuario.email}</td>
                  <td>{usuario.oab || '-'}</td>
                  <td>
                    <span className="badge-perfil">{usuario.perfil || 'Advogado'}</span>
                  </td>
                  <td>
                    <span className={`badge-status status-${(usuario.status || '').toLowerCase()}`}>
                      {usuario.status === 'Validando' ? 'Validando...' : usuario.status}
                    </span>
                  </td>
                  <td className="actions-cell text-right">
                    {usuario.status === 'Validando' && (
                      <>
                        <button
                          className="btn-action approve"
                          onClick={() => handleAprovar(usuario.id)}
                        >
                          Aprovar
                        </button>
                        <button
                          className="btn-action reject"
                          onClick={() => handleNegar(usuario.id)}
                        >
                          Negar
                        </button>
                      </>
                    )}

                    {usuario.status === 'Aprovado' && (
                      <button
                        className="btn-action disable"
                        onClick={() => handleNegar(usuario.id)}
                      >
                        Desativar
                      </button>
                    )}

                    {usuario.status === 'Negado' && (
                      <button
                        className="btn-action approve"
                        onClick={() => handleAprovar(usuario.id)}
                      >
                        Reativar
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}