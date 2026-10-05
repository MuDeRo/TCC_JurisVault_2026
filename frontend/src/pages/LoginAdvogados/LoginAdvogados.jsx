import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginAdvogado.css';

export default function LoginAdvogados() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/painel');
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        
        {/* Ícone com balança no topo */}
        <div className="card-icon-wrapper">
          ⚖️
        </div>

        <h2 className="login-title">Login de Advogado</h2>
        <p className="login-subtitle">Acesse a sua conta no sistema</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>E-mail</label>
            <input 
              type="email" 
              placeholder="advogado@jurisvault.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input 
              type="password" 
              placeholder="••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Entrar no sistema
          </button>

          <button 
            type="button" 
            className="back-link" 
            onClick={() => navigate('/')}
          >
            ← Voltar ao Menu Principal
          </button>
        </form>

      </div>
    </div>
  );
}