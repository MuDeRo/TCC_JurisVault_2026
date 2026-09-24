import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

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
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', backgroundColor: '#f4f2eb' }}>
      {/* SIDEBAR FIXA Á ESQUERDA */}
      <aside style={{ width: '240px', backgroundColor: '#0d1e36', color: '#fff', padding: '24px 16px', flexShrink: 0 }}>
        <div 
          style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', cursor: 'pointer' }}
          onClick={() => navigate('/inicio')}
        >
          <span style={{ fontSize: '1.5rem' }}>⚖️</span>
          <div>
            <h3 style={{ margin: 0, color: '#fff', fontSize: '1.1rem' }}>JurisVault</h3>
            <span style={{ fontSize: '0.65rem', color: '#cbb279', letterSpacing: '1px' }}>SISTEMA JURÍDICO</span>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: isActive ? '#172d4d' : 'transparent',
                  color: isActive ? '#ffffff' : '#a0aec0',
                  borderLeft: isActive ? '4px solid #cbb279' : '4px solid transparent',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '0.9rem'
                }}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* CONTEÚDO DINÂMICO À DIREITA */}
      <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
}