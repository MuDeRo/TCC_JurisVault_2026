import React, { useState } from 'react';
import api from '../../services/api.js';
import './CadastroProcesso.css';

function CadastroProcesso({ onCancelar, onSucesso }) {
  const [formData, setFormData] = useState({
    numero_cnj: '',
    descricao_caso: '',
    req_nome: '',
    req_cpf: '',
    req_idade: '',
    reqdo_nome: '',
    reqdo_cpf: '',
    rua: '',
    cep: ''
  });

  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setErro('');

    try {
      await api.post('/casos', formData);
      alert('Caso cadastrado com sucesso!');
      if (onSucesso) onSucesso();
    } catch (err) {
      console.error('Erro ao cadastrar caso:', err);
      setErro('Erro ao salvar o processo. Verifique os dados e tente novamente.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="cadastro-caso-card">
      <div className="topo-cadastro-header">
        <h2 className="titulo-secao-lista">Novo Caso</h2>
        <p className="subtitulo-secao-lista">Preencha as informações do processo!</p>
      </div>

      {erro && <div className="mensagem-alerta erro">{erro}</div>}

      <form onSubmit={handleSubmit} className="form-cadastro-caso">
        <div className="secao-form-bloco">
          <h3 className="titulo-bloco"> Dados do Caso</h3>
          <div className="grid-form col-2">
            <div className="campo-input">
              <label htmlFor="numero_cnj">Número do Processo (CNJ)</label>
              <input
                id="numero_cnj"
                type="text"
                name="numero_cnj"
                placeholder="Ex: 1002341-89.2026.8.26.0100"
                value={formData.numero_cnj}
                onChange={handleChange}
                required
              />
            </div>
            <div className="campo-input">
              <label htmlFor="descricao_caso">Descrição / Assunto do Caso</label>
              <input
                id="descricao_caso"
                type="text"
                name="descricao_caso"
                placeholder="Ex: Ação Trabalhista - Reclamação de Horas Extras"
                value={formData.descricao_caso}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="secao-form-bloco">
          <h3 className="titulo-bloco"> Requerente (Autor)</h3>
          <div className="grid-form col-3">
            <div className="campo-input">
              <label htmlFor="req_nome">Nome do Requerente</label>
              <input
                id="req_nome"
                type="text"
                name="req_nome"
                placeholder="Nome completo"
                value={formData.req_nome}
                onChange={handleChange}
                required
              />
            </div>
            <div className="campo-input">
              <label htmlFor="req_cpf">CPF</label>
              <input
                id="req_cpf"
                type="text"
                name="req_cpf"
                placeholder="000.000.000-00"
                value={formData.req_cpf}
                onChange={handleChange}
              />
            </div>
            <div className="campo-input">
              <label htmlFor="req_idade">Idade (anos)</label>
              <input
                id="req_idade"
                type="number"
                name="req_idade"
                placeholder="Ex: 35"
                value={formData.req_idade}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="secao-form-bloco">
          <h3 className="titulo-bloco"> Requerido (Réu)</h3>
          <div className="grid-form col-2">
            <div className="campo-input">
              <label htmlFor="reqdo_nome">Nome do Requerido</label>
              <input
                id="reqdo_nome"
                type="text"
                name="reqdo_nome"
                placeholder="Nome da pessoa ou empresa ré"
                value={formData.reqdo_nome}
                onChange={handleChange}
              />
            </div>
            <div className="campo-input">
              <label htmlFor="reqdo_cpf">CPF / CNPJ do Requerido</label>
              <input
                id="reqdo_cpf"
                type="text"
                name="reqdo_cpf"
                placeholder="Documento do réu"
                value={formData.reqdo_cpf}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="secao-form-bloco">
          <h3 className="titulo-bloco"> Endereço do Caso</h3>
          <div className="grid-form col-2">
            <div className="campo-input">
              <label htmlFor="rua">Rua</label>
              <input
                id="rua"
                type="text"
                name="rua"
                placeholder="Ex: Av. Paulista, 1000"
                value={formData.rua}
                onChange={handleChange}
              />
            </div>
            <div className="campo-input">
              <label htmlFor="cep">CEP</label>
              <input
                id="cep"
                type="text"
                name="cep"
                placeholder="00000-000"
                value={formData.cep}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="acoes-form-rodape">
          <button type="button" className="btn-secundario" onClick={onCancelar} disabled={enviando}>
            Cancelar
          </button>
          <button type="submit" className="btn-primario" disabled={enviando}>
            {enviando ? 'Salvando...' : 'Salvar Caso'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CadastroProcesso;