import React, { useState, useEffect } from 'react';
import api from '../../services/api.js';

export default function Prazos() {
  const [prazos, setPrazos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarPrazos() {
      try {
        setCarregando(true);
        const { data } = await api.get('/prazos');
        setPrazos(data);
      } catch (err) {
        console.error('Erro ao buscar prazos:', err);
      } finally {
        setCarregando(false);
      }
    }
    carregarPrazos();
  }, []);

  const prazosFiltrados = prazos.filter(
    (p) =>
      p.tarefa?.toLowerCase().includes(filtro.toLowerCase()) ||
      p.numero_cnj?.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="card-painel-dash">
      <div className="topo-lista-processos">
        <div>
          <h2 className="titulo-secao-lista">Prazos e Compromissos</h2>
          <p className="subtitulo-secao-lista">
            Acompanhamento das tarefas e etapas processuais.
          </p>
        </div>
      </div>

      <div className="box-filtro-busca" style={{ margin: '1.5rem 0' }}>
        <input
          type="text"
          placeholder="Filtrar por tarefa ou CNJ..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="input-busca-processo"
        />
      </div>

      {carregando ? (
        <div className="status-carregando">Carregando prazos...</div>
      ) : (
        <div className="tabela-responsive">
          <table className="tabela-processos">
            <thead>
              <tr>
                <th>Tarefa / Ação</th>
                <th>Etapa Processual</th>
                <th>Processo (CNJ)</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              {prazosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="4" className="sem-dados">
                    Nenhum prazo encontrado.
                  </td>
                </tr>
              ) : (
                prazosFiltrados.map((item) => (
                  <tr key={item.id_tarefa}>
                    <td><strong>{item.tarefa}</strong></td>
                    <td>{item.nome_etapa || 'Etapa Geral'}</td>
                    <td className="cnj-destaque">{item.numero_cnj}</td>
                    <td className="descricao-celula">{item.descricao_tarefa || 'Sem detalhes'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}