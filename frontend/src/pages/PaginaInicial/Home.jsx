import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layoutPagina/layout';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="portal-wrapper">
        
        {/* Painel Esquerdo com Títulos */}
        <div className="portal-left-header">
          <div className="divider-box">
            <div className="divider-line"></div>
            <span className="divider-icon">⚖️</span>
            <div className="divider-line"></div>
          </div>
          <h1 className="title-primary">Sistema</h1>
          <h1 className="title-secondary">Jurídico</h1>
          <p className="portal-subtitle">Selecione uma opção no menu ao lado</p>
        </div>

        {/* Os 3 Cards Brancos */}
        <div className="cards-grid">
          
          {/* Card 1 */}
          <div className="access-card">
            <div className="card-icon-box">👤</div>
            <h3 className="card-role">Cadastro de<br />Advogado</h3>
            <div className="gold-dot"></div>
            <p className="card-desc">Cadastre novos advogados no sistema</p>
            <button className="card-action-btn" onClick={() => navigate('/cadastrar-advogado')}>
              ACESSAR &gt;
            </button>
          </div>

          {/* Card 2 */}
          <div className="access-card">
            <div className="card-icon-box">🔑</div>
            <h3 className="card-role">Login de<br />Advogado</h3>
            <div className="gold-dot"></div>
            <p className="card-desc">Acesse sua conta de advogado</p>
            <button className="card-action-btn" onClick={() => navigate('/login-advogado')}>
              ACESSAR &gt;
            </button>
          </div>

          {/* Card 3 */}
          <div className="access-card">
            <div className="card-icon-box">🛡️</div>
            <h3 className="card-role">Área do<br />Administrador</h3>
            <div className="gold-dot"></div>
            <p className="card-desc">Acesse o painel administrativo do sistema</p>
            <button className="card-action-btn" onClick={() => navigate('/login-admin')}>
              ACESSAR &gt;
            </button>
          </div>

        </div>

      </div>
    </Layout>
  );
}