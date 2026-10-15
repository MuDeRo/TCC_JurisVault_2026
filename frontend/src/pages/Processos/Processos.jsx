import React, { useState, useEffect } from 'react';
import api from '../../services/api.js';

export default function Processos() {
  const [processos, setProcessos] = useState([]);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    async function carregarDados() {
      try {
        setCarregando(true);
        const res = await api.get('/processos');
        if (res.data) setProcessos(res.data);
      } catch (err) {
        console.warn('Backend offline ou erro na API. A usar dados de teste.');
        // Dados padrão para a tela não ficar branca se a API falhar
        setProcessos([
          { id: '1029384-12.2026.8.26.0100', area: 'Trabalhista', status: 'Em Andamento' },
          { id: '5093811-90.2025.8.26.0000', area: 'Cível', status: 'Urgente' },
          { id: '2210394-44.2026.8.26.0200', area: 'Tributário', status: 'Em Andamento' }
        ]);
      } finally {
        setCarregando(false);
      }
    }
    carregarDados();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Olá, Dr. Advogado Teste! 👋</h2>
      <p style={{ color: '#666' }}>Aqui está o resumo das atividades jurídicas do seu escritório.</p>

      {/* CARDS DE MÉTRICAS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', margin: '20px 0' }}>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
          <span>PROCESSOS ATIVOS</span>
          <h3>{processos.length}</h3>
        </div>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
          <span>PRAZOS NA SEMANA</span>
          <h3 style={{ color: 'orange' }}>5</h3>
        </div>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
          <span>DOCUMENTOS EMITIDOS</span>
          <h3>114</h3>
        </div>
      </div>

      {/* TABELA DE PROCESSOS */}
      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
        <h3>Processos Recentes</h3>
        <table style={{ width: '100%', marginTop: '10px', textAlignment: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #ccc' }}>
              <th>PROCESSO</th>
              <th>ÁREA</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {processos.map((p, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px 0' }}>{p.id || p.numero_cnj}</td>
                <td>{p.area || 'Geral'}</td>
                <td>{p.status || 'Em Andamento'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}