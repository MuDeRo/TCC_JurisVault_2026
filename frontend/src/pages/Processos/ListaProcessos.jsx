import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ListaProcessos.css';

export default function ListaProcessos({ setPaginaAtual }) {
  const [busca, setBusca] = useState('');
  const [processos, setProcessos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Função para recolocar a máscara no CNJ na hora de exibir
  const formatarCNJ = (cnj) => {
    if (!cnj || cnj.length !== 20) return cnj;
    return cnj.replace(/^(\d{7})(\d{2})(\d{4})(\d{1})(\d{2})(\d{4})$/, "$1-$2.$3.$4.$5.$6");
  };

  useEffect(() => {
    const buscarProcessos = async () => {
      try {
        // ATENÇÃO: Estou usando o ID 1 fixo aqui, igual fizemos no cadastro.
        // Futuramente, pegue o ID do advogado logado (ex: do localStorage).
        const idAdvogado = localStorage.getItem('id_advogado') || 1; 
        
        const response = await axios.get(`http://localhost:8080/casos/advogado/${idAdvogado}`);
        
        // Mapeia os dados que vieram do banco para os nomes que a sua tabela já usa
        const processosFormatados = response.data.map((caso) => ({
          id: caso.id,
          numero: formatarCNJ(caso.numero_cnj),
          // Se o backend trouxer o nome, usamos. Se não, fica um texto padrão.
          cliente: caso.nome_requerente || 'Cliente não informado', 
          acao: caso.descricao_caso || 'Sem descrição',
          tribunal: 'Não informado', // Fixo por enquanto (não temos essa coluna no BD)
          status: 'Em Andamento'     // Fixo por enquanto (não temos essa coluna no BD)
        }));

        setProcessos(processosFormatados);
      } catch (error) {
        console.error("Erro ao carregar os processos:", error);
        alert("Não foi possível carregar a lista de processos.");
      } finally {
        setCarregando(false);
      }
    };

    buscarProcessos();
  }, []);

  const filtrados = processos.filter(
    (p) => 
      p.cliente.toLowerCase().includes(busca.toLowerCase()) || 
      p.numero.includes(busca)
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
        {carregando ? (
          <p style={{ padding: '20px', textAlign: 'center' }}>Carregando processos...</p>
        ) : (
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
              {filtrados.length > 0 ? (
                filtrados.map((p) => (
                  <tr key={p.id}>
                    <td className="col-numero">{p.numero}</td>
                    <td>{p.cliente}</td>
                    {/* Exibindo um trecho da descrição do caso para não quebrar o layout */}
                    <td title={p.acao}>
                      {p.acao.length > 30 ? p.acao.substring(0, 30) + '...' : p.acao}
                    </td>
                    <td>{p.tribunal}</td>
                    <td>
                      <span className={`status-tag status-${p.status.toLowerCase().replace(' ', '-')}`}>
                        {p.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn-icon" title="Ver detalhes">👁️</button>
                      <button className="btn-icon" title="Editar processo">✏️</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                    Nenhum processo encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}