import { useState } from 'react';
import usePainelGeral from '../../hooks/usePainelGeral';
import './CampoPaginaAdm.css';

function CampoPaginaAdm() {
  const { processos, prazos, arquivos, carregando, erro } = usePainelGeral();
  const [menuPerfilAberto, setMenuPerfilAberto] = useState(false);

  function alternarMenuPerfil() {
    setMenuPerfilAberto((aberto) => !aberto);
  }

  function sair() {
    window.location.href = '/';
  }

  return (
    <div className="pagina-inicial-admin">
      <header className="cabecalho-inicial-admin">
        <div className="logo-inicial-admin">
          <span className="icone-logo">⚖</span>
          <strong>SISTEMA JURÍDICO</strong>
        </div>

        <nav className="navegacao-inicial-admin">
          <button className="botao-nav-inicial-admin" onClick={() => (window.location.href = '/processos')}>
            Processos
          </button>
          <button className="botao-nav-inicial-admin" onClick={() => (window.location.href = '/prazos')}>
            Prazos
          </button>
          <button className="botao-nav-inicial-admin" onClick={() => (window.location.href = '/arquivos')}>
            Arquivos
          </button>

          <div className="perfil-inicial-admin">
            <button
              className="botao-perfil-inicial-admin"
              onClick={alternarMenuPerfil}
              aria-haspopup="true"
              aria-expanded={menuPerfilAberto}
            >
              👤
            </button>

            {menuPerfilAberto && (
              <div className="menu-perfil-inicial-admin">
                <button onClick={() => (window.location.href = '/perfil')}>
                  Editar dados
                </button>
                <button onClick={sair}>Sair</button>
              </div>
            )}
          </div>
        </nav>
      </header>

      <main className="conteudo-inicial-admin">
        <div className="logo-grande-inicial-admin">
          <div className="marca-logo-grande-admin">
            <span className="linha-logo-grande-admin" />
            <span className="icone-logo-grande-admin">⚖</span>
            <span className="linha-logo-grande-admin" />
          </div>
          <h1 className="titulo-logo-grande-admin">Sistema</h1>
          <h2 className="subtitulo-logo-grande-admin">Jurídico</h2>
        </div>

        <div className="painel-dados-inicial-admin">
          {erro && <p className="mensagem-erro-inicial-admin">{erro}</p>}

          {carregando ? (
            <div className="carregando-inicial-admin">
              <span className="spinner-inicial-admin" />
              <p>Carregando informações...</p>
            </div>
          ) : (
            <section className="grade-cartoes-inicial-admin">
              <article className="cartao-inicial-admin">
                <h2>Processos</h2>
                <p className="numero-cartao-inicial-admin">{processos.length}</p>
                <ul className="lista-cartao-inicial-admin">
                  {processos.slice(0, 3).map((processo) => (
                    <li key={processo.id}>{processo.titulo}</li>
                  ))}
                  {processos.length === 0 && (
                    <li className="item-vazio-cartao-inicial-admin">Nenhum processo cadastrado</li>
                  )}
                </ul>
                <button
                  className="botao-cartao-inicial-admin"
                  onClick={() => (window.location.href = '/processos')}
                >
                  Ver todos ›
                </button>
              </article>

              <article className="cartao-inicial-admin">
                <h2>Prazos</h2>
                <p className="numero-cartao-inicial-admin">{prazos.length}</p>
                <ul className="lista-cartao-inicial-admin">
                  {prazos.slice(0, 3).map((prazo) => (
                    <li key={prazo.id}>{prazo.descricao}</li>
                  ))}
                  {prazos.length === 0 && (
                    <li className="item-vazio-cartao-inicial-admin">Nenhum prazo pendente</li>
                  )}
                </ul>
                <button className="botao-cartao-inicial-admin" onClick={() => (window.location.href = '/prazos')}>
                  Ver todos ›
                </button>
              </article>

              <article className="cartao-inicial-admin">
                <h2>Arquivos</h2>
                <p className="numero-cartao-inicial-admin">{arquivos.length}</p>
                <ul className="lista-cartao-inicial-admin">
                  {arquivos.slice(0, 3).map((arquivo) => (
                    <li key={arquivo.id}>{arquivo.nome}</li>
                  ))}
                  {arquivos.length === 0 && (
                    <li className="item-vazio-cartao-inicial-admin">Nenhum arquivo enviado</li>
                  )}
                </ul>
                <button
                  className="botao-cartao-inicial-admin"
                  onClick={() => (window.location.href = '/arquivos')}
                >
                  Ver todos ›
                </button>
              </article>
            </section>
          )}
        </div>
      </main>

      <footer className="rodape-inicial-admin">
        © 2026 Sistema Jurídico. Todos os direitos reservados.
      </footer>
    </div>
  );
}

export default CampoPaginaAdm;
