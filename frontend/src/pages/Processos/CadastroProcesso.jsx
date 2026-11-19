import React, { useState } from 'react';
import axios from 'axios';
import './CadastroProcesso.css';
import { data } from 'react-router-dom';

export default function CadastroProcesso() {
  const [formData, setFormData] = useState({
    numeroCnj: '',
    descricaoCaso: '',
    dataPrazos: '',
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

    // Extrai o ID do advogado logado de dentro do token JWT
    const token = localStorage.getItem('token');
    let idAdvogadoLogado = localStorage.getItem('id_advogado_fk');

    if (!idAdvogadoLogado && token) {
      try {
        const payloadToken = JSON.parse(atob(token.split('.')[1]));
        idAdvogadoLogado = payloadToken.id;
      } catch (err) {
        console.error('Erro ao decodificar token:', err);
      }
    }

    if (!idAdvogadoLogado) {
      setMensagem({ tipo: 'erro', texto: 'Sessão inválida. Faça login novamente.' });
      setCarregando(false);
      return;
    }

    // Converte DD/MM/AAAA para AAAA-MM-DD (caso a coluna no MySQL seja DATE)
    const formatarDataParaMySQL = (dataBr) => {
      if (!dataBr || !dataBr.includes('/')) return dataBr;
      const [dia, mes, ano] = dataBr.split('/');
      return `${ano}-${mes}-${dia}`;
    };

    const payloadParaBackend = {
      caso: {
        numero_cnj: formData.numeroCnj,
        descricao_caso: formData.descricaoCaso,
        data_prazo: formatarDataParaMySQL(formData.dataPrazos) || null
      },
      requerente: {
        nome: formData.nomeRequerente,
        cpf: formData.cpfRequerente,
        idade_anos: formData.idadeRequerente ? Number(formData.idadeRequerente) : null
      },
      requerido: {
        nome: formData.nomeRequerido,
        cpf: formData.cpfRequerido,
        idade_anos: formData.idadeRequerido ? Number(formData.idadeRequerido) : null
      },
      advogadoCaso: {
        id_advogado: Number(idAdvogadoLogado),
        cep: formData.cepLocal,
        rua: formData.enderecoRua
      }
    };

    try {
      await axios.post('http://localhost:8080/casos', payloadParaBackend, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMensagem({ tipo: 'sucesso', texto: 'Caso cadastrado com sucesso!' });

      setFormData({
        numeroCnj: '',
        descricaoCaso: '',
        dataPrazos: '',
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
        texto: error.response?.data?.erro || 'Erro ao cadastrar o caso. Tente novamente.'
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

          <div className="form-group">
            <label>Prazo *</label>
            <input
              type="text"
              name="dataPrazos"
              placeholder="DD/MM/AAAA"
              regex="\d{2}/\d{2}/\d{4}"
              value={formData.dataPrazos}
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