import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import CadastroAdvogados from "./pages/CadastroAdvogados/CadastroAdvogados";
import LoginAdvogados from "./pages/LoginAdvogados/LoginAdvogados";
import Administradores from "./pages/Administradores/Administradores";
import Processos from "./pages/Processos/Processos";

import "./App.css";
function Inicio() {
  return (
    <div className="pagina-inicial">

      <header className="header">
        <div className="logo">
          <span className="logo-icone">⚖</span>
          <span>SISTEMA <strong>JURÍDICO</strong></span>
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

          <p>Selecione uma opção no menu ao lado</p>
        </section>

        <section className="cards">

          <div className="card">

            <div className="icone-card">
              👤
              <span className="icone-plus">+</span>
            </div>

            <h2>Cadastro de Advogado</h2>

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
              🔒
            </div>

            <h2>Login de Advogado</h2>

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
              🛡
            </div>

            <h2>Área do Administrador</h2>

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
        © 2026 Sistema Jurídico. Todos os direitos reservados.
      </footer>

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Inicio />} />

        <Route
          path="/cadastro"
          element={<CadastroAdvogados />}
        />
        <Route
          path="/login"
          element={<LoginAdvogados />}
        />
        <Route
          path="/administrador"
          element={<Administradores />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;