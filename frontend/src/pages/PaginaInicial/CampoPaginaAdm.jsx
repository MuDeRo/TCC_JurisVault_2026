import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CampoPaginaAdm.css';

export default function CampoPaginaAdm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('kaick.e.silva@aluno.senai.br');
  const [senha, setSenha] = useState('12345');

  const handleEntrarSemErro = (e) => {
    e.preventDefault();

    // 1. Criar utilizador Administrador no MOCK
    const adminMock = {
      id: 1,
      nome: 'Kaick (Admin)',
      email: email,
      perfil: 'Admin'
    };

    // 2. Salvar sessão local
    localStorage.setItem('token', 'token-admin-mock-12345');
    localStorage.setItem('user', JSON.stringify(adminMock));

    // 3. Forçar o navegação para a página de administradores
    navigate('/administradores');
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