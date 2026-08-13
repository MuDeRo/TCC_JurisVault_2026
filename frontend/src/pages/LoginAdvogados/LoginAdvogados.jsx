import { useState } from 'react';
import CampoLogin from '../../components/Advogados/CampoLogin';
import './LoginAdvogado.css';

function LoginAdvogados({ advogadoCadastrado }) {
  const [emailDigitado, setEmailDigitado] = useState('');
  const [senhaDigitada, setSenhaDigitada] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');

  function quandoDigitarEmail(e) {
    setEmailDigitado(e.target.value);
    setMensagemErro('');
  }

  function quandoDigitarSenha(e) {
    setSenhaDigitada(e.target.value);
    setMensagemErro('');
  }

  function realizarLogin(e) {
    e.preventDefault();

    if (!emailDigitado || !senhaDigitada) {
      setMensagemErro('Preencha o e-mail e a senha.');
      return;
    }

    if (
      !advogadoCadastrado ||
      emailDigitado !== advogadoCadastrado.email ||
      senhaDigitada !== advogadoCadastrado.senha
    ) {
      setMensagemErro('E-mail ou senha incorretos.');
      return;
    }

    setMensagemErro('');
  }

  const loginValido =
    advogadoCadastrado &&
    emailDigitado === advogadoCadastrado.email &&
    senhaDigitada === advogadoCadastrado.senha &&
    mensagemErro === '';

  if (loginValido) {
    return (
      <div className="pagina-login-advogados">

        <header className="cabecalho-login">
          <div className="logo-login">
            <span className="icone-logo">⚖</span>
            <span>
              SISTEMA <strong>JURÍDICO</strong>
            </span>
          </div>
        </header>

        <main className="conteudo-login">

          <div className="card-login sucesso-login">

            <div className="icone-sucesso">
              ✓
            </div>

            <h1>Bem-vindo!</h1>

            <h2>{advogadoCadastrado.nome}</h2>

            <p>
              Seu acesso foi liberado com sucesso.
            </p>

            <button
              className="botao-continuar"
              onClick={() => window.location.href = '/'}
            >
              Continuar
            </button>

          </div>

        </main>

        <footer className="rodape-login">
          © 2026 Sistema Jurídico — Todos os direitos reservados.
        </footer>

      </div>
    );
  }

  return (
    <div className="pagina-login-advogados">

      {/* CABEÇALHO */}
      <header className="cabecalho-login">

        <div className="logo-login">
          <span className="icone-logo">⚖</span>

          <span>
            SISTEMA <strong>JURÍDICO</strong>
          </span>
        </div>

      </header>

      {/* CONTEÚDO */}
      <main className="conteudo-login">

        <div className="card-login">

          {/* ÍCONE */}
          <div className="icone-login">
            🔐
          </div>

          {/* TÍTULO */}
          <h1>Login do Advogado</h1>

          <p className="descricao-login">
            Acesse sua conta para entrar no sistema jurídico.
          </p>

          {/* FORMULÁRIO */}
          <form onSubmit={realizarLogin}>

            <CampoLogin
              label="E-mail"
              tipo="email"
              valor={emailDigitado}
              aoMudar={quandoDigitarEmail}
            />

            <CampoLogin
              label="Senha"
              tipo="password"
              valor={senhaDigitada}
              aoMudar={quandoDigitarSenha}
            />

            {/* ERRO */}
            {mensagemErro && (
              <div className="mensagem-erro">
                <span>!</span>
                {mensagemErro}
              </div>
            )}

            {/* BOTÃO */}
            <button
              type="submit"
              className="botao-login"
            >
              Entrar no Sistema
              <span>→</span>
            </button>

          </form>

          {/* SEPARADOR */}
          <div className="separador">
            <span></span>
            <p>Acesso seguro</p>
            <span></span>
          </div>

          {/* INFORMAÇÃO */}
          <div className="informacao-seguranca">
            <span>🔒</span>

            <p>
              Seus dados são protegidos e utilizados
              <br />
              exclusivamente para acesso ao sistema.
            </p>
          </div>

        </div>

      </main>

      {/* RODAPÉ */}
      <footer className="rodape-login">
        © 2026 Sistema Jurídico — Todos os direitos reservados.
      </footer>

    </div>
  );
}

export default LoginAdvogados;