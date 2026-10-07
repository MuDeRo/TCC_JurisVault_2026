import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EtapasCasos.css';

export default function EtapasLista() {
  const { idCaso } = useParams();
  const navigate = useNavigate();
  
  // Estados da página
  const [etapas, setEtapas] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estados do formulário de nova etapa
  const [mostrarFormEtapa, setMostrarFormEtapa] = useState(false);
  const [nomeNovaEtapa, setNomeNovaEtapa] = useState('');
  const [descricaoNovaEtapa, setDescricaoNovaEtapa] = useState('');

  //Função para buscar as etapas do banco
  async function carregarEtapas() {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(`http://localhost:8080/etapas/caso/${idCaso}`, { headers });
      setEtapas(response.data);
    } catch (error) {
      console.error('Erro ao carregar as etapas deste caso:', error);
    } finally {
      setLoading(false);
    }
  }

  // Chama a função assim que a tela abre
  useEffect(() => {
    carregarEtapas();
  }, [idCaso]);

  // Função para salvar a nova etapa
  const handleCriarEtapa = async () => {
    if (!nomeNovaEtapa.trim()) return alert('Digite o nome da etapa!');
    
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      
      const payload = {
        id_caso_fk: idCaso,
        etapa: nomeNovaEtapa, // nome corrigido para o banco
        descricao: descricaoNovaEtapa // nome corrigido para o banco
      };

      await axios.post('http://localhost:8080/etapas', payload, { headers });
      
      // Recarrega a tabela automaticamente do banco de dados
      await carregarEtapas(); 
      
      // Fecha o formulário e limpa os campos
      setMostrarFormEtapa(false);
      setNomeNovaEtapa('');
      setDescricaoNovaEtapa('');
    } catch (error) {
      console.error('Erro ao criar etapa:', error);
      alert('Erro ao criar a etapa.');
    }
  };

  return (
    <div className="processos-container">
      <div className="processos-header">
        <div>
          <h1>Etapas do Processo</h1>
          <p>Selecione uma etapa para gerenciar as tarefas</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-novo-caso" style={{ backgroundColor: '#64748b' }} onClick={() => navigate('/etapas')}>
            🡨 Voltar
          </button>
          <button className="btn-novo-caso" onClick={() => setMostrarFormEtapa(!mostrarFormEtapa)}>
            {mostrarFormEtapa ? 'Cancelar' : '+ Nova Etapa'}
          </button>
        </div>
      </div>

      {/* Formulário Condicional */}
      {mostrarFormEtapa && (
        <div style={{ padding: '15px', backgroundColor: '#f8fafc', borderRadius: '8px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              placeholder="Nome da etapa (Ex: Fase Inicial)" 
              value={nomeNovaEtapa}
              onChange={(e) => setNomeNovaEtapa(e.target.value)}
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', flex: 1 }}
            />
            <input 
              type="text" 
              placeholder="Descrição da etapa (Opcional)..." 
              value={descricaoNovaEtapa}
              onChange={(e) => setDescricaoNovaEtapa(e.target.value)}
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', flex: 2 }}
            />
            <button className="btn-novo-caso" onClick={handleCriarEtapa}>
              Guardar Etapa
            </button>
          </div>
        </div>
      )}

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
                  <td style={{ fontWeight: '700' }}>{etapa.etapa || `Etapa ${etapa.id}`}</td>
                  <td>{etapa.descricao || 'Sem detalhes informados.'}</td>
                  <td style={{ textAlign: 'center' }}>
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
          </div>
        )}
      </div>
    </div>
  );
}