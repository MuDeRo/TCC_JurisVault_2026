import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './LoginAdvogado.css';

export default function LoginAdvogados() {
  const [modo, setModo] = useState(null); // null | 'login-advogado' | 'login-admin' | 'cadastro-advogado'

  // Estados de Login
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Estados de Cadastro
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [registroOab, setRegistroOab] = useState('');
  const [ufOab, setUfOab] = useState('');

  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const limparFormulario = () => {
    setEmail('');
    setSenha('');
    setNome('');
    setCpf('');
    setTelefone('');
    setRegistroOab('');
    setUfOab('');
    setErro('');
    setSucesso('');
  };

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

  const handleCadastro = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');
    setCarregando(true);

    try {
      await api.post('/advogado/cadastro', {
        nome,
        email,
        senha,
        cpf,
        telefone,
        registroOab,
        ufOab
      });
      
      setSucesso('Advogado cadastrado com sucesso! A redirecionar para o login...');
      setTimeout(() => {
        setModo('login-advogado');
        setSucesso('');
      }, 2000);
    } catch (err) {
      setErro(err.response?.data?.message || 'Erro ao realizar o cadastro. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="portal-container">
      
      {/* Header Superior */}
      <header className="portal-header">
        <div className="brand-badge">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
            <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
            <path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h18"/>
          </svg>
        </div>
        <h1 className="portal-title">JurisVault</h1>
        <p className="portal-subtitle">Gestão Jurídica Inteligente & Unificada</p>
      </header>

      {/* TELA INICIAL: 3 Cards */}
      {!modo ? (
        <main className="cards-grid">
          
          <div className="access-card" onClick={() => { setModo('login-advogado'); limparFormulario(); }}>
            <div className="card-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2">
                <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                <path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h18"/>
              </svg>
            </div>
            <h2 className="card-role">Advogado</h2>
            <p className="card-desc">Gestão de processos, agenda de prazos e acompanhamento dos seus clientes.</p>
            <button className="card-action-btn">Entrar como Advogado →</button>
          </div>

          <div className="access-card" onClick={() => { setModo('login-admin'); limparFormulario(); }}>
            <div className="card-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
            </div>
            <h2 className="card-role">Administrador</h2>
            <p className="card-desc">Controlo global do escritório, equipas jurídicas e relatórios operacionais.</p>
            <button className="card-action-btn">Entrar como Admin →</button>
          </div>

          <div className="access-card" onClick={() => { setModo('cadastro-advogado'); limparFormulario(); }}>
            <div className="card-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="8.5" cy="7" r="4"/>
                <line x1="20" y1="8" x2="20" y2="14"/>
                <line x1="17" y1="11" x2="23" y2="11"/>
              </svg>
            </div>
            <h2 className="card-role">Novo Registo</h2>
            <p className="card-desc">Ainda não tem conta? Cadastre o seu perfil de advogado diretamente aqui.</p>
            <button className="card-action-btn" style={{ borderColor: 'rgba(16, 185, 129, 0.4)' }}>
              Cadastrar Advogado +
            </button>
          </div>

        </main>
      ) : modo === 'cadastro-advogado' ? (

        /* CADASTRO */
        <form onSubmit={handleCadastro} className="glass-card cadastro-card-wide">
          <div className="form-header-box">
            <div className="form-avatar-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="8.5" cy="7" r="4"/>
                <line x1="20" y1="8" x2="20" y2="14"/>
                <line x1="17" y1="11" x2="23" y2="11"/>
              </svg>
            </div>
            <h2 className="form-title">Cadastro de Advogado</h2>
            <p className="form-subtext">Preencha os dados abaixo para se cadastrar no sistema</p>
          </div>

          {erro && <p className="erro-msg">{erro}</p>}
          {sucesso && <p className="erro-msg" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', borderColor: 'rgba(16, 185, 129, 0.4)', color: '#6ee7b7' }}>{sucesso}</p>}

          <div className="field-group">
            <label className="login-label">Nome Completo</label>
            <input 
              type="text" 
              value={nome} 
              onChange={(e) => setNome(e.target.value)} 
              placeholder="Dr. Nome Exemplo" 
              required 
              className="login-input"
            />
          </div>

          <div className="form-grid-2">
            <div className="field-group">
              <label className="login-label">E-mail</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="professor@react.com" 
                required 
                className="login-input"
              />
            </div>
            <div className="field-group">
              <label className="login-label">Senha</label>
              <input 
                type="password" 
                value={senha} 
                onChange={(e) => setSenha(e.target.value)} 
                placeholder="••••••" 
                required 
                className="login-input"
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="field-group">
              <label className="login-label">CPF</label>
              <input 
                type="text" 
                value={cpf} 
                onChange={(e) => setCpf(e.target.value)} 
                placeholder="000.000.000-00" 
                required 
                className="login-input"
              />
            </div>
            <div className="field-group">
              <label className="login-label">Telefone</label>
              <input 
                type="text" 
                value={telefone} 
                onChange={(e) => setTelefone(e.target.value)} 
                placeholder="(11) 99999-9999" 
                required 
                className="login-input"
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="field-group">
              <label className="login-label">Registro OAB</label>
              <input 
                type="text" 
                value={registroOab} 
                onChange={(e) => setRegistroOab(e.target.value)} 
                placeholder="123456" 
                required 
                className="login-input"
              />
            </div>
            <div className="field-group">
              <label className="login-label">UF OAB</label>
              <input 
                type="text" 
                value={ufOab} 
                onChange={(e) => setUfOab(e.target.value)} 
                placeholder="SP" 
                required 
                className="login-input"
              />
            </div>
          </div>

          <button type="submit" disabled={carregando} className="login-button">
            {carregando ? 'A CADASTRAR...' : 'FINALIZAR CADASTRO'}
          </button>

          <button type="button" className="btn-back" onClick={() => setModo(null)}>
            ← Voltar ao Menu Principal
          </button>
        </form>

      ) : (

        /* LOGIN MOCKADO */
        <form onSubmit={handleLogin} className="glass-card login-card-narrow">
          <div className="form-header-box">
            <h2 className="form-title">
              Login - {modo === 'login-admin' ? 'Administrador' : 'Advogado (Mock)'}
            </h2>
            <p className="form-subtext">Aceda à sua conta para continuar</p>
          </div>

          {erro && <p className="erro-msg">{erro}</p>}

          <div className="field-group">
            <label className="login-label">E-mail</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder={modo === 'login-admin' ? 'admin@jurisvault.com.br' : 'qualquer@email.com'} 
              className="login-input"
            />
          </div>

          <div className="field-group">
            <label className="login-label">Senha</label>
            <input 
              type="password" 
              value={senha} 
              onChange={(e) => setSenha(e.target.value)} 
              placeholder="••••••" 
              className="login-input"
            />
          </div>

          <button type="submit" disabled={carregando} className="login-button">
            {carregando ? 'A ENTRAR...' : 'ENTRAR NO SISTEMA'}
          </button>

          <button type="button" className="btn-back" onClick={() => setModo(null)}>
            ← Voltar ao Menu Principal
          </button>

          <span className="hint-text">
            ⚡ Modo Teste Activo: Pode clicar em Entrar com qualquer valor ou campo vazio!
          </span>
        </form>
      )}

    </div>
  );
}