import React, { useState } from 'react';

export default function Processos() {
  const [filtro, setFiltro] = useState('');

  const listaProcessos = [
    {
      numero: '1002341-89.2026.8.26.0100',
      cliente: 'Carlos Eduardo Mendes',
      ramo: 'Trabalhista',
      tribunal: 'TRT-2',
      status: 'Em Andamento',
      statusColor: '#d97706',
      statusBg: '#fef3c7'
    },
    {
      numero: '5001290-11.2025.4.03.6100',
      cliente: 'Empresa Soluções Tech',
      ramo: 'Tributário',
      tribunal: 'TRF-3',
      status: 'Concluído',
      statusColor: '#16a34a',
      statusBg: '#dcfce7'
    },
    {
      numero: '0081239-44.2026.8.26.0000',
      cliente: 'Mariana Ramos Lima',
      ramo: 'Cível / Família',
      tribunal: 'TJ-SP',
      status: 'Urgente',
      statusColor: '#dc2626',
      statusBg: '#fee2e2'
    }
  ];

  const processosFiltrados = listaProcessos.filter(
    (p) =>
      p.numero.toLowerCase().includes(filtro.toLowerCase()) ||
      p.cliente.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div style={{ width: '100%' }}>
      {/* CABEÇALHO */}
      <header style={{ marginBottom: '28px' }}>
        <h1 style={{ color: '#0d1e36', margin: 0, fontSize: '1.8rem', fontWeight: 800 }}>
          Gestão de Processos
        </h1>
        <p style={{ color: '#718096', margin: '4px 0 0 0', fontSize: '0.9rem' }}>
          Visão geral do escritório
        </p>
      </header>

      {/* BLOCO DA TABELA */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}
      >
        <h2 style={{ color: '#0d1e36', margin: '0 0 4px 0', fontSize: '1.3rem', fontWeight: 700 }}>
          Processos Cadastrados
        </h2>
        <p style={{ color: '#718096', margin: '0 0 20px 0', fontSize: '0.85rem' }}>
          Consulte e gerencie as ações sob sua responsabilidade
        </p>

        {/* CAMPO DE PESQUISA */}
        <input
          type="text"
          placeholder="Filtrar por número do processo ou cliente..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            marginBottom: '20px',
            fontSize: '0.9rem',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />

        {/* TABELA DE PROCESSOS */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#fcfaf5', borderBottom: '1px solid #edf2f7' }}>
                <th style={{ padding: '12px 16px', color: '#0d1e36', fontSize: '0.85rem', fontWeight: 700 }}>Nº do Processo</th>
                <th style={{ padding: '12px 16px', color: '#0d1e36', fontSize: '0.85rem', fontWeight: 700 }}>Cliente</th>
                <th style={{ padding: '12px 16px', color: '#0d1e36', fontSize: '0.85rem', fontWeight: 700 }}>Ação / Ramo</th>
                <th style={{ padding: '12px 16px', color: '#0d1e36', fontSize: '0.85rem', fontWeight: 700 }}>Tribunal</th>
                <th style={{ padding: '12px 16px', color: '#0d1e36', fontSize: '0.85rem', fontWeight: 700 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {processosFiltrados.map((proc, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #edf2f7' }}>
                  <td style={{ padding: '16px', fontWeight: 700, color: '#0d1e36', fontSize: '0.85rem' }}>
                    {proc.numero}
                  </td>
                  <td style={{ padding: '16px', color: '#4a5568', fontSize: '0.85rem' }}>
                    {proc.cliente}
                  </td>
                  <td style={{ padding: '16px', color: '#4a5568', fontSize: '0.85rem' }}>
                    {proc.ramo}
                  </td>
                  <td style={{ padding: '16px', color: '#4a5568', fontSize: '0.85rem' }}>
                    {proc.tribunal}
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span
                      style={{
                        backgroundColor: proc.statusBg,
                        color: proc.statusColor,
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        display: 'inline-block'
                      }}
                    >
                      {proc.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}