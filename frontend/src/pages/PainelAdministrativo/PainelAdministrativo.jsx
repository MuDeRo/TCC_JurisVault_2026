import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PainelAdministrativo.css';

function PainelAdministrativo() {
  const navigate = useNavigate();

  // Lista contendo apenas cadastros Aprovados e Validando (Pendentes)
  const [advogados, setAdvogados] = useState([
    { id: 1, nome: 'Lucas Almeida', email: 'lucas@email.com', oab: '123456', uf: 'SP', data_cad: '16/09/2026', status: 'Validando' },
    { id: 2, nome: 'Mariana Oliveira', email: 'mariana@email.com', oab: '654321', uf: 'SP', data_cad: '15/09/2026', status: 'Validando' },
    { id: 3, nome: 'Carlos Eduardo', email: 'carlos@email.com', oab: '789123', uf: 'RJ', data_cad: '10/09/2026', status: 'Aprovado' },
    { id: 4, nome: 'Fernanda Rocha', email: 'fernanda@email.com', oab: '456789', uf: 'MG', data_cad: '08/09/2026', status: 'Aprovado' },
  ]);

  const aprovarAdvogado = (id) => {
    setAdvogados(prev =>
      prev.map(adv => (adv.id === id ? { ...adv, status: 'Aprovado' } : adv))
    );
  };

  const removerCadastro = (id) => {
    setAdvogados(prev => prev.filter(adv => adv.id !== id));
  };

  const totalAprovados = advogados.filter(a => a.status === 'Aprovado').length;
  const totalValidando = advogados.filter(a => a.status === 'Validando').length;

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
          <button className="sidebar-link" onClick={() => navigate('/processos')}>
            🏠 Início
          </button>
          <button className="sidebar-link" onClick={() => navigate('/processos')}>
            📁 Processos
          </button>
          <button className="sidebar-link" onClick={() => navigate('/processos')}>
            👥 Clientes
          </button>
          <button className="sidebar-link" onClick={() => navigate('/processos')}>
            📄 Documentos
          </button>
          <button className="sidebar-link" onClick={() => navigate('/processos')}>
            ⏰ Prazos
          </button>
          <button className="sidebar-link ativo">
            🛡️ Administração
          </button>
        </nav>

        <button className="sidebar-link btn-sair-sidebar" onClick={() => navigate('/')}>
          ↪ Sair
        </button>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1 className="dashboard-titulo">Administração</h1>
            <p className="dashboard-subtitulo">Controle de usuários e acessos ao sistema.</p>
          </div>

          <div className="perfil-topo">
            <div className="notificacao-icon-box">
              🔔<span className="badge-notificacao">3</span>
            </div>
            <div className="avatar-circulo">KE</div>
            <div className="perfil-info">
              <span className="perfil-nome">Kaick Eduardo</span>
              <span className="perfil-cargo">Administrador</span>
            </div>
          </div>
        </header>

        <div className="admin-container">
          {/* Banner de Destaque */}
          <div className="banner-admin">
            <div className="banner-icon-box">⚖</div>
            <div>
              <h2 className="banner-titulo">Painel Administrativo</h2>
              <p className="banner-subtitulo">Gerencie os usuários cadastrados e suas permissões.</p>
            </div>
          </div>

          {/* Cards de Métricas (Apenas 2 Cards: Aprovados e Validando) */}
          <div className="cards-admin-grid">
            <div className="card-metrica-admin">
              <span className="valor-metrica">{String(totalAprovados).padStart(2, '0')}</span>
              <span className="label-metrica">Advogados aprovados</span>
            </div>

            <div className="card-metrica-admin destaque-alerta-amarelo">
              <span className="valor-metrica">{String(totalValidando).padStart(2, '0')}</span>
              <span className="label-metrica">Aguardando validação</span>
            </div>
          </div>

          {/* Tabela Unificada de Aprovados e Pendentes */}
          <div className="card-painel-dash">
            <div className="painel-header">
              <div>
                <h3 className="titulo-painel">Advogados cadastrados</h3>
                <p className="subtitulo-painel">Acompanhe os cadastros aprovados e pendentes de validação.</p>
              </div>
            </div>

            <div className="tabela-responsive">
              <table className="tabela-admin">
                <thead>
                  <tr>
                    <th>NOME</th>
                    <th>E-MAIL</th>
                    <th>OAB</th>
                    <th>UF</th>
                    <th>CADASTRO</th>
                    <th>STATUS</th>
                    <th>AÇÕES</th>
                  </tr>
                </thead>
                <tbody>
                  {advogados.map((adv) => (
                    <tr key={adv.id}>
                      <td><strong>{adv.nome}</strong></td>
                      <td>{adv.email}</td>
                      <td>{adv.oab}</td>
                      <td>{adv.uf}</td>
                      <td>{adv.data_cad}</td>
                      <td>
                        <span className={`badge-status-admin status-${adv.status.toLowerCase()}`}>
                          {adv.status}
                        </span>
                      </td>
                      <td>
                        <div className="acoes-botoes-flex">
                          {adv.status === 'Validando' ? (
                            <>
                              <button
                                className="btn-aprovar-admin"
                                onClick={() => aprovarAdvogado(adv.id)}
                              >
                                Aprovar
                              </button>
                              <button
                                className="btn-remover-admin"
                                onClick={() => removerCadastro(adv.id)}
                              >
                                Remover
                              </button>
                            </>
                          ) : (
                            <span className="texto-aprovado">Acesso Liberado</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PainelAdministrativo;