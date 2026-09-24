import React, { useState } from 'react';
import axios from 'axios';
import './CadastroProcesso.css';

export default function CadastroProcesso() {
  const [formData, setFormData] = useState({
    numeroCnj: '',
    descricaoCaso: '',
    nomeRequerente: '',
    cpfRequerente: '',
    idadeRequerente: '',
    nomeRequerido: '',
    cpfRequerido: '',
    idadeRequerido: '',
    cepLocal: '',
    enderecoRua: ''
  });

  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });
  const [carregando, setCarregando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem({ tipo: '', texto: '' });
    setCarregando(true);

    try {
      await axios.post('http://localhost:3000/api/casos', formData);
      setMensagem({ tipo: 'sucesso', texto: 'Caso cadastrado com sucesso!' });
      setFormData({
        numeroCnj: '',
        descricaoCaso: '',
        nomeRequerente: '',
        cpfRequerente: '',
        idadeRequerente: '',
        nomeRequerido: '',
        cpfRequerido: '',
        idadeRequerido: '',
        cepLocal: '',
        enderecoRua: ''
      });
    } catch (error) {
      setMensagem({
        tipo: 'erro',
        texto: error.response?.data?.error || 'Erro ao cadastrar o caso. Tente novamente.'
      });
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="cadastrar-caso-container">
      <div className="cadastrar-caso-card">
        {/* CABEÇALHO */}
        <div className="form-header">
          <h1>Cadastrar Novo Caso</h1>
          <p>Preencha o registro CNJ, descrição, partes e localização.</p>
        </div>

        {mensagem.texto && (
          <div className={`alerta-msg ${mensagem.tipo}`}>
            {mensagem.texto}
          </div>
        )}

        {/* FORMULÁRIO */}
        <form onSubmit={handleSubmit} className="form-caso-grid">
          {/* LINHA 1 */}
          <div className="form-group">
            <label>Número CNJ *</label>
            <input
              type="text"
              name="numeroCnj"
              placeholder="0000000-00.2026.8.26.0000"
              value={formData.numeroCnj}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Descrição do Caso *</label>
            <input
              type="text"
              name="descricaoCaso"
              placeholder="Breve resumo da causa"
              value={formData.descricaoCaso}
              onChange={handleChange}
              required
            />
          </div>

          {/* LINHA 2 */}
          <div className="form-group">
            <label>Nome do Requerente (Cliente) *</label>
            <input
              type="text"
              name="nomeRequerente"
              placeholder="Nome completo"
              value={formData.nomeRequerente}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>CPF do Requerente</label>
            <input
              type="text"
              name="cpfRequerente"
              placeholder="Apenas 11 dígitos"
              maxLength={11}
              value={formData.cpfRequerente}
              onChange={handleChange}
            />
          </div>

          {/* LINHA 3 */}
          <div className="form-group">
            <label>Idade (Anos)</label>
            <input
              type="number"
              name="idadeRequerente"
              placeholder="Ex: 35"
              value={formData.idadeRequerente}
              onChange={handleChange}
            />
          </div>

          <div className="form-group empty-space"></div>

          {/* LINHA 4 */}
          <div className="form-group">
            <label>Nome do Requerido (Adverso) *</label>
            <input
              type="text"
              name="nomeRequerido"
              placeholder="Nome completo"
              value={formData.nomeRequerido}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>CPF do Requerido</label>
            <input
              type="text"
              name="cpfRequerido"
              placeholder="Apenas 11 dígitos"
              maxLength={11}
              value={formData.cpfRequerido}
              onChange={handleChange}
            />
          </div>

          {/* LINHA 5 */}
          <div className="form-group">
            <label>Idade (Anos)</label>
            <input
              type="number"
              name="idadeRequerido"
              placeholder="Ex: 40"
              value={formData.idadeRequerido}
              onChange={handleChange}
            />
          </div>

          <div className="form-group empty-space"></div>

          {/* LINHA 6 */}
          <div className="form-group">
            <label>CEP do Local</label>
            <input
              type="text"
              name="cepLocal"
              placeholder="00000000"
              maxLength={8}
              value={formData.cepLocal}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Endereço / Rua do Caso</label>
            <input
              type="text"
              name="enderecoRua"
              placeholder="Rua, número e bairro"
              value={formData.enderecoRua}
              onChange={handleChange}
            />
          </div>

          {/* BOTÃO CADASTRAR CASO */}
          <div className="form-group full-width">
            <button type="submit" className="btn-cadastrar-caso" disabled={carregando}>
              {carregando ? 'A CADASTRAR...' : 'CADASTRAR CASO'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}