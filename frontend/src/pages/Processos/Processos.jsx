import React, { useState } from 'react';
import ListaProcessos from './ListaProcessos.jsx';
import CadastroProcesso from './CadastroProcesso.jsx';
import Documentos from './Documentos.jsx';
import Clientes from './Clientes.jsx';
import Prazos from './Prazos.jsx';
import './Processos.css';

const MENU = [
  { id: 'inicio', label: 'Início' },
  { id: 'processos', label: 'Processos' },
  { id: 'clientes', label: 'Clientes' },
  { id: 'documentos', label: 'Documentos' },
  { id: 'prazos', label: 'Prazos' },
];

function Processos({ usuario, onLogout }) {
  const [abaAtiva, setAbaAtiva] = useState('inicio');

  const usuarioLogado = usuario || JSON.parse(localStorage.getItem('usuarioLogado')) || {
    nome: 'advogado',
    cargo: 'Administrador',
  };

  const primeiroNome = usuarioLogado.nome
    ? usuarioLogado.nome.trim().split(' ')[0]
    : 'Advogado';

  const obterIniciais = (nome) => {
    if (!nome) return 'US';
    const partes = nome.trim().split(' ');
    if (partes.length === 1) return partes[0].substring(0, 2).toUpperCase();
    return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
  };

  return (
    <div className="layout-dashboard">
      <aside className="sidebar-container">
        <div className="sidebar-header">
          <div className="sidebar-logo-box">⚖</div>
          <div>
            <h1 className="sidebar-titulo">JurisVault</h1>
            <span className="sidebar-subtitulo">SISTEMA JURÍDICO</span>
          </div>
        </div>

        <nav className="sidebar-menu">
          {MENU.map((item) => (
            <button
              key={item.id}
              className={`sidebar-link ${abaAtiva === item.id ? 'ativo' : ''}`}
              onClick={() => setAbaAtiva(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button className="sidebar-link btn-sair-sidebar" onClick={onLogout}>
          Sair
        </button>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1 className="dashboard-titulo">
              {abaAtiva === 'inicio' && 'Página Inicial'}
              {abaAtiva === 'processos' && 'Gestão de Processos'}
              {abaAtiva === 'clientes' && 'Carteira de Clientes'}
              {abaAtiva === 'documentos' && 'Documentos e Contratos'}
              {abaAtiva === 'prazos' && 'Prazos e Compromissos'}
              {abaAtiva === 'novo_processo' && 'Novo Caso'}
            </h1>
            <p className="dashboard-subtitulo">Visão geral do escritório</p>
          </div>
          <div className="perfil-topo">
            <div className="avatar-circulo">{obterIniciais(usuarioLogado.nome)}</div>
            <div className="perfil-info">
              <span className="perfil-nome">{usuarioLogado.nome}</span>
              <span className="perfil-cargo">{usuarioLogado.cargo || 'Advogado'}</span>
            </div>
          </div>
        </header>

        {abaAtiva === 'inicio' && (
          <section className="boas-vindas-container">
            <div>
              <h2 className="boas-vindas-titulo">Olá, {primeiroNome}!</h2>
              <p className="boas-vindas-subtitulo">
                Confira as principais informações do seu escritório.
              </p>
            </div>
            <button
              className="btn-novo-processo"
              onClick={() => setAbaAtiva('novo_processo')}
            >
              + Novo processo
            </button>
          </section>
        )}

        {abaAtiva === 'processos' && (
          <ListaProcessos onNovoProcesso={() => setAbaAtiva('novo_processo')} />
        )}

        {abaAtiva === 'novo_processo' && (
          <CadastroProcesso
            onCancelar={() => setAbaAtiva('processos')}
            onSucesso={() => setAbaAtiva('processos')}
          />
        )}

        {abaAtiva === 'clientes' && <Clientes />}

        {abaAtiva === 'documentos' && <Documentos />}

        {abaAtiva === 'prazos' && <Prazos />}
      </main>
    </div>
  );
}

export default Processos;