import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CadastroAdvogado.css';
import api from '../../services/api.js';

export default function CadastroAdvogados() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    cpf: '',
    telefone: '',
    oab: '',
    uf: 'SP'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    // Envia os dados do formulário para o backend
    await api.post('/advogado/cadastro', formData);
    
    alert('Cadastro realizado com sucesso! Aguarde a aprovação do administrador.');
    navigate('/login'); 
  } catch (error) {
    alert(error.response?.data?.message || 'Erro ao realizar o cadastro. Verifique os dados e tente novamente.');
    console.error(error);
  }
};

  return (
    <div className="cad-adv-page">
      <div className="cad-adv-card">
        {/* ÍCONE QUADRADO ARREDONDADO */}
        <div className="cad-adv-icon-box">
          <span className="cad-adv-icon">⚖️</span>
        </div>

        {/* TÍTULOS */}
        <h2 className="cad-adv-title">Cadastro de Advogado</h2>
        <p className="cad-adv-subtitle">Preencha os dados para criar a sua conta</p>

        {/* FORMULÁRIO */}
        <form className="cad-adv-form" onSubmit={handleSubmit}>
          <div className="cad-adv-group">
            <label>Nome Completo</label>
            <input
              type="text"
              name="nome"
              placeholder="Dr. Nome Exemplo"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="cad-adv-row">
            <div className="cad-adv-group">
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
            <div className="cad-adv-group">
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
          </div>

          <div className="cad-adv-row">
            <div className="cad-adv-group">
              <label>CPF</label>
              <input
                type="text"
                name="cpf"
                placeholder="000.000.000-00"
                value={formData.cpf}
                onChange={handleChange}
              />
            </div>
            <div className="cad-adv-group">
              <label>Telefone</label>
              <input
                type="text"
                name="telefone"
                placeholder="(11) 99999-9999"
                value={formData.telefone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="cad-adv-row">
            <div className="cad-adv-group">
              <label>Registro OAB</label>
              <input
                type="text"
                name="oab"
                placeholder="123456"
                value={formData.oab}
                onChange={handleChange}
                required
              />
            </div>
            <div className="cad-adv-group">
              <label>UF OAB</label>
              <input
                type="text"
                name="uf"
                placeholder="SP"
                maxLength={2}
                value={formData.uf}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="cad-adv-btn-submit">
            Cadastrar no sistema
          </button>
        </form>

        <button
          type="button"
          className="cad-adv-btn-back"
          onClick={() => navigate('/')}
        >
          ← Voltar ao Menu Principal
        </button>
      </div>
    </div>
  );
}