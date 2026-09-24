import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CampoPaginaAdm.css';

export default function CampoPaginaAdm() {
  const navigate = useNavigate();

  return (
    <div className="portal-container">
      <header className="portal-header">
        <span className="logo-icon">⚖️</span>
        <h3>SISTEMA <strong>JURÍDICO</strong></h3>
      </header>

      <main className="portal-content">
        <div className="portal-title">
          <div className="divider">
            <span>⚖️</span>
          </div>
          <h1>
            Sistema
            <span>Jurídico</span>
          </h1>
          <p>Selecione uma opção no menu ao lado</p>
        </div>

        <div className="cards-grid">
          {/* Card 1: Cadastro */}
          <div className="portal-card">
            <div className="card-icon">👤</div>
            <h3>Cadastro de Advogado</h3>
            <div className="gold-dot"></div>
            <p>Cadastre novos advogados no sistema</p>
            <button onClick={() => navigate('/cadastro')}>ACESSAR &gt;</button>
          </div>

          {/* Card 2: Login */}
          <div className="portal-card">
            <div className="card-icon">🔑</div>
            <h3>Login de Advogado</h3>
            <div className="gold-dot"></div>
            <p>Acesse sua conta de advogado</p>
            <button onClick={() => navigate('/login')}>ACESSAR &gt;</button>
          </div>

          {/* Card 3: Área Administrativa */}
          <div className="portal-card">
            <div className="card-icon">🛡️</div>
            <h3>Área do Administrador</h3>
            <div className="gold-dot"></div>
            <p>Acesse o painel administrativo do sistema</p>
            <button onClick={() => navigate('/inicio')}>ACESSAR &gt;</button>
          </div>
        </div>
      </main>
    </div>
  );
}