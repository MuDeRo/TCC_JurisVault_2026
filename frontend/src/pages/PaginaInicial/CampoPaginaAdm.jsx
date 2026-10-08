import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CampoPaginaAdm.css';
import api from '../../services/api.js';

export default function CampoPaginaAdm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      const response = await api.post('/auth/login/admin', { email, senha });
      const { token, usuario } = response.data; 

      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));

      navigate('/administradores');
    } catch (err) {
      setErro(err.response?.data?.message || 'E-mail ou senha incorretos.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="login-adm-container">
      <div className="login-adm-card">
        <h2>Login - Administrador</h2>
        <p className="subtitle">Acesse sua conta para continuar</p>

        {erro && <div style={{ color: '#e74c3c', marginBottom: '15px', textAlign: 'center', fontWeight: 'bold' }}>{erro}</div>}

        <form onSubmit={handleLogin}>
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
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="btn-submit-adm" disabled={carregando}>
            {carregando ? 'ENTRANDO...' : 'ENTRAR NO SISTEMA'}
          </button>
        </form>

        <button 
          type="button" 
          className="btn-back" 
          onClick={() => navigate('/')}
        >
          ← Voltar ao Menu Principal
        </button>
      </div>
    </div>
  );
}