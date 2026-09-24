import React from 'react';
import './CampoPaginaAdm.css';

export default function CampoPaginaAdm() {
  return (
    <div className="pagina-inicial-content">
      <header className="page-header">
        <h1>Página Inicial</h1>
        <p>Visão geral do escritório</p>
      </header>

      <div className="welcome-banner">
        <h2>Olá, advogado!</h2>
        <p>Confira as principais informações do seu escritório.</p>
      </div>
    </div>
  );
}