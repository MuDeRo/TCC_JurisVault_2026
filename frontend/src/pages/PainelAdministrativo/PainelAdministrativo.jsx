import React, { useState, useEffect } from 'react';
import api from '../../services/api'; // Ajuste o caminho para o seu api.js
import './PainelAdministrativo.css';

function PainelAdministrativo() {
  const [advogados, setAdvogados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // 1. Busca os advogados Pendentes e Aprovados simultaneamente
  const buscarAdvogados = async () => {
    try {
      setCarregando(true);

      const [resPendentes, resAprovados] = await Promise.all([
        api.get('/administrador/pendentes'),
        api.get('/administrador/aprovados')
      ]);

      // Garante a presença da tag de status em cada item recebido
      const pendentes = (resPendentes.data || []).map(adv => ({
        ...adv,
        status_advogado: adv.status_advogado || 'validando'
      }));

      const aprovados = (resAprovados.data || []).map(adv => ({
        ...adv,
        status_advogado: adv.status_advogado || 'aprovado'
      }));

      // Une as duas listas no estado local
      setAdvogados([...pendentes, ...aprovados]);
      setErro(null);
    } catch (err) {
      console.error('Erro ao buscar advogados:', err);
      setErro('Não foi possível carregar a lista de advogados.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarAdvogados();
  }, []);

  // 2. Aprova a permissão de acesso do advogado
  const aprovarAdvogado = async (id) => {
    try {
      await api.patch(`/administrador/aprovar/${id}`); 
      
      // Atualiza a interface localmente para 'aprovado'
      setAdvogados(prev =>
        prev.map(adv => (adv.id === id ? { ...adv, status_advogado: 'aprovado' } : adv))
      );
    } catch (err) {
      console.error('Erro ao aprovar advogado:', err);
      alert('Falha ao aprovar o advogado. Tente novamente.');
    }
  };

  // 3. Nega a permissão de acesso do advogado
  const removerCadastro = async (id) => {
    if (!window.confirm('Tem certeza que deseja negar o acesso deste advogado?')) return;

    try {
      await api.patch(`/administrador/negar/${id}`); 
      // Remove o advogado negado da visualização
      setAdvogados(prev => prev.filter(adv => adv.id !== id));
    } catch (err) {
      console.error('Erro ao negar advogado:', err);
      alert('Falha ao negar o acesso. Tente novamente.');
    }
  };

  // Cálculos dinâmicos dos cards de topo
  const totalAprovados = advogados.filter(
    a => (a.status_advogado || '').toLowerCase() === 'aprovado'
  ).length;

  const totalValidando = advogados.filter(
    a => (a.status_advogado || '').toLowerCase() === 'validando'
  ).length;

  return (
    <div className="painel-conteudo-wrapper">
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

        {/* Cards de Métricas Dinâmicos */}
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

        {/* Tabela de Advogados */}
        <div className="card-painel-dash">
          <div className="painel-header">
            <div>
              <h3 className="titulo-painel">Advogados cadastrados</h3>
              <p className="subtitulo-painel">Acompanhe os cadastros aprovados e pendentes de validação.</p>
            </div>
          </div>

          {carregando ? (
            <div style={{ padding: '24px', textAlign: 'center' }}>Carregando dados...</div>
          ) : erro ? (
            <div style={{ padding: '24px', color: '#e53e3e', textAlign: 'center' }}>{erro}</div>
          ) : (
            <div className="tabela-responsive">
              <table className="tabela-admin">
                <thead>
                  <tr>
                    <th>NOME</th>
                    <th>E-MAIL</th>
                    <th>OAB</th>
                    <th>UF</th>
                    <th>STATUS</th>
                    <th>AÇÕES</th>
                  </tr>
                </thead>
                <tbody>
                  {advogados.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '16px' }}>
                        Nenhum advogado cadastrado no momento.
                      </td>
                    </tr>
                  ) : (
                    advogados.map((adv) => {
                      const status = (adv.status_advogado || 'validando').toLowerCase();

                      return (
                        <tr key={adv.id}>
                          <td><strong>{adv.nome_advogado || adv.nome}</strong></td>
                          <td>{adv.email_advogado || adv.email}</td>
                          <td>{adv.registro_oab || adv.oab}</td>
                          <td>{adv.uf_oab || adv.uf}</td>
                          <td>
                            <span className={`badge-status-admin status-${status}`}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </span>
                          </td>
                          <td>
                            <div className="acoes-botoes-flex">
                              {status === 'validando' ? (
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
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PainelAdministrativo;