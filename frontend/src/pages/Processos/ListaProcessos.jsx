import React, { useState } from 'react';
import './ListaProcessos.css';

export default function ListaProcessos({ setPaginaAtual }) {
  const [busca, setBusca] = useState('');
  const [processos] = useState([
    { id: 1, numero: '1002341-89.2026.8.26.0100', cliente: 'Carlos Eduardo Mendes', acao: 'Trabalhista', tribunal: 'TRT-2', status: 'Em Andamento' },
    { id: 2, numero: '5001290-11.2025.4.03.6100', cliente: 'Empresa Soluções Tech', acao: 'Tributário', tribunal: 'TRF-3', status: 'Concluído' },
    { id: 3, numero: '0081239-44.2026.8.26.0000', cliente: 'Mariana Ramos Lima', acao: 'Cível / Família', tribunal: 'TJ-SP', status: 'Urgente' },
  ]);

  const filtrados = processos.filter(
    (p) => p.cliente.toLowerCase().includes(busca.toLowerCase()) || p.numero.includes(busca)
  );

  return (
    <div className="lista-processos-container">
      <div className="lista-processos-header">
        <div>
          <h1>Processos Cadastrados</h1>
          <p>Consulte e gerencie as ações sob sua responsabilidade</p>
        </div>
        <button className="btn-novo-processo" onClick={() => setPaginaAtual('novo-processo')}>
          + Cadastrar Processo
        </button>
      </div>

      <div className="filtro-busca">
        <input
          type="text"
          placeholder="Filtrar por número do processo ou cliente..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <div className="tabela-card">
        <table className="tabela-processos">
          <thead>
            <tr>
              <th>Nº do Processo</th>
              <th>Cliente</th>
              <th>Ação / Ramo</th>
              <th>Tribunal</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((p) => (
              <tr key={p.id}>
                <td className="col-numero">{p.numero}</td>
                <td>{p.cliente}</td>
                <td>{p.acao}</td>
                <td>{p.tribunal}</td>
                <td>
                  <span className={`status-tag status-${p.status.toLowerCase().replace(' ', '-')}`}>
                    {p.status}
                  </span>
                </td>
                <td>
                  <button className="btn-icon">👁️</button>
                  <button className="btn-icon">✏️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}