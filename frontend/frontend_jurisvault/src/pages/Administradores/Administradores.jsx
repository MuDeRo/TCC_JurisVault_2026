import { useState } from 'react';
import CampoFormulario from '../../components/Administradores/CampoFormulario';
import './Administradores.css';


function Administradores() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [autenticado, setAutenticado] = useState(false);

  const LOGIN_CORRETO = 'admin.global38721@gmail.com';
  const SENHA_CORRETA = 'admin123';

  function quandoDigitarLogin(e) {
    setLogin(e.target.value);
    setErro('');
  }

  function quandoDigitarSenha(e) {
    setSenha(e.target.value);
    setErro('');
  }

  function entrar(e) {
    e.preventDefault();

    if (login === '' || senha === '') {
      setErro('Preencha o login e a senha.');
      return;
    }

    if (login === LOGIN_CORRETO && senha === SENHA_CORRETA) {
      setAutenticado(true);
      setErro('');
    } else {
      setErro('Login ou senha incorretos.');
    }
  }

  /* =========================
     ACESSO LIBERADO
  ========================= */

  if (autenticado) {
    return (
      <div className="pagina-administradores">

        <header className="cabecalho-admin">
          <div className="logo-admin">
            <span className="icone-logo">⚖</span>

            <span>
              SISTEMA <strong>JURÍDICO</strong>
            </span>
          </div>

          <span className="area-admin">
            ÁREA ADMINISTRATIVA
          </span>
        </header>

        <main className="conteudo-admin">

          <div className="card-admin sucesso-admin">

            <div className="icone-sucesso-admin">
              ✓
            </div>

            <span className="badge-admin">
              ACESSO AUTORIZADO
            </span>

            <h1>Bem-vindo, administrador</h1>

            <p>
              Seu acesso foi validado com sucesso.
            </p>

            <button
              className="botao-painel"
              onClick={() => window.location.href = '/'}
            >
              Acessar Painel
              <span>→</span>
            </button>

          </div>

        </main>

        <footer className="rodape-admin">
          © 2026 Sistema Jurídico — Área Administrativa
        </footer>

      </div>
    );
  }

  /* =========================
     LOGIN ADMINISTRATIVO
  ========================= */

  return (
    <div className="pagina-administradores">

      {/* CABEÇALHO */}

      <header className="cabecalho-admin">

        <div className="logo-admin">

          <span className="icone-logo">
            ⚖
          </span>

          <span>
            SISTEMA <strong>JURÍDICO</strong>
          </span>

        </div>

        <span className="area-admin">
          ÁREA ADMINISTRATIVA
        </span>

      </header>

      {/* CONTEÚDO */}

      <main className="conteudo-admin">

        <div className="card-admin">

          {/* ÍCONE */}

          <div className="icone-admin">
            🔐
          </div>

          {/* TÍTULO */}

          <h1>Acesso Administrativo</h1>

          <p className="descricao-admin">
            Entre com suas credenciais para acessar
            o painel administrativo.
          </p>

          {/* FORMULÁRIO */}

          <form onSubmit={entrar}>

            <CampoFormulario
              label="Login"
              tipo="text"
              valor={login}
              aoMudar={quandoDigitarLogin}
            />

            <CampoFormulario
              label="Senha"
              tipo="password"
              valor={senha}
              aoMudar={quandoDigitarSenha}
            />

            {/* ERRO */}

            {erro !== '' && (
              <div className="mensagem-erro-admin">
                <span>!</span>
                {erro}
              </div>
            )}

            {/* BOTÃO */}

            <button
              type="submit"
              className="botao-entrar-admin"
            >
              Entrar
              <span>→</span>
            </button>

          </form>

          {/* SEGURANÇA */}

          <div className="seguranca-admin">

            <span>🔒</span>

            <div>
              <strong>Acesso restrito</strong>

              <p>
                Esta área é destinada exclusivamente
                aos administradores do sistema.
              </p>
            </div>

          </div>

        </div>

      </main>

      {/* RODAPÉ */}

      <footer className="rodape-admin">
        © 2026 Sistema Jurídico — Área Administrativa
      </footer>

    </div>
  );
}

export default Administradores;