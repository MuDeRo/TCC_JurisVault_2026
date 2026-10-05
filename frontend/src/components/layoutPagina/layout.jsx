import React from 'react';
import './Layout.css';

export default function Layout({ children }) {
  return (
    <div className="app-layout">
      {/* Conteúdo Principal sem Sidebar */}
      <div className="main-wrapper">
        {/* Barra Superior (Header) */}
        <header className="top-header">
          <div className="header-logo">
            <span className="header-icon">⚖️</span>
            <span className="header-title">SISTEMA <strong>JURÍDICO</strong></span>
          </div>
        </header>

        {/* Área Central Bege */}
        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  );
}