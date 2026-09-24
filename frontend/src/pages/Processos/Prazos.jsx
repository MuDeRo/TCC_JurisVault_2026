import React, { useEffect, useState } from 'react';
import api from '../../services/api';

export default function Prazos() {
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarTarefas();
  }, []);

  const carregarTarefas = async () => {
    try {
      const response = await api.get('/tarefas/');
      setTarefas(response.data);
    } catch (error) {
      console.error('Erro ao buscar tarefas/prazos:', error);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Controle de Prazos e Tarefas</h1>
      {carregando ? (
        <p>Carregando prazos...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Descrição</th>
              <th>Prazo / Data</th>
            </tr>
          </thead>
          <tbody>
            {tarefas.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.descricao || t.nome}</td>
                <td>{t.data_limite || t.prazo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}