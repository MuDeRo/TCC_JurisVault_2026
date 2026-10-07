import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EtapasCasos.css';

export default function EtapasLista() {
  const { idCaso } = useParams(); // Pega o ID que passamos na URL do Nível 1
  const navigate = useNavigate();
  const [etapas, setEtapas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarEtapas() {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };

        // ROTA DO BACKEND: Deve retornar SELECT * FROM etapas WHERE id_caso_fk = idCaso
        const response = await axios.get(`http://localhost:8080/etapas/caso/${idCaso}`, { headers });
        setEtapas(response.data);
      } catch (error) {
        console.error('Erro ao carregar as etapas deste caso:', error);
      } finally {
        setLoading(false);
      }
    }

    carregarEtapas();
  }, [idCaso]);

  return (
    <div className="processos-container">
      <div className="processos-header">
        <div>
          <h1>Etapas do Processo</h1>
          <p>Selecione uma etapa para gerenciar as tarefas</p>
        </div>
        <button className="btn-novo-caso" style={{ backgroundColor: '#64748b' }} onClick={() => navigate('/etapas')}>
          🡨 Voltar aos Processos
        </button>
      </div>

      <div className="processos-card">
        <h2>Fases de Execução</h2>
        <p className="card-subtitle">Clique em "Acessar Quadro" para ver as tarefas desta fase.</p>

        {loading ? (
          <p style={{ padding: '20px', textAlign: 'center' }}>Carregando etapas...</p>
        ) : etapas.length > 0 ? (
          <table className="processos-table">
            <thead>
              <tr>
                <th>Nome da Etapa</th>
                <th>Descrição / Notas</th>
                <th style={{ textAlign: 'center' }}>Ação</th>
              </tr>
            </thead>
            <tbody>
              {etapas.map((etapa) => (
                <tr key={etapa.id}>
                  <td style={{ fontWeight: '700' }}>{etapa.nome_etapa || `Etapa ${etapa.id}`}</td>
                  <td>{etapa.descricao_etapa || 'Sem detalhes informados.'}</td>
                  <td style={{ textAlign: 'center' }}>
                    {/* Navega para o Nível 3: O nosso futuro Kanban */}
                    <button 
                      className="btn-novo-caso" 
                      onClick={() => navigate(`/etapas/caso/${idCaso}/kanban/${etapa.id}`)}
                    >
                      Acessar Quadro ➔
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
            <p>Nenhuma etapa cadastrada para este processo ainda.</p>
            {/* Opcional: botão para criar nova etapa */}
          </div>
        )}
      </div>
    </div>
  );
}