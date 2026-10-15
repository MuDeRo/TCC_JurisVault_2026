
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldUser, User, UserPlus, Scale, Moon, Sun } from 'lucide-react';
import { useTema } from '../../context/ThemeContext.jsx';
import './PaginaInicial.css';

import logoJurisVault from '../../assets/image-removebg-preview.png';

export default function PaginaInicial() {
  const navigate = useNavigate();
  const { tema, alternarTema } = useTema();

  return (
    <div className="home-container">
      {/* Cabeçalho superior */}
      <header className="home-header">
        <div className="home-header-brand">
          <Scale
            size={32}
            color="#c5a059"
            className="home-header-icon"
          />

          <h1>
            SISTEMA <span className="gold-text">JURÍDICO</span>
          </h1>
        </div>

        {/* Botão de tema */}
        <button
          type="button"
          className="home-theme-button"
          onClick={alternarTema}
          aria-label={
            tema === 'claro'
              ? 'Ativar tema escuro'
              : 'Ativar tema claro'
          }
        >
          {tema === 'claro' ? (
            <>
              <Moon size={18} />
              <span>Tema escuro</span>
            </>
          ) : (
            <>
              <Sun size={18} />
              <span>Tema claro</span>
            </>
          )}
        </button>
      </header>

      {/* Conteúdo principal */}
      <main className="home-content">
        {/* Logo do JurisVault */}
        <div className="home-hero">
          <div className="home-hero-logo-wrapper">
            <img
              src={logoJurisVault}
              alt="JurisVault - Gestão Jurídica Inteligente"
              className="home-hero-logo"
            />
          </div>

          <p className="home-hero-subtitle">
            Selecione uma opção no menu ao lado
          </p>
        </div>

        {/* Cards de acesso */}
        <div className="home-cards-grid">
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
              type="button"
              className="home-card-btn"
              onClick={() => navigate('/cadastro')}
            >
              ACESSAR &rsaquo;
            </button>
          </div>

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
              type="button"
              className="home-card-btn"
              onClick={() => navigate('/login')}
            >
              ACESSAR &rsaquo;
            </button>
          </div>

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
              type="button"
              className="home-card-btn"
              onClick={() => navigate('/login-admin')}
            >
              ACESSAR &rsaquo;
            </button>
          </div>
        </div>
      </main>

      {/* Rodapé */}
      <footer className="home-footer">
        <p>
          © {new Date().getFullYear()} Sistema Jurídico.
          Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}
