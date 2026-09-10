import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  function sair() {
    navigate("/");
  }

  return (
    <div className="pagina-home">

      {/* CABEÇALHO */}
      <header className="cabecalho-home">

        <div className="logo-home">
          <span className="icone-logo-home">⚖</span>

          <span>
            SISTEMA <strong>JURÍDICO</strong>
          </span>
        </div>

        <nav className="menu-home">

          <button onClick={() => navigate("/home")}>
            Início
          </button>

          <button>
            Processos
          </button>

          <button>
            Prazos
          </button>

          <button>
            Documentos
          </button>

          <button>
            Clientes
          </button>

        </nav>

        <div className="acoes-home">

          <button
            className="botao-perfil"
            title="Perfil"
          >
            👤
          </button>

          <button
            className="botao-sair"
            onClick={sair}
          >
            Sair
          </button>

        </div>

      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="conteudo-home">

        <section className="boas-vindas">

          <div>
            <p className="texto-pequeno">
              PAINEL PRINCIPAL
            </p>

            <h1>
              Bem-vindo ao
              <br />
              <span>Sistema Jurídico</span>
            </h1>

            <p className="descricao-home">
              Gerencie seus processos, documentos,
              prazos e clientes em um único lugar.
            </p>
          </div>

          <div className="icone-balanca-home">
            ⚖
          </div>

        </section>

        {/* CARDS */}
        <section className="cards-home">

          <div
            className="card-home"
            onClick={() => navigate("/processos")}
          >
            <div className="icone-card">
              📁
            </div>

            <div>
              <h2>Processos</h2>

              <p>
                Consulte e gerencie seus processos jurídicos.
              </p>
            </div>

            <span className="seta-card">
              →
            </span>
          </div>

          <div className="card-home">

            <div className="icone-card">
              📅
            </div>

            <div>
              <h2>Prazos</h2>

              <p>
                Acompanhe os prazos e compromissos importantes.
              </p>
            </div>

            <span className="seta-card">
              →
            </span>

          </div>

          <div className="card-home">

            <div className="icone-card">
              📄
            </div>

            <div>
              <h2>Documentos</h2>

              <p>
                Organize e consulte seus documentos jurídicos.
              </p>
            </div>

            <span className="seta-card">
              →
            </span>

          </div>

          <div className="card-home">

            <div className="icone-card">
              👥
            </div>

            <div>
              <h2>Clientes</h2>

              <p>
                Consulte as informações dos seus clientes.
              </p>
            </div>

            <span className="seta-card">
              →
            </span>

          </div>

        </section>

        {/* RESUMO */}
        <section className="resumo-home">

          <h2>
            Visão geral
          </h2>

          <div className="resumo-cards">

            <div className="resumo-card">
              <span>Processos ativos</span>
              <strong>0</strong>
            </div>

            <div className="resumo-card">
              <span>Prazos próximos</span>
              <strong>0</strong>
            </div>

            <div className="resumo-card">
              <span>Documentos</span>
              <strong>0</strong>
            </div>

            <div className="resumo-card">
              <span>Clientes</span>
              <strong>0</strong>
            </div>

          </div>

        </section>

      </main>

      {/* RODAPÉ */}
      <footer className="rodape-home">
        © 2026 Sistema Jurídico — Todos os direitos reservados.
      </footer>

    </div>
  );
}

export default Home;