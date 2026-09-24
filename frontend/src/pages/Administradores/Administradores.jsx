import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CampoFormulario from '../../components/Administradores/CampoFormulario';
import api from '../../services/api'; // Ajuste o caminho se necessário
import './Administradores.css';

function Administradores({ onLoginSucesso }) {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [autenticado, setAutenticado] = useState(false);

  function quandoDigitarLogin(e) {
    setLogin(e.target.value);
    setErro('');
  }

  function quandoDigitarSenha(e) {
    setSenha(e.target.value);
    setErro('');
  }

  async function entrar(e) {
    e.preventDefault();

    if (!login || !senha) {
      setErro('Preencha o login e a senha.');
      return;
    }

    try {
      setCarregando(true);
      setErro('');

      // Autenticação real com o backend
      const resposta = await api.post('/auth/login/admin', {
        email: login,
        senha: senha,
      });

      const data = resposta.data || {};
      const tokenRecebido = data.token || data.accessToken;
      const usuarioLogado = data.usuario || data.admin || { email: login, role: 'admin' };

      if (tokenRecebido) {
        // Armazena o token para o interceptor do Axios utilizar
        localStorage.setItem('token', tokenRecebido);
        localStorage.setItem('@catalogoPessoas:token', tokenRecebido);
        localStorage.setItem('@catalogoPessoas:user', JSON.stringify(usuarioLogado));

        setAutenticado(true);
      } else {
        setErro('O servidor não retornou um token de acesso válido.');
      }
    } catch (err) {
      console.error('Erro ao realizar login de administrador:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setErro(err.response.data.message);
      } else if (err.response && err.response.status === 401) {
        setErro('E-mail ou senha de administrador incorretos.');
      } else {
        setErro('Não foi possível conectar ao servidor. Tente novamente.');
      }
    } finally {
      setCarregando(false);
    }
  }

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
          <span className="area-admin">ÁREA ADMINISTRATIVA</span>
        </header>

        <main className="conteudo-admin">
          <div className="card-admin sucesso-admin">
            <div className="icone-sucesso-admin">✓</div>
            <span className="badge-admin">ACESSO AUTORIZADO</span>
            <h1>Bem-vindo, administrador</h1>
            <p>Seu acesso foi validado com sucesso.</p>

            <button
              className="botao-painel"
              onClick={() => {
                if (onLoginSucesso) {
                  onLoginSucesso({ nome: 'Administrador Global', email: login });
                } else {
                  navigate('/painel-administrativo');
                }
              }}
            >
              Acessar Painel <span>→</span>
            </button>
          </div>
        </main>

        <footer className="rodape-admin">
          © 2026 Sistema Jurídico — Área Administrativa
        </footer>
      </div>
    );
  }

  return (
    <div className="pagina-administradores">
      <header className="cabecalho-admin">
        <div className="logo-admin">
          <span className="icone-logo">⚖</span>
          <span>
            SISTEMA <strong>JURÍDICO</strong>
          </span>
        </div>
        <span className="area-admin">ÁREA ADMINISTRATIVA</span>
      </header>

      <main className="conteudo-admin">
        <div className="card-admin">
          <div className="icone-admin">🔐</div>
          <h1>Acesso Administrativo</h1>
          <p className="descricao-admin">
            Entre com suas credenciais para acessar o painel administrativo.
          </p>

          <form onSubmit={entrar}>
            <CampoFormulario
              label="Login"
              tipo="text"
              valor={login}
              aoMudar={quandoDigitarLogin}
              placeholder="Digite seu e-mail"
            />

            <CampoFormulario
              label="Senha"
              tipo="password"
              valor={senha}
              aoMudar={quandoDigitarSenha}
              placeholder="Digite sua senha"
            />

            {erro !== '' && (
              <div className="mensagem-erro-admin">
                <span>!</span>
                {erro}
              </div>
            )}

            <button type="submit" className="botao-entrar-admin" disabled={carregando}>
              {carregando ? 'Autenticando...' : 'Entrar'} <span>→</span>
            </button>
          </form>

          <div className="seguranca-admin">
            <span>🔒</span>
            <div>
              <strong>Acesso restrito</strong>
              <p>Esta área é destinada exclusivamente aos administradores do sistema.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="rodape-admin">
        © 2026 Sistema Jurídico — Área Administrativa
      </footer>
    </div>
  );
}

export default Administradores;