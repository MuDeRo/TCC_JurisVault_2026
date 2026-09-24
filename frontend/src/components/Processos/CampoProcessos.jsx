import React from 'react';

export default function CampoProcessos({ aoEnviar }) {
  return (
    <form className="form-processo" onSubmit={aoEnviar}>
      <div className="form-row">
        <div className="form-group">
          <label>Número do Processo</label>
          <input type="text" required placeholder="0000000-00.2026.8.26.0000" />
        </div>
        <div className="form-group">
          <label>Nome do Cliente</label>
          <input type="text" required placeholder="Nome completo do cliente" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Ramo / Ação</label>
          <input type="text" required placeholder="Ex: Trabalhista, Cível, Tributário" />
        </div>
        <div className="form-group">
          <label>Vara / Tribunal</label>
          <input type="text" required placeholder="Ex: TRT-2, TJ-SP" />
        </div>
      </div>

      <button type="submit" className="btn-salvar-processo">Cadastrar Processo</button>
    </form>
  );
}