import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CampoPaginaAdm.css';
import api from '../../services/api.js';

export default function CampoPaginaAdm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async (e) => {
  e.preventDefault();
  setErro('');
  setCarregando(true);

  try {
    // Escolhe a rota certa baseada no modo
    const endpoint = modo === 'login-admin' ? '/auth/login/admin' : '/auth/login/advogado';
    
    // Faz a requisição POST
    const response = await api.post(endpoint, { 
      email, 
      senha 
    });

    // O backend deve retornar um token e os dados do utilizador
    const { token, usuario } = response.data; 

    // Salva o token no localStorage para ser usado nas próximas requisições
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    // Redireciona o utilizador
    if (modo === 'login-admin') {
      navigate('/administradores');
    } else {
      navigate('/painel');
    }

  } catch (err) {
    // Tratamento de erro vindo do backend
    setErro(err.response?.data?.message || 'E-mail ou senha incorretos.');
  } finally {
    setCarregando(false);
  }
};

  return (
    <div className="login-adm-container">
      <div className="login-adm-card">
        <h2>Login - Administrador</h2>
        <p className="subtitle">Aceda à sua conta para continuar</p>

        <form onSubmit={handleEntrarSemErro}>
          <div className="form-group">
            <label>E-MAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              required
            />
          </div>

          <div className="form-group">
            <label>SENHA</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="•••••"
              required
            />
          </div>

          <button type="submit" className="btn-submit-adm">
            ENTRAR NO SISTEMA
          </button>
        </form>

        <button 
          type="button" 
          className="btn-back" 
          onClick={() => navigate('/')}
        >
          ← Voltar ao Menu Principal
        </button>

        <p className="test-mode-note">
          ⚡ Modo Teste Activo: Pode clicar em Entrar com qualquer valor ou campo vazio!
        </p>
      </div>
    </div>
  );
}