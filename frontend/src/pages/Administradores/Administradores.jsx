import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Administradores.css';

export default function Administradores() {
  const navigate = useNavigate();

  // Lista de utilizadores
  const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      nome: 'Dr. Carlos Eduardo',
      email: 'carlos.eduardo@jurisvault.com',
      oab: 'SP 123.456',
      perfil: 'Advogado Sénior',
      status: 'Aprovado'
    },
    {
      id: 2,
      nome: 'Dra. Mariana Ramos',
      email: 'mariana.ramos@jurisvault.com',
      oab: 'RJ 654.321',
      perfil: 'Advogada Pleno',
      status: 'Aprovado'
    },
    {
      id: 3,
      nome: 'João Pedro Silva',
      email: 'joao.silva@jurisvault.com',
      oab: 'N/A',
      perfil: 'Administrador',
      status: 'Aprovado'
    },
    {
      id: 4,
      nome: 'Dr. Lucas Ferreira (Novo Cadastro)',
      email: 'lucas.ferreira@gmail.com',
      oab: 'SP 998.112',
      perfil: 'Advogado',
      status: 'Validando'
    },
    {
      id: 5,
      nome: 'Dra. Amanda Lima (Pendente)',
      email: 'amanda.lima@hotmail.com',
      oab: 'MG 445.123',
      perfil: 'Advogada',
      status: 'Validando'
    },
    {
      id: 6,
      nome: 'Dr. Roberto Santos',
      email: 'roberto.santos@email.com',
      oab: 'DF 001.234',
      perfil: 'Advogado',
      status: 'Negado'
    }
  ]);

  const [filtroStatus, setFiltroStatus] = useState('Todos');

  // Redireciona para o site oficial de consulta da OAB-SP
  const handleConsultarOAB = () => {
    window.open('https://www2.oabsp.org.br/asp/consultainscritos/consulta01.asp', '_blank');
  };

  const handleAprovar = (id) => {
    setUsuarios(prev =>
      prev.map(u => (u.id === id ? { ...u, status: 'Aprovado' } : u))
    );
  };

  const handleNegar = (id) => {
    setUsuarios(prev =>
      prev.map(u => (u.id === id ? { ...u, status: 'Negado' } : u))
    );
  };

  // Contadores para os Cards
  const totalAdvogados = usuarios.filter(u => u.perfil.includes('Advogad')).length;
  const pendentesValidacao = usuarios.filter(u => u.status === 'Validando').length;
  const utilizadoresAtivos = usuarios.filter(u => u.status === 'Aprovado').length;

  // Filtragem da tabela
  const usuariosFiltrados = usuarios.filter(u => {
    if (filtroStatus === 'Todos') return true;
    return u.status === filtroStatus;
  });

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
            {usuariosFiltrados.map(usuario => (
              <tr key={usuario.id}>
                <td className="user-name">{usuario.nome}</td>
                <td className="user-email">{usuario.email}</td>
                <td>{usuario.oab}</td>
                <td>
                  <span className="badge-perfil">{usuario.perfil}</span>
                </td>
                <td>
                  <span className={`badge-status status-${usuario.status.toLowerCase()}`}>
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
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}