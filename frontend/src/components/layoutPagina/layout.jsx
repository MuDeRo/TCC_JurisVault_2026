
import React from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { Scale } from 'lucide-react';
import { useTema } from '../../context/ThemeContext.jsx';
import './Layout.css';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { tema, alternarTema } = useTema();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/');
  };

  const isAtivo = (caminho) => {
    if (caminho === '/processos') {
      return location.pathname === '/processos';
    }

    return location.pathname === caminho;
  };

  return (
    <div className="layout-container">
      <aside className="sidebar">
        <div className="logo-area">
          <Scale size={32} color="#c49a45" />

          <div>
            <h2>JurisVault</h2>
            <span>SISTEMA JURÍDICO</span>
          </div>
        </div>

        <nav className="nav-menu">
          <Link
            to="/painel"
            className={`nav-item ${isAtivo('/painel') ? 'active' : ''}`}
          >
            📁 Início
          </Link>

          <Link
            to="/processos"
            className={`nav-item ${isAtivo('/processos') ? 'active' : ''}`}
          >
            📂 Processos
          </Link>

        
          <Link
            to="/documentos"
            className={`nav-item ${isAtivo('/documentos') ? 'active' : ''}`}
          >
            📄 Documentos
          </Link>

          <Link
            to="/prazos"
            className={`nav-item ${isAtivo('/prazos') ? 'active' : ''}`}
          >
            📅 Prazos
          </Link>

          <Link
            to="/etapas"
            className={`nav-item ${isAtivo('/etapas') ? 'active' : ''}`}
          >
            ⚙️ Etapas
          </Link>
        </nav>

       
        <button
          className="btn-sair"
          type="button"
          onClick={handleLogout}
        >
          🚪 Sair
        </button>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
