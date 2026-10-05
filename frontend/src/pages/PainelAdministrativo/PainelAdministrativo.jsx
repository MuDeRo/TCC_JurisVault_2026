import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PainelAdministrativo.css';

export default function PainelAdministrativo() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      {/* Sidebar Esquerda */}
      <aside className="dashboard-sidebar">
        <div className="brand-box">
          <div className="brand-logo-icon">⚖️</div>
          <div>
            <h2 className="brand-name">JurisVault</h2>
            <span className="brand-subtitle">SISTEMA JURÍDICO</span>
          </div>
        </div>

        <nav className="sidebar-menu">
          <button className="menu-btn active">📁 Início</button>
          <button className="menu-btn">📂 Processos</button>
          <button className="menu-btn">👥 Clientes</button>
          <button className="menu-btn">📄 Documentos</button>
          <button className="menu-btn">⏰ Prazos</button>
        </nav>

        <button className="logout-btn" onClick={() => navigate('/')}>
          Sair
        </button>
      </aside>

      {/* Área de Conteúdo */}
      <main className="dashboard-content">
        
        {/* Banner de Boas-Vindas */}
        <div className="welcome-banner">
          <div>
            <h1>Olá, Dr. Advogado Teste! 👋</h1>
            <p>Aqui está o resumo das atividades jurídicas do seu escritório.</p>
          </div>
          <button className="btn-primary" onClick={() => navigate('/cadastrar-processo')}>
            + Novo Processo
          </button>
        </div>

        {/* Cards de Estatísticas */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-title">PROCESSOS ATIVOS</span>
              <span className="stat-icon yellow">📁</span>
            </div>
            <div className="stat-value">28</div>
            <span className="stat-trend positive">↑ 12% este mês</span>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-title">PRAZOS NA SEMANA</span>
              <span className="stat-icon red">⏰</span>
            </div>
            <div className="stat-value orange">5</div>
            <span className="stat-trend alert">2 vencem hoje</span>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-title">CLIENTES ATENDIDOS</span>
              <span className="stat-icon purple">👥</span>
            </div>
            <div className="stat-value">42</div>
            <span className="stat-trend positive">↑ 4 novos este mês</span>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-title">DOCUMENTOS EMITIDOS</span>
              <span className="stat-icon light-purple">📄</span>
            </div>
            <div className="stat-value">114</div>
            <span className="stat-trend neutral">Atualizado hoje</span>
          </div>
        </div>

        {/* Seção Inferior (Tabela + Prazos) */}
        <div className="dashboard-grid">
          
          {/* Tabela de Processos Recentes */}
          <div className="table-card">
            <div className="card-header-flex">
              <h3>Processos Recentes</h3>
              <a href="#todos" className="link-action">Ver Todos →</a>
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
                <tr>
                  <td><strong>1029384-12.2026.8.26.0100</strong></td>
                  <td>João Silva</td>
                  <td>Trabalhista</td>
                  <td><span className="badge blue">Em Andamento</span></td>
                </tr>
                <tr>
                  <td><strong>5093811-90.2025.8.26.0000</strong></td>
                  <td>Maria Santos</td>
                  <td>Cível</td>
                  <td><span className="badge red">Urgente</span></td>
                </tr>
                <tr>
                  <td><strong>2210394-44.2026.8.26.0200</strong></td>
                  <td>Empresa XYZ Ltda</td>
                  <td>Tributário</td>
                  <td><span className="badge blue">Em Andamento</span></td>
                </tr>
                <tr>
                  <td><strong>8839201-11.2025.8.26.0050</strong></td>
                  <td>Carlos Eduardo</td>
                  <td>Penal</td>
                  <td><span className="badge green">Concluído</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Painel Próximos Prazos */}
          <div className="deadlines-card">
            <div className="card-header-flex">
              <h3>Próximos Prazos</h3>
              <span className="urgentes-label">Urgentes</span>
            </div>

            <ul className="deadlines-list">
              <li>
                <span className="dot red"></span>
                <div>
                  <strong>Réplica à Contestação</strong>
                  <p>Proc. 1029384-12 • <strong>Hoje às 17:00</strong></p>
                </div>
              </li>

              <li>
                <span className="dot orange"></span>
                <div>
                  <strong>Audiência de Conciliação</strong>
                  <p>Proc. 5093811-90 • <strong>Amanhã às 14:30</strong></p>
                </div>
              </li>

              <li>
                <span className="dot blue"></span>
                <div>
                  <strong>Juntada de Procuração</strong>
                  <p>Proc. 2210394-44 • <strong>Em 3 dias</strong></p>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </main>
    </div>
  );
}