import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Processos.css';
import axios from 'axios';

export default function Processos() {
  const navigate = useNavigate();

  const [processos, setProcessos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [loading, setLoading] = useState(true);

  // Função para aplicar a máscara (pontos e traço) no CNJ que vem limpo do banco
  const formatarCNJ = (cnj) => {
    if (!cnj || cnj.length !== 20) return cnj;
    return cnj.replace(/^(\d{7})(\d{2})(\d{4})(\d{1})(\d{2})(\d{4})$/, "$1-$2.$3.$4.$5.$6");
  };

  useEffect(() => {
    async function carregarProcessosDoAdvogado() {
      try {
        const token = localStorage.getItem('token');
        let idAdvogado = localStorage.getItem('id_advogado');

        // Se não houver 'id_advogado' salvo isoladamente, extrai do payload do token JWT
        if (!idAdvogado && token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          idAdvogado = payload.id;
        }

        if (!idAdvogado) {
          console.warn('ID do advogado não encontrado no localStorage nem no token.');
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:8080/casos/advogado/${idAdvogado}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const listaBruta = Array.isArray(response.data)
          ? response.data
          : (response.data?.data || []);

        // Mapeia os campos do banco para o formato esperado pela tabela e pelo filtro
        const dadosFormatados = listaBruta.map((item) => ({
          id: item.id,
          numeroProcesso: formatarCNJ(item.numero_cnj) || 'Não informado',
          cliente: item.nome_requerente || 'Cliente não informado',
          acao: item.descricao_caso || 'Sem descrição',
          ramo: 'Cível',
          tribunal: 'TJ-SP',
          status: 'Em Andamento',
        }));

        setProcessos(dadosFormatados);
      } catch (error) {
        console.error('Erro ao buscar processos do advogado:', error);
      } finally {
        setLoading(false);
      }
    }

    carregarProcessosDoAdvogado();
  }, []);

  // Filtragem dinâmica por número do processo ou cliente
  const processosFiltrados = processos.filter((item) => {
    if (!filtro.trim()) return true;
    const termo = filtro.toLowerCase();
    return (
      item.numeroProcesso?.toLowerCase().includes(termo) ||
      item.cliente?.toLowerCase().includes(termo)
    );
  });

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
                  <td title={item.acao}>
                    {item.acao.length > 30 ? item.acao.substring(0, 30) + '...' : item.acao}
                  </td>
                  <td>{item.tribunal}</td>
                  <td>
                    <span className={`status-badge ${item.status === 'Urgente' ? 'status-urgente' :
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