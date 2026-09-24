import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import './Layout.css';

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: 'Início', path: '/inicio', icon: '🏠' },
    { label: 'Processos', path: '/processos', icon: '📁' },
    { label: 'Clientes', path: '/clientes', icon: '👥' },
    { label: 'Documentos', path: '/documentos', icon: '📄' },
    { label: 'Prazos', path: '/prazos', icon: '⏰' },
    { label: 'Administração', path: '/administrador', icon: '🛡️' }
  ];

  return (
    <div className="app-layout">
      <aside className="app-sidebar">
        <div className="app-brand" onClick={() => navigate('/inicio')}>
          <div className="app-brand-icon">⚖️</div>
          <div>
            <h3>JurisVault</h3>
            <span>SISTEMA JURÍDICO</span>
          </div>
        </div>

        <nav className="app-nav">
          {menuItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <button
                key={item.path}
                className={isActive ? 'active' : ''}
                onClick={() => navigate(item.path)}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}