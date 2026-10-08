import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldUser, User, UserPlus, Scale } from 'lucide-react';
import './PaginaInicial.css';

import logoJurisVault from '../../assets/image-removebg-preview.png'; // Importe o logo do JurisVault

export default function PaginaInicial() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Header Superior */}
      <header className="home-header">
        <div className="home-header-brand">
          <Scale size={32} color='#c5a059' className="home-header-icon" />
          <h1>SISTEMA <span className="gold-text">JURÍDICO</span></h1>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="home-content">
        {/* Lado Esquerdo: Logo do JurisVault */}
        <div className="home-hero">
          <div className="home-hero-logo-wrapper">
            <img 
              src={logoJurisVault} 
              alt="JurisVault - Gestão Jurídica Inteligente" 
              className="home-hero-logo" 
            />
          </div>
          <p className="home-hero-subtitle">Selecione uma opção no menu ao lado</p>
        </div>

        {/* Lado Direito: Os 3 Cards */}
        <div className="home-cards-grid">
          {/* Card 1: Cadastro de Advogado */}
          <div className="home-card">
            <div className="home-card-icon-box">
              <UserPlus size={28} className="home-card-icon" />
            </div>
            <h3>Cadastro de Advogado</h3>
            <div className="home-card-divider">
              <span className="divider-dot"></span>
            </div>
            <p>Cadastre novos advogados no sistema</p>
            <button 
              className="home-card-btn"
              onClick={() => navigate('/cadastro')} // Vai para a rota de cadastro
            >
              ACESSAR &rsaquo;
            </button>
          </div>

          {/* Card 2: Login de Advogado */}
          <div className="home-card">
            <div className="home-card-icon-box">
              <User size={28} className="home-card-icon" />
            </div>
            <h3>Login de Advogado</h3>
            <div className="home-card-divider">
              <span className="divider-dot"></span>
            </div>
            <p>Acesse sua conta de advogado</p>
            <button 
              className="home-card-btn"
              onClick={() => navigate('/login')} // Vai para a rota de login de advogado
            >
              ACESSAR &rsaquo;
            </button>
          </div>

          {/* Card 3: Área do Administrador */}
          <div className="home-card">
            <div className="home-card-icon-box">
              <ShieldUser size={28} className="home-card-icon" />
            </div>
            <h3>Área do Administrador</h3>
            <div className="home-card-divider">
              <span className="divider-dot"></span>
            </div>
            <p>Acesse o painel administrativo do sistema</p>
            <button 
              className="home-card-btn"
              onClick={() => navigate('/login-admin')} // Vai para a rota de login do admin
            >
              ACESSAR &rsaquo;
            </button>
          </div>
        </div>
      </main>

      {/* Rodapé */}
      <footer className="home-footer">
        <p>© {new Date().getFullYear()} Sistema Jurídico. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}