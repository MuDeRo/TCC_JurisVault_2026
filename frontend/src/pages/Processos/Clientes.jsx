import React, { useState, useEffect } from 'react';
import api from '../../services/api.js';

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarClientes() {
      try {
        setCarregando(true);
        const { data } = await api.get('/clientes');
        setClientes(data);
      } catch (err) {
        console.error('Erro ao buscar clientes:', err);
      } finally {
        setCarregando(false);
      }
    }
    carregarClientes();
  }, []);

  const clientesFiltrados = clientes.filter(
    (c) =>
      c.nome?.toLowerCase().includes(filtro.toLowerCase()) ||
      c.cpf?.includes(filtro)
  );

  return (
    <div className="card-painel-dash">
      <div className="topo-lista-processos">
        <div>
          <h2 className="titulo-secao-lista">Carteira de Clientes</h2>
          <p className="subtitulo-secao-lista">
            Requerentes vinculados aos processos do escritório.
          </p>
        </div>
      </div>

      <div className="box-filtro-busca" style={{ margin: '1.5rem 0' }}>
        <input
          type="text"
          placeholder="Buscar cliente por nome ou CPF..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="input-busca-processo"
        />
      </div>

      {carregando ? (
        <div className="status-carregando">Carregando clientes...</div>
      ) : (
        <div className="tabela-responsive">
          <table className="tabela-processos">
            <thead>
              <tr>
                <th>Nome do Cliente</th>
                <th>CPF</th>
                <th>Idade</th>
                <th>Processo (CNJ)</th>
              </tr>
            </thead>
            <tbody>
              {clientesFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="4" className="sem-dados">
                    Nenhum cliente encontrado.
                  </td>
                </tr>
              ) : (
                clientesFiltrados.map((cliente) => (
                  <tr key={cliente.id}>
                    <td><strong>{cliente.nome}</strong></td>
                    <td>{cliente.cpf || 'Não informado'}</td>
                    <td>{cliente.idade_anos ? `${cliente.idade_anos} anos` : 'N/I'}</td>
                    <td className="cnj-destaque">{cliente.numero_cnj || 'Sem processo'}</td>
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