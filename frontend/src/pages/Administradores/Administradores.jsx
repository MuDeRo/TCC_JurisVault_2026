import { useState } from 'react';
import CampoFormulario from '../../components/Administradores/CampoFormulario';
import './Administradores.css';

import api from '../../services/api.js';

function Administradores() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [autenticado, setAutenticado] = useState(false);
  const [carregando, setCarregando] = useState(false);

  function quandoDigitarLogin(e) {
    setLogin(e.target.value);
    setErro('');
  }

  function quandoDigitarSenha(e) {
    setSenha(e.target.value);
    setErro('');
  }

  // FUNÇÃO DE LOGIN CONECTADA AO BACKEND
  async function entrar(e) {
    e.preventDefault();

    if (login === '' || senha === '') {
      setErro('Preencha o login e a senha.');
      return;
    }

    try {
      setCarregando(true);
      setErro('');

      // 1. Faz o POST para a rota /auth/login/admin
      // Enviamos a chave "email", pois é como seu req.body espera no controller!
      const resposta = await api.post('/auth/login/admin', {
        email: login,
        senha: senha
      });

      // 2. Guarda o Token JWT retornado no localStorage do navegador
      localStorage.setItem('token', resposta.data.token);

      // 3. Atualiza o estado para exibir a tela de "Acesso Autorizado"
      setAutenticado(true);

    } catch (error) {
      console.error('Erro no login admin:', error);

      // Trata as mensagens vindas do backend (ex: 'Administrador não encontrado' ou 'Senha inválida')
      if (error.response) {
        setErro(error.response.data.message || 'Credenciais inválidas.');
      } else {
        setErro('Não foi possível conectar ao servidor.');
      }
    } finally {
      setCarregando(false);
    }
  }

  /* 
     ACESSO LIBERADO
  */

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

  /* 
     LOGIN ADMINISTRATIVO
  */

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
              disabled={carregando}
            >
              {carregando ? 'Autenticando...' : 'Entrar'}
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