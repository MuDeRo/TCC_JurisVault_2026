
import React, { useState, useEffect } from 'react';
import './Processos.css';
import axios from 'axios';
import { Sun, Moon } from 'lucide-react';
import { useTema } from '../../context/ThemeContext.jsx';

export default function Processos() {
  const { tema, alternarTema } = useTema();

  const [processos, setProcessos] = useState([]);
  const [documentosEmitidos, setDocumentosEmitidos] = useState(0);
  const [filtro, setFiltro] = useState('');
  const [loading, setLoading] = useState(true);

  // Formata o número CNJ
  const formatarCNJ = (cnj) => {
    if (!cnj) return '';

    const numero = String(cnj);

    if (numero.length !== 20) return numero;

    return numero.replace(
      /^(\d{7})(\d{2})(\d{4})(\d{1})(\d{2})(\d{4})$/,
      '$1-$2.$3.$4.$5.$6'
    );
  };

  // Filtra os processos pela pesquisa
  const processosFiltrados = processos.filter((item) => {
    const pesquisa = filtro.toLowerCase().trim();

    if (!pesquisa) return true;

    return (
      String(item.numeroProcesso || '')
        .toLowerCase()
        .includes(pesquisa) ||
      String(item.cliente || '')
        .toLowerCase()
        .includes(pesquisa) ||
      String(item.acao || '')
        .toLowerCase()
        .includes(pesquisa)
    );
  });

  // Carrega os processos e documentos do backend
  useEffect(() => {
    let ativo = true;

    async function carregarDados() {
      const token = localStorage.getItem('token');

      const idAdvogado =
        Number(localStorage.getItem('id_advogado')) || 1;

      const headers = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      try {
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
          cliente:
            item.nome_requerente || 'Cliente não informado',
          acao: item.descricao_caso || 'Sem descrição',
          ramo: 'Cível',
          tribunal: 'TJ-SP',
          status: 'Em Andamento',
        }));

        if (ativo) {
          setProcessos(dadosFormatados);
        }
      } catch (error) {
        console.error(
          'Erro ao carregar os processos do backend:',
          error
        );

        if (ativo) {
          setProcessos([]);
        }
      }

      try {
        const responseArquivos = await axios.get(
          'http://localhost:8080/arquivos/',
          { headers }
        );

        const resposta = responseArquivos.data;

        const arquivos = Array.isArray(resposta)
          ? resposta
          : Array.isArray(resposta?.arquivos)
            ? resposta.arquivos
            : Array.isArray(resposta?.data)
              ? resposta.data
              : [];

        if (ativo) {
          setDocumentosEmitidos(arquivos.length);
        }
      } catch (error) {
        console.error(
          'Erro ao carregar documentos:',
          error
        );

        if (ativo) {
          setDocumentosEmitidos(0);
        }
      } finally {
        if (ativo) {
          setLoading(false);
        }
      }
    }

    carregarDados();

    return () => {
      ativo = false;
    };
  }, []);

  // Abre a página de cadastro de processo
  const abrirNovoProcesso = () => {
    window.location.href = '/processos/novo';
  };

  return (
    <div className="processos-container">
      {/* Cabeçalho */}
      <header className="processos-header">
        <div>
          <h1>Processos ⚖️</h1>

          <p>
            Gerencie e acompanhe os processos jurídicos do seu escritório.
          </p>
        </div>

        <div className="header-actions">
          {/* Botão de tema */}
          <button
            type="button"
            className="btn-tema"
            onClick={alternarTema}
            aria-label={
              tema === 'escuro'
                ? 'Ativar tema claro'
                : 'Ativar tema escuro'
            }
            title={
              tema === 'escuro'
                ? 'Ativar tema claro'
                : 'Ativar tema escuro'
            }
          >
            {tema === 'escuro' ? (
              <>
                <Sun size={18} />
                <span>Tema claro</span>
              </>
            ) : (
              <>
                <Moon size={18} />
                <span>Tema escuro</span>
              </>
            )}
          </button>

          {/* Botão de novo processo */}
          <button
            type="button"
            className="btn-novo-caso"
            onClick={abrirNovoProcesso}
          >
            + Novo Processo
          </button>
        </div>
      </header>

      {/* Indicadores */}
      <div className="processos-metricas">
        <div className="processo-metrica">
          <span>PROCESSOS ATIVOS</span>
          <h2>{processos.length}</h2>
        </div>

        <div className="processo-metrica">
          <span>PROCESSOS ENCONTRADOS</span>
          <h2>{processosFiltrados.length}</h2>
        </div>

        <div className="processo-metrica">
          <span>DOCUMENTOS EMITIDOS</span>
          <h2>{documentosEmitidos}</h2>
        </div>
      </div>

      {/* Lista de processos */}
      <section className="processos-card">
        <div className="processos-card-header">
          <div>
            <h2>Processos cadastrados</h2>

            <p className="card-subtitle">
              Pesquise e consulte os processos registrados.
            </p>
          </div>
        </div>

        {/* Campo de pesquisa */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Pesquisar por processo, cliente ou descrição..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            aria-label="Pesquisar processos"
          />
        </div>

        {/* Carregamento e tabela */}
        {loading ? (
          <div className="processos-carregando">
            <div className="processos-loading-bar" />
            <div className="processos-loading-bar" />
            <div className="processos-loading-bar" />

            <p>Carregando processos...</p>
          </div>
        ) : (
          <div className="processos-tabela-wrapper">
            <table className="processos-table">
              <thead>
                <tr>
                  <th>Processo</th>
                  <th>Cliente</th>
                  <th>Ação</th>
                  <th>Tribunal</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {processosFiltrados.length > 0 ? (
                  processosFiltrados.map((item) => (
                    <tr
                      key={
                        item.id ||
                        item.numeroProcesso ||
                        `${item.cliente}-${item.acao}`
                      }
                    >
                      <td className="numero-processo">
                        {item.numeroProcesso || '-'}
                      </td>

                      <td>{item.cliente}</td>

                      <td title={item.acao}>
                        {item.acao.length > 30
                          ? `${item.acao.substring(0, 30)}...`
                          : item.acao}
                      </td>

                      <td>{item.tribunal}</td>

                      <td>
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
                      className="processos-vazio"
                    >
                      {filtro
                        ? 'Nenhum processo corresponde à pesquisa.'
                        : 'Nenhum processo encontrado.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
