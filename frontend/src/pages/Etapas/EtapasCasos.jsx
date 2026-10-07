import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EtapasCasos.css'; // Crie esse arquivo ou importe o Processos.css se preferir reaproveitar

export default function EtapasCasos() {
  const navigate = useNavigate();
  const [casos, setCasos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [loading, setLoading] = useState(true);

  const formatarCNJ = (cnj) => {
    if (!cnj || cnj.length !== 20) return cnj;
    return cnj.replace(/^(\d{7})(\d{2})(\d{4})(\d{1})(\d{2})(\d{4})$/, "$1-$2.$3.$4.$5.$6");
  };

  useEffect(() => {
    async function carregarCasos() {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };

        // Usa a mesma rota que arrumamos antes para pegar os processos
        const response = await axios.get('http://localhost:8080/casos', { headers });
        
        const dadosFormatados = response.data.map((item) => ({
          id: item.id,
          numeroProcesso: formatarCNJ(item.numero_cnj),
          cliente: item.nome_requerente || item.nome || 'Cliente não informado',
          acao: item.descricao_caso || 'Sem descrição'
        }));

        setCasos(dadosFormatados);
      } catch (error) {
        console.error('Erro ao carregar casos:', error);
      } finally {
        setLoading(false);
      }
    }
    carregarCasos();
  }, []);

  const filtrados = casos.filter(
    (item) =>
      item.numeroProcesso?.toLowerCase().includes(filtro.toLowerCase()) ||
      item.cliente?.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="processos-container"> {/* Usando as mesmas classes para manter padrão visual */}
      <div className="processos-header">
        <div>
          <h1>Gestão de Etapas e Tarefas</h1>
          <p>Selecione um processo para gerenciar seu fluxo de trabalho</p>
        </div>
      </div>

      <div className="processos-card">
        <h2>Processos Disponíveis</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar processo..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>

        <table className="processos-table">
          <thead>
            <tr>
              <th>Nº do Processo</th>
              <th>Cliente</th>
              <th>Descrição</th>
              <th style={{ textAlign: 'center' }}>Ação</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>Carregando...</td></tr>
            ) : filtrados.length > 0 ? (
              filtrados.map((item) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: '700' }}>{item.numeroProcesso}</td>
                  <td>{item.cliente}</td>
                  <td title={item.acao}>
                    {item.acao.length > 40 ? item.acao.substring(0, 40) + '...' : item.acao}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {/* AQUI É A MÁGICA: Navega para a tela de Etapas passando o ID do Caso */}
                    <button 
                      className="btn-novo-caso" 
                      style={{ padding: '6px 12px', fontSize: '14px' }}
                      onClick={() => navigate(`/etapas/caso/${item.id}`)}
                    >
                      Ver Etapas ➔
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>Nenhum processo encontrado.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}