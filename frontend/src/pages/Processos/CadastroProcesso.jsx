
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CadastroProcesso.css';

export default function CadastroProcesso() {
  const navigate = useNavigate();

  // Estado do formulário
  const [formData, setFormData] = useState({
    cnj: '',
    descricao: '',
    requerenteNome: '',
    requerenteCpf: '',
    requerenteIdade: '',
    requeridoNome: '',
    requeridoCpf: '',
    requeridoIdade: '',
    cep: '',
    endereco: '',
  });

  const [mensagem, setMensagem] = useState({
    tipo: '',
    texto: '',
  });

  const [carregando, setCarregando] = useState(false);

  // Atualiza os campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Envia o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMensagem({ tipo: '', texto: '' });
    setCarregando(true);

    const payloadParaBackend = {
      caso: {
        numero_cnj: formData.cnj,
        descricao_caso: formData.descricao,
      },
      requerente: {
        nome: formData.requerenteNome,
        cpf: formData.requerenteCpf,
        idade_anos: formData.requerenteIdade
          ? Number(formData.requerenteIdade)
          : null,
      },
      requerido: {
        nome: formData.requeridoNome,
        cpf: formData.requeridoCpf,
        idade_anos: formData.requeridoIdade
          ? Number(formData.requeridoIdade)
          : null,
      },
      advogadoCaso: {
        id_advogado: Number(localStorage.getItem('id_advogado')) || 1,
        cep: formData.cep,
        rua: formData.endereco,
      },
    };

    try {
      const token = localStorage.getItem('token');

      await axios.post(
        'http://localhost:8080/casos',
        payloadParaBackend,
        {
          headers: token
            ? { Authorization: `Bearer ${token}` }
            : {},
        }
      );

      setMensagem({
        tipo: 'sucesso',
        texto: 'Caso cadastrado com sucesso!',
      });

      // Limpa o formulário
      setFormData({
        cnj: '',
        descricao: '',
        requerenteNome: '',
        requerenteCpf: '',
        requerenteIdade: '',
        requeridoNome: '',
        requeridoCpf: '',
        requeridoIdade: '',
        cep: '',
        endereco: '',
      });
    } catch (error) {
      console.error('Erro ao cadastrar caso:', error);

      setMensagem({
        tipo: 'erro',
        texto:
          error.response?.data?.erro ||
          error.response?.data?.mensagem ||
          'Erro ao cadastrar o caso. Verifique os dados e tente novamente.',
      });
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="cadastro-page-container">
      <div className="cadastro-card">

        {/* Botão de voltar */}
        <button
          type="button"
          className="btn-voltar-topo"
          onClick={() => navigate(-1)}
          title="Voltar para a página anterior"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Voltar
        </button>

        {/* Cabeçalho */}
        <div className="form-header">
          <h1 className="form-title">Cadastrar Novo Caso</h1>
          <p className="form-subtitle">
            Preencha o registro CNJ, descrição, partes e localização.
          </p>
        </div>

        {/* Mensagem de retorno */}
        {mensagem.texto && (
          <p
            role="alert"
            style={{
              color: mensagem.tipo === 'sucesso' ? 'green' : 'red',
              marginBottom: '15px',
            }}
          >
            {mensagem.texto}
          </p>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="form-grid">

          {/* Linha 1 */}
          <div className="field-group">
            <label className="field-label">Número CNJ *</label>
            <input
              type="text"
              name="cnj"
              placeholder="0000000-00.2026.8.26.0000"
              value={formData.cnj}
              onChange={handleChange}
              className="field-input"
              required
            />
          </div>

          <div className="field-group">
            <label className="field-label">Descrição do Caso *</label>
            <input
              type="text"
              name="descricao"
              placeholder="Breve resumo da causa"
              value={formData.descricao}
              onChange={handleChange}
              className="field-input"
              required
            />
          </div>

          {/* Linha 2 */}
          <div className="field-group">
            <label className="field-label">
              Nome do Requerente (Cliente) *
            </label>
            <input
              type="text"
              name="requerenteNome"
              placeholder="Nome completo"
              value={formData.requerenteNome}
              onChange={handleChange}
              className="field-input"
              required
            />
          </div>

          <div className="field-group">
            <label className="field-label">CPF do Requerente</label>
            <input
              type="text"
              name="requerenteCpf"
              placeholder="Apenas 11 dígitos"
              value={formData.requerenteCpf}
              onChange={handleChange}
              className="field-input"
            />
          </div>

          {/* Linha 3 */}
          <div className="field-group span-full">
            <label className="field-label">Idade (Anos)</label>
            <input
              type="number"
              name="requerenteIdade"
              placeholder="Ex: 35"
              value={formData.requerenteIdade}
              onChange={handleChange}
              className="field-input input-half"
            />
          </div>

          {/* Linha 4 */}
          <div className="field-group">
            <label className="field-label">
              Nome do Requerido (Adverso) *
            </label>
            <input
              type="text"
              name="requeridoNome"
              placeholder="Nome completo"
              value={formData.requeridoNome}
              onChange={handleChange}
              className="field-input"
              required
            />
          </div>

          <div className="field-group">
            <label className="field-label">CPF do Requerido</label>
            <input
              type="text"
              name="requeridoCpf"
              placeholder="Apenas 11 dígitos"
              value={formData.requeridoCpf}
              onChange={handleChange}
              className="field-input"
            />
          </div>

          {/* Linha 5 */}
          <div className="field-group span-full">
            <label className="field-label">Idade (Anos)</label>
            <input
              type="number"
              name="requeridoIdade"
              placeholder="Ex: 40"
              value={formData.requeridoIdade}
              onChange={handleChange}
              className="field-input input-half"
            />
          </div>

          {/* Linha 6 */}
          <div className="field-group">
            <label className="field-label">CEP do Local</label>
            <input
              type="text"
              name="cep"
              placeholder="00000000"
              value={formData.cep}
              onChange={handleChange}
              className="field-input"
            />
          </div>

          <div className="field-group">
            <label className="field-label">
              Endereço / Rua do Caso
            </label>
            <input
              type="text"
              name="endereco"
              placeholder="Rua, número e bairro"
              value={formData.endereco}
              onChange={handleChange}
              className="field-input"
            />
          </div>

          {/* Botões de ação */}
          <div className="form-actions span-full">
            <button
              type="button"
              className="btn-cancelar"
              onClick={() => navigate(-1)}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="btn-submit"
              disabled={carregando}
            >
              {carregando ? 'CADASTRANDO...' : 'CADASTRAR CASO'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
