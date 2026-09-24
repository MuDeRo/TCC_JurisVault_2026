import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Processos.css';

export default function Processos() {
  const navigate = useNavigate();

  const [processos, setProcessos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarProcessos() {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };

        /* 
          QUANDO O BACKEND ESTIVER PRONTO, DESCOMENTE ESTAS LINHAS:

          const response = await fetch('http://localhost:5000/api/processos', { headers });
          const data = await response.json();
          setProcessos(data);
        */

      } catch (error) {
        console.error('Erro ao carregar os processos do backend:', error);
      } finally {
        setLoading(false);
      }
    }

    carregarProcessos();
  }, []);

  // Filtragem dinâmica por número do processo ou cliente
  const processosFiltrados = processos.filter(
    (item) =>
      item.numeroProcesso?.toLowerCase().includes(filtro.toLowerCase()) ||
      item.cliente?.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="processos-container">
      {/* Header com Título e Botão de Ação */}
      <div className="processos-header">
        <div>
          <h1>Gestão de Processos</h1>
          <p>Consulte e gerencie as ações sob sua responsabilidade</p>
        </div>
        <button className="btn-novo-caso" onClick={() => navigate('/processos/novo')}>
          + Novo Caso
        </button>
      </div>

      {/* Box Principal do Conteúdo */}
      <div className="processos-card">
        <h2>Processos Cadastrados</h2>
        <p className="card-subtitle">Consulte e gerencie as ações sob sua responsabilidade</p>

        {/* Input de Busca */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Filtrar por número do processo ou cliente..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>

        {/* Tabela de Processos */}
        <table className="processos-table">
          <thead>
            <tr>
              <th>Nº do Processo</th>
              <th>Cliente</th>
              <th>Ação / Ramo</th>
              <th>Tribunal</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {processosFiltrados.length > 0 ? (
              processosFiltrados.map((item) => (
                <tr key={item.id || item.numeroProcesso}>
                  <td style={{ fontWeight: '700' }}>{item.numeroProcesso}</td>
                  <td>{item.cliente}</td>
                  <td>{item.ramo || item.acao}</td>
                  <td>{item.tribunal}</td>
                  <td>
                    <span className={`status-badge ${
                      item.status === 'Urgente' ? 'status-urgente' :
                      item.status === 'Concluído' ? 'status-concluido' : 'status-andamento'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '32px', color: '#94a3b8' }}>
                  {loading ? 'A carregar processos do servidor...' : 'Nenhum processo encontrado.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}