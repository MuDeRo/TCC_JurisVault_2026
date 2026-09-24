import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginAdvogado.css';

export default function LoginAdvogados() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Login realizado com sucesso!');
    navigate('/painel-administrativo');
  };

  return (
    <div className="login-adv-page">
      <div className="login-adv-card">
        {/* ÍCONE DA BALANÇA */}
        <div className="login-adv-icon-box">
          <span className="login-adv-icon">⚖️</span>
        </div>

        {/* TÍTULO E SUBTÍTULO */}
        <h2 className="login-adv-title">JurisVault</h2>
        <p className="login-adv-subtitle">Gestão Jurídica Inteligente</p>

        {/* FORMULÁRIO */}
        <form className="login-adv-form" onSubmit={handleSubmit}>
          <div className="login-adv-group">
            <label>E-mail</label>
            <input
              type="email"
              name="email"
              placeholder="advogado@jurisvault.com.br"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="login-adv-group">
            <label>Senha</label>
            <input
              type="password"
              name="senha"
              placeholder="••••••"
              value={formData.senha}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-adv-btn-submit">
            Entrar no sistema
          </button>
        </form>

        {/* BOTÃO DE VOLTAR */}
        <button
          type="button"
          className="login-adv-btn-back"
          onClick={() => navigate('/')}
        >
          ← Voltar ao Menu Principal
        </button>

        {/* CREDENCIAIS PADRÃO NO RODAPÉ */}
        <p className="login-adv-hint">
          Padrão: advogado@jurisvault.com.br / 123456
        </p>
      </div>
    </div>
  );
}