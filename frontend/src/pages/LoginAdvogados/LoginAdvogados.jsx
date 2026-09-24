import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CampoLogin from "../../components/Advogados/CampoLogin";

import "./LoginAdvogado.css";

function LoginAdvogados() {

  const navigate = useNavigate();

  const [emailDigitado, setEmailDigitado] = useState("");
  const [senhaDigitada, setSenhaDigitada] = useState("");
  const [erro, setErro] = useState("");

  // DADOS PARA TESTAR O LOGIN
  const LOGIN_CORRETO = "advogado@gmail.com";
  const SENHA_CORRETA = "123456";


  function quandoDigitarEmail(e) {
    setEmailDigitado(e.target.value);
    setErro("");
  }


  function quandoDigitarSenha(e) {
    setSenhaDigitada(e.target.value);
    setErro("");
  }


  function entrar(e) {

    e.preventDefault();

    // Verifica se os campos estão vazios
    if (emailDigitado === "" || senhaDigitada === "") {

      setErro("Preencha o e-mail e a senha.");

      return;
    }


    // VERIFICA LOGIN E SENHA
    if (
      emailDigitado === LOGIN_CORRETO &&
      senhaDigitada === SENHA_CORRETA
    ) {

      setErro("");

      // VAI DIRETAMENTE PARA O PAINEL
      navigate("/painel-advogado");

    } else {

      setErro("E-mail ou senha incorretos.");

    }
  }


  return (
    <div className="pagina-login">

      {/* CABEÇALHO */}

      <header className="cabecalho-login">

        <div className="logo-login">

          <span className="icone-logo">
            ⚖
          </span>

          <span>
            SISTEMA <strong>JURÍDICO</strong>
          </span>

        </div>

      </header>


      {/* CONTEÚDO */}

      <main className="conteudo-login">

        <div className="card-login">

          <div className="icone-login">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock-keyhole"><circle cx="12" cy="16" r="1" /><rect x="3" y="10" width="18" height="12" rx="2" /><path d="M7 10V7a5 5 0 0 1 10 0v3" /></svg>
          </div>


          <h1>
            Login do Advogado
          </h1>


          <p className="descricao-login">
            Acesse sua conta para entrar no sistema jurídico.
          </p>


          <form onSubmit={entrar}>

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


            {erro !== "" && (

              <div className="mensagem-erro-login">

                <span>!</span>

                {erro}

              </div>

            )}


            <button
              type="submit"
              className="botao-entrar-login"
            >
              <span className="texto-entrar">Entrar</span>

            </button>

          </form>


          <div className="seguranca-login">

            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock-keyhole"><circle cx="12" cy="16" r="1" /><rect x="3" y="10" width="18" height="12" rx="2" /><path d="M7 10V7a5 5 0 0 1 10 0v3" /></svg>
            </span>

            <div>

              <strong>
                Acesso seguro
              </strong>

              <p>
                Seus dados são protegidos pelo sistema.
              </p>

            </div>

          </div>

        </div>

      </main>


      {/* RODAPÉ */}

      <footer className="rodape-login">

        © 2026 Sistema Jurídico.
        Todos os direitos reservados.

      </footer>

    </div>
  );
}

export default LoginAdvogados;