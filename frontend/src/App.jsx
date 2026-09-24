import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import CadastroAdvogados from "./pages/CadastroAdvogados/CadastroAdvogados";
import LoginAdvogados from "./pages/LoginAdvogados/LoginAdvogados";
import Administradores from "./pages/Administradores/Administradores";
import PainelAdministrativo from "./pages/PainelAdministrativo/PainelAdministrativo";
import PainelAdvogado from "./pages/PainelAdvogado/PainelAdvogado";

import "./App.css";

function Inicio() {
  return (
    <div className="pagina-inicial">

      <header className="header">
        <div className="logo">
          <span className="logo-icone">⚖</span>

          <span>
            SISTEMA <strong>JURÍDICO</strong>
          </span>
        </div>
      </header>

      <main className="conteudo">

        <section className="titulo-area">

          <div className="linha-decorativa">
            <span></span>
            <div className="simbolo">⚖</div>
            <span></span>
          </div>

          <h1>
            Sistema <strong>Jurídico</strong>
          </h1>

          <div className="linha-pequena"></div>

          <p>
            Selecione uma opção no menu ao lado
          </p>

        </section>

        <section className="cards">

          <div className="card">

            <div className="icone-card">
             <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-plus"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
              <span className="icone-plus">+</span>
            </div>

            <h2>
              Cadastro de Advogado
            </h2>

            <div className="separador">
              <span></span>
            </div>

            <p>
              Cadastre novos advogados
              <br />
              no sistema
            </p>

            <Link to="/cadastro" className="botao">
              ACESSAR
              <span>›</span>
            </Link>

          </div>


          <div className="card">

            <div className="icone-card">
             <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round-check"><path d="M2 21a8 8 0 0 1 13.292-6"/><circle cx="10" cy="8" r="5"/><path d="m16 19 2 2 4-4"/></svg>
            </div>

            <h2>
              Login de Advogado
            </h2>

            <div className="separador">
              <span></span>
            </div>

            <p>
              Acesse sua conta
              <br />
              de advogado
            </p>

            <Link to="/login" className="botao">
              ACESSAR
              <span>›</span>
            </Link>

          </div>


          <div className="card">

            <div className="icone-card">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-shield"><path d="M10 15H6a4 4 0 0 0-4 4v2"/><path d="M22 17.5c0 2.499-1.75 3.749-3.83 4.474a.5.5 0 0 1-.335-.005c-2.085-.72-3.835-1.97-3.835-4.47V14a.5.5 0 0 1 .5-.499c1 0 2.25-.6 3.12-1.36a.6.6 0 0 1 .76-.001c.875.765 2.12 1.36 3.12 1.36a.5.5 0 0 1 .5.5z"/><circle cx="9" cy="7" r="4"/></svg>
            </div>

            <h2>
              Área do Administrador
            </h2>

            <div className="separador">
              <span></span>
            </div>

            <p>
              Acesse o painel administrativo
              <br />
              do sistema
            </p>

            <Link to="/administrador" className="botao">
              ACESSAR
              <span>›</span>
            </Link>

          </div>

        </section>

      </main>

      <footer className="footer">
        © 2026 Sistema Jurídico.
        Todos os direitos reservados.
      </footer>

    </div>
  );
}


function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* TELA INICIAL */}
        <Route
          path="/"
          element={<Inicio />}
        />

        {/* CADASTRO */}
        <Route
          path="/cadastro"
          element={<CadastroAdvogados />}
        />

        {/* LOGIN DO ADVOGADO */}
        <Route
          path="/login"
          element={<LoginAdvogados />}
        />

        {/* LOGIN DO ADMINISTRADOR */}
        <Route
          path="/administrador"
          element={<Administradores />}
        />

        {/* PAINEL ADMINISTRATIVO */}
        <Route
          path="/painel-administrativo"
          element={<PainelAdministrativo />}
        />

        {/* PAINEL DO ADVOGADO */}
        <Route
          path="/painel-advogado"
          element={<PainelAdvogado />}
        />

        {/* ROTA ANTIGA DO ADMINISTRADOR */}
        <Route
          path="/pagina-inicial-administrador"
          element={<PainelAdministrativo />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;