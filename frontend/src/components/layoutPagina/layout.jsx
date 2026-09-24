import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();

  const isAtivo = (caminho) => location.pathname === caminho;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* BARRA LATERAL AZUL ESCURO */}
      <aside style={{
        width: '240px',
        background: '#0a192f',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justify: 'space-between',
        padding: '24px 16px',
        boxSizing: 'border-box'
      }}>
        <div>
          {/* LOGO JURISVAULT */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px', paddingLeft: '8px' }}>
            <div style={{ background: '#b8863b', padding: '6px 8px', borderRadius: '6px', fontSize: '1.2rem' }}>⚖️</div>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#fff' }}>JurisVault</div>
              <div style={{ fontSize: '0.65rem', color: '#c49a45', letterSpacing: '1px', fontWeight: 'bold' }}>SISTEMA JURÍDICO</div>
            </div>
          </div>

          {/* MENUS */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link to="/painel" style={{
              display: 'block',
              padding: '10px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              background: isAtivo('/painel') ? '#c49a45' : 'transparent',
              color: isAtivo('/painel') ? '#fff' : '#94a3b8'
            }}>
              Início
            </Link>

            <Link to="/processos" style={{
              display: 'block',
              padding: '10px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '0.9rem',
              background: isAtivo('/processos') ? '#c49a45' : 'transparent',
              color: isAtivo('/processos') ? '#fff' : '#94a3b8'
            }}>
              Processos
            </Link>

            <Link to="/clientes" style={{
              display: 'block',
              padding: '10px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '0.9rem',
              background: isAtivo('/clientes') ? '#c49a45' : 'transparent',
              color: isAtivo('/clientes') ? '#fff' : '#94a3b8'
            }}>
              Clientes
            </Link>

            <Link to="/documentos" style={{
              display: 'block',
              padding: '10px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '0.9rem',
              background: isAtivo('/documentos') ? '#c49a45' : 'transparent',
              color: isAtivo('/documentos') ? '#fff' : '#94a3b8'
            }}>
              Documentos
            </Link>

            <Link to="/prazos" style={{
              display: 'block',
              padding: '10px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '0.9rem',
              background: isAtivo('/prazos') ? '#c49a45' : 'transparent',
              color: isAtivo('/prazos') ? '#fff' : '#94a3b8'
            }}>
              Prazos
            </Link>
          </nav>
        </div>

        {/* BOTÃO SAIR */}
        <Link to="/" style={{
          color: '#94a3b8',
          textDecoration: 'none',
          padding: '10px 16px',
          fontSize: '0.9rem',
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}>
          Sair
        </Link>
      </aside>

      {/* ÁREA DE CONTEÚDO PRINCIPAL */}
      <main style={{ flex: 1, background: '#e5e7eb' }}>
        <Outlet />
      </main>
    </div>
  );
}