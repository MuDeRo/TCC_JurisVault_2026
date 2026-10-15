import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Layout.css';

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Adiciona aqui a limpeza de token/sessão se necessário
    navigate('/');
  };

  return (
    <div className="layout-container">
      {/* MENU LATERAL (SIDEBAR) */}
      <aside className="sidebar">
        <div className="logo-area">
          <h2>⚖️ JurisVault</h2>
          <span>SISTEMA JURÍDICO</span>
        </div>

        <nav className="nav-menu">
          <Link 
            to="/painel" 
            className={`nav-item ${location.pathname === '/painel' ? 'active' : ''}`}
          >
            📁 Início
          </Link>
          <Link 
            to="/processos" 
            className={`nav-item ${location.pathname === '/processos' ? 'active' : ''}`}
          >
            📂 Processos
          </Link>
          <Link 
            to="/documentos" 
            className={`nav-item ${location.pathname === '/documentos' ? 'active' : ''}`}
          >
            📄 Documentos
          </Link>
          <Link 
            to="/prazos" 
            className={`nav-item ${location.pathname === '/prazos' ? 'active' : ''}`}
          >
            📅 Calendário
          </Link>
        </nav>

        <button className="btn-sair" onClick={handleLogout}>
          🚪 Sair
        </button>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}