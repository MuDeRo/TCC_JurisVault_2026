import { useState } from 'react';
import './CampoPaginaAdm.css';

function CampoPaginaAdm() {
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
      </main>

      <footer className="rodape-inicial-admin">
        © 2026 Sistema Jurídico. Todos os direitos reservados.
      </footer>
    </div>
  );
}

export default CampoPaginaAdm;