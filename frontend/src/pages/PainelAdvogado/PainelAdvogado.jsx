import { Link } from "react-router-dom";

import "./PainelAdvogado.css";

function PainelAdvogado() {
  return (
    <div className="pagina-painel-advogado">

      {/* CABEÇALHO */}
      <header className="cabecalho-painel-advogado">

        <div className="logo-painel-advogado">
          <span className="icone-logo-advogado">
            ⚖
          </span>

          <span>
            SISTEMA <strong>JURÍDICO</strong>
          </span>
        </div>

        <nav className="menu-painel-advogado">

          <Link to="/processos">
            Processos
          </Link>

          <Link to="/prazos">
            Prazos
          </Link>

          <Link to="/arquivos">
            Arquivos
          </Link>

          <button className="botao-usuario-advogado">
            ♙
          </button>

        </nav>

      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="conteudo-painel-advogado">

        <div className="logo-central-advogado">

          <div className="linha-logo-advogado">

            <span></span>

            <div className="simbolo-central-advogado">
              ⚖
            </div>

            <span></span>

          </div>

          <h1>
            Sistema
          </h1>

          <h2>
            Jurídico
          </h2>

        </div>

      </main>

      {/* RODAPÉ */}
      <footer className="rodape-painel-advogado">

        © 2026 Sistema Jurídico. Todos os direitos reservados.

      </footer>

    </div>
  );
}

export default PainelAdvogado;