import React, { useState, useEffect } from 'react';
import './Processos.css';
import axios from 'axios';

export default function Processos() {
  const [processos, setProcessos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [loading, setLoading] = useState(true);

  // Formata o número do processo no padrão CNJ
  const formatarCNJ = (cnj) => {
    if (!cnj) return '';

    const numero = String(cnj);

    if (numero.length !== 20) return numero;

    return numero.replace(
      /^(\d{7})(\d{2})(\d{4})(\d{1})(\d{2})(\d{4})$/,
      '$1-$2.$3.$4.$5.$6'
    );
  };

  // Filtra os processos pelo número, cliente ou descrição
  const processosFiltrados = processos.filter((item) => {
    const pesquisa = filtro.toLowerCase().trim();

    if (!pesquisa) return true;

    return (
      String(item.numeroProcesso || '').toLowerCase().includes(pesquisa) ||
      String(item.cliente || '').toLowerCase().includes(pesquisa) ||
      String(item.acao || '').toLowerCase().includes(pesquisa)
    );
  });

  // Busca os processos cadastrados no backend
  useEffect(() => {
    async function carregarDados() {
      try {
        const token = localStorage.getItem('token');
        const idAdvogado =
          Number(localStorage.getItem('id_advogado')) || 1;

        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        };

        const response = await axios.get(
          `http://localhost:8080/casos/advogado/${idAdvogado}`,
          { headers }
        );

        const dados = Array.isArray(response.data)
          ? response.data
          : [];

        const dadosFormatados = dados.map((item) => ({
          id: item.id,
          numeroProcesso: formatarCNJ(item.numero_cnj),
          cliente: item.nome_requerente || 'Cliente não informado',
          acao: item.descricao_caso || 'Sem descrição',
          ramo: 'Cível',
          tribunal: 'TJ-SP',
          status: 'Em Andamento',
        }));

        setProcessos(dadosFormatados);
      } catch (error) {
        console.error(
          'Erro ao carregar os processos do backend:',
          error
        );

        setProcessos([]);
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Olá, Dr. Advogado Teste! 👋</h2>

      <p style={{ color: '#666' }}>
        Aqui está o resumo das atividades jurídicas do seu escritório.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          margin: '20px 0',
        }}
      >
        <div
          style={{
            background: '#fff',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #ddd',
          }}
        >
          <span>PROCESSOS ATIVOS</span>
          <h3>{processos.length}</h3>
        </div>

        <div
          style={{
            background: '#fff',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #ddd',
          }}
        >
          <span>PRAZOS NA SEMANA</span>
          <h3 style={{ color: 'orange' }}>5</h3>
        </div>

        <div
          style={{
            background: '#fff',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #ddd',
          }}
        >
          <span>DOCUMENTOS EMITIDOS</span>
          <h3>114</h3>
        </div>
      </div>

      <div
        style={{
          background: '#fff',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #ddd',
        }}
      >
        <h3>Processos Recentes</h3>

        <input
          type="text"
          placeholder="Pesquisar por processo, cliente ou descrição..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            border: '1px solid #ddd',
            borderRadius: '6px',
            boxSizing: 'border-box',
          }}
        />

        {loading ? (
          <div>
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                style={{
                  height: '42px',
                  margin: '8px 0',
                  borderRadius: '6px',
                  background: '#eeeeee',
                  animation: 'pulse 1.5s infinite',
                }}
              />
            ))}
            <p>Carregando processos...</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                marginTop: '10px',
                textAlign: 'left',
                borderCollapse: 'collapse',
              }}
            >
              <thead>
                <tr style={{ borderBottom: '1px solid #ccc' }}>
                  <th>PROCESSO</th>
                  <th>CLIENTE</th>
                  <th>AÇÃO</th>
                  <th>TRIBUNAL</th>
                  <th>STATUS</th>
                </tr>
              </thead>

              <tbody>
                {processosFiltrados.length > 0 ? (
                  processosFiltrados.map((item) => (
                    <tr
                      key={item.id || item.numeroProcesso}
                      style={{ borderBottom: '1px solid #eee' }}
                    >
                      <td style={{ fontWeight: '700', padding: '12px 4px' }}>
                        {item.numeroProcesso}
                      </td>

                      <td style={{ padding: '12px 4px' }}>
                        {item.cliente}
                      </td>

                      <td
                        title={item.acao}
                        style={{ padding: '12px 4px' }}
                      >
                        {item.acao.length > 30
                          ? item.acao.substring(0, 30) + '...'
                          : item.acao}
                      </td>

                      <td style={{ padding: '12px 4px' }}>
                        {item.tribunal}
                      </td>

                      <td style={{ padding: '12px 4px' }}>
                        <span
                          className={`status-badge ${
                            item.status === 'Urgente'
                              ? 'status-urgente'
                              : item.status === 'Concluído'
                                ? 'status-concluido'
                                : 'status-andamento'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      style={{
                        textAlign: 'center',
                        padding: '32px',
                        color: '#94a3b8',
                      }}
                    >
                      Nenhum processo encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}